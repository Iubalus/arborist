import { api } from "@/api/api";
import { type Question, type QuestionLink, HistoryType } from "@/components/types";
import { recordChange } from "./SessionInteractor";

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