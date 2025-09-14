import { generateUUID } from "@/components/util";

export interface Response {
    error?: boolean;
    message: string;
    content?: any;
}

const SuccessResponse = {
    message: "Success"
}

let data = {
    links: []
} as any;

const ARBORIST_DATA_KEY = "arborist-data-v2";
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
        content: data[locator]
    });
}

function list(type: string, filters: ((v: any) => boolean)[]): Promise<Response> {
    let found = Object.entries(data)
        .filter(e => e[0].includes(type))
        .flatMap(e => e[1])
        .filter(v => filters.map(f => f(v)).reduce((l: boolean, r: boolean) => l && r, true))
    return Promise.resolve({
        message: "Success",
        content: found
    });
}

function save(locator: string, payload: any): Promise<Response> {
    data[locator] = payload;
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
        save: save
    }
}
