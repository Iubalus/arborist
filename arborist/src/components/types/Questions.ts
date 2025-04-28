export interface QuestionLink {
    leftQuestionId: String;
    rightQuestionId: String;
}

export enum QuestionType {
    RESEARCH = "RESEARCH",
    INTERVIEW = "INTERVIEW"
}

export interface Question {
    questionId: String;
    text: String;
    type: QuestionType;
    archived: boolean;
}