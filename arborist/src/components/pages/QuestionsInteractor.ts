import { api } from "../../api/api";
import { HistoryType, recordChange } from "./SessionInteractor";

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

export async function loadQuestions(): Promise<Question[]> {
    return await api().loadQuestions();
}

export async function loadQuestionlinks(): Promise<QuestionLink[]> {
    return await api().loadQuestionLinks();
}

export async function saveQuestion(question: Question) {
    let id = await api().saveQuestion(question);
    await recordChange(HistoryType.QUESTION, id);
}

export async function archiveQuestion(id: String) {
    await api().archiveQuestion(id);
    await recordChange(HistoryType.QUESTION, id);
}

export async function linkQuestion(link: QuestionLink) {
    await api().linkQuestion(link);
}

export async function unlinkQuestion(link: QuestionLink) {
    await api().unlinkQuestion(link);
}