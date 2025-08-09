import { reactive } from "vue";

let store = reactive({}) as { [key: string]: any };
let updateListeners = [] as any[];

export {store};

export function getStore(storeKey: States) {
    return store[storeKey];
}

export function putStore(storeKey: States, payload: any) {
    store[storeKey] = payload;
    updateListeners.forEach(l => l());
}

export function addListener(listener: () => void) {
    updateListeners.push(listener);
}

export function removeListener(listener: () => void) {
    updateListeners = updateListeners.filter((v: any) => v !== listener);
}

export enum States {
    CLIPBOARD = "clipboard",
    IS_CUT = "isCut",
    DELETED = "deleted"
}