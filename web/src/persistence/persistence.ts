import { generateUUID } from "@/components/util";

export interface Response {
    error?: boolean;
    message: string;
    content?: any;
}

const SuccessResponse = {
    message: "Success"
}

let currentVersions = {} as any;
let versionTranslators = {} as any;

export function registerCurrentVersion(type: string, version: string) {
    currentVersions[type] = version;
}

export function registerVersionTranslator(type: string, fromVersion: string, toVersion: string, translator: (v: any) => any) {
    if (!versionTranslators[type]) {
        versionTranslators[type] = {};
    }
    versionTranslators[type][fromVersion] = {
        toVersion: toVersion,
        translator: translator
    };
}

let data = {
    links: []
} as any;

const ARBORIST_DATA_KEY = "arborist-persistence";
let fromLocal = localStorage.getItem(ARBORIST_DATA_KEY);
if (!!fromLocal) {
    data = { ...data, ...JSON.parse(fromLocal) };
}

function commitStore() {
    localStorage.setItem(ARBORIST_DATA_KEY, JSON.stringify(data));
}

function createLocator(type: string): Promise<string> {
    return Promise.resolve(`${type}:${generateUUID()}`);
}

function find(locator: string): Promise<Response> {
    return Promise.resolve({
        message: "Success",
        content: translate(locator, data[locator])
    });
}

function list(type: string, filters: ((v: any) => boolean)[]): Promise<Response> {    
    let found = Object.entries(data)
        .filter(e => e[0].includes(type))
        .flatMap(e => translate(e[0], e[1]))        
        .filter(v => filters.map(f => f(v)).reduce((l: boolean, r: boolean) => l && r, true))
    return Promise.resolve({
        message: "Success",
        content: found
    });
}

function locatorType(locator: string) {
    return locator.split(":")[0];
}

function versionLookup(locator: string) {
    return currentVersions[locatorType(locator)] || "v1"
}

function translate(locator: string, wrapped: any) {
    let currentVersion = versionLookup(locator);
    let wrappedVersion = wrapped.version || "v1";
    if (wrappedVersion === currentVersion) {
        return wrapped.content;
    }
    let translation = versionTranslators[wrappedVersion] || {
        toVersion: currentVersion,
        translator: (v: any) => v
    }
    let transformed = translation.translator(wrapped.content);

    while (translation.toVersion !== currentVersion) {
        translation = versionTranslators[wrappedVersion] || {
            toVersion: currentVersion,
            translator: (v: any) => v
        }
        transformed = translation.translator(transformed);
    }
    return transformed;
}

function save(locator: string, payload: any): Promise<Response> {
    data[locator] = {
        version: versionLookup(locator),
        content: payload
    };
    commitStore();
    return Promise.resolve(SuccessResponse);
}

function link(locator: string, locators: string[]): Promise<Response> {
    locators.forEach(l => {
        if (!data.links.find((v: any) => v.left === locator && v.right === l)) {
            data.links.push({
                left: locator,
                right: l
            });
        }
    })
    return Promise.resolve(SuccessResponse);
}

function unlink(locator: string, locators: string[]): Promise<Response> {
    data.links = data.links.filter((v: any) => !(v.left === locator && locators.includes(v.right)));
    return Promise.resolve(SuccessResponse);
}

function removeLinks(locator: string): Promise<Response> {
    data.links = data.links.filter((v: any) => v.left === locator || v.right === locator);
    return Promise.resolve(SuccessResponse);
}

export function persistence() {
    return {
        createLocator: createLocator,
        find: find,
        list: list,
        save: save,
        link: link,
        unlink: unlink,
        removeLinks: removeLinks
    }
}
