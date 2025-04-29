export interface Outcome {
    outcomeId: String;
    parentOutcomeId: String;
    type: "PRODUCT" | "BUSINESS"
}

export interface OutcomeJoin {
    outcomeIdLeft: String;
    outcomeIdRight: String;
    joining: String;
}