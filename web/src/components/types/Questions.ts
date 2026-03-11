export interface QuestionLink {
    leftQuestionId: String;
    rightQuestionId: String;
}

export interface Question {
    questionId: String;
    text: String;
    type: 'RESEARCH' | 'INTERVIEW';
    archived: boolean;
}