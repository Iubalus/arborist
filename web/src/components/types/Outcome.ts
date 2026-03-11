export interface OutcomeNode {
    uuid: string;
    content: Outcome;
    children: OutcomeNode[];
}

export interface Outcome {
    type: "PRODUCT" | "BUSINESS";
    text: string;
    leading: string;
}