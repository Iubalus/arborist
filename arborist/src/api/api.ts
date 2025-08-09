import { type ImageFile } from "@/components/bits";
import {
    type Opportunity,
    type Outcome,
    type Question,
    type QuestionLink,
    type HistoryType,
    type Identity,
    type SnapshotData
} from "@/components/types";

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
    saveImage: (image: ImageFile) => Promise<String>;
    deleteImage: (imageId: string) => Promise<void>;
    export: () => Promise<any>;
    import: (data: any) => Promise<void>;
    saveOutcomes: (nodes: Outcome[]) => Promise<void>;
    loadOutcomes: () => Promise<Outcome[]>;
}

const _api = createAPI();

export function api() {
    return _api;
}