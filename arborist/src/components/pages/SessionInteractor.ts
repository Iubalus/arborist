import { api } from "../../api/api";
import type { HistoryType, Identity } from "../types/Session";

export async function whoAmI(): Promise<Identity> {
    return await api().whoAmI();
}

export async function become(identity: Identity) {
    await api().becomeIdentity(identity);
}

export async function listIdentities(): Promise<Identity[]> {
    return await api().listIdentities();
}

export async function addIdentity(toSave: Identity) {
    await api().addIdentity(toSave);
    Promise.resolve();
}

export async function recordChange(type: HistoryType, identifier: String) {
    await api().recordChange(await api().whoAmI(), type, identifier, new Date());
}