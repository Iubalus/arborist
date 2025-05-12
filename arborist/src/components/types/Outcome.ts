export interface Outcome {
    outcomeId: string;
    parentOutcomeId: string;
    text: string;
    type: "PRODUCT" | "BUSINESS"
}

export interface OutcomeJoin {
    outcomeIdLeft: string;
    outcomeIdRight: string;
    joining: string;
}