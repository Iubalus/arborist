import { type ImageFile } from "@/components/bits";
import {
    type Opportunity,
    type OutcomeNode,    
    type SnapshotData
} from "@/components/types";

import { createAPI } from "./mockapi";

export interface API {                                       
    loadSnapshots: () => Promise<SnapshotData[]>;
    findSnapshotOpportunities: (snapshotId: String) => Promise<Opportunity[]>;
    saveSnapshot: (snapshot: SnapshotData) => Promise<String>;
    saveOpportunity: (opportunity: Opportunity) => Promise<String>;
    saveImage: (image: ImageFile) => Promise<String>;
    deleteImage: (imageId: string) => Promise<void>;
    export: () => Promise<any>;
    import: (data: any) => Promise<void>;
    saveOutcomes: (nodes: OutcomeNode[]) => Promise<void>;
    loadOutcomes: () => Promise<OutcomeNode[]>;
}

const _api = createAPI();

export function api() {
    return _api;
}