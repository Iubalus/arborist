import type { Opportunity } from "../components/types/Opportunity";
import type { Question, QuestionLink } from "../components/types/Questions";
import type { HistoryType, Identity } from "../components/types/Session";
import type { SnapshotData } from "../components/types/Snapshot";
import { createAPI } from "./mockapi";

export interface API {
    loadQuestions: () => Promise<Question[]>;
    loadQuestionLinks: () => Promise<QuestionLink[]>;
    saveQuestion: (question: Question) => Promise<String>;
    archiveQuestion: (questionId: String) => Promise<void>;
    linkQuestion: (link: QuestionLink) => Promise<void>;
    unlinkQuestion: (link: QuestionLink) => Promise<void>;
    listIdentities: () => Promise<Identity[]>;
    becomeIdentity: (identity: Identity) => Promise<void>;
    whoAmI: () => Promise<Identity>;
    addIdentity: (identity: Identity) => Promise<void>;
    recordChange: (identity: Identity, type: HistoryType, id: String, time: Date) => Promise<void>;
    loadSnapshots: () => Promise<SnapshotData[]>;
    findSnapshotOpportunities: (snapshotId: String) => Promise<Opportunity[]>;
    saveSnapshot: (snapshot: SnapshotData) => Promise<String>;
    saveOpportunity: (opportunity: Opportunity) => Promise<String>;
}

const _api = createAPI();

export function api() {
    return _api;
}