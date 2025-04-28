import { api } from "../../api/api";

export interface Interviewee {
    name: string;
    profileURL: string;
}

export interface Quote {
    quote: string;
    from: string;
}

export interface SnapshotData {
    id: string;
    interviewees: Interviewee[];
    company: string;
    recordingURL: string;
    date: Date;
    interviewers: string[];
    leadInterviewer: string;
    interviewQuestions: string[];
    memorableQuotes: Quote[];
    quickFacts: string[];
    insights: string[];
    exhibits: { name: string, url: string }[];
    opportunityIds: string[];
    experienceMapURL: string;
    momentsInTime: string[];
    story: string;
}

export async function createSnapshot(): Promise<String> {
    return await api().saveSnapshot({
        id: null as unknown as string,
        interviewees: [] as Interviewee[],
        company: null as unknown as string,
        recordingURL: null as unknown as string,
        date: null as unknown as Date,
        interviewers: [] as string[],
        leadInterviewer: null as unknown as string,
        interviewQuestions: [] as string[],
        memorableQuotes: [] as Quote[],
        quickFacts: [] as string[],
        insights: [] as string[],
        exhibits: [] as { name: string, url: string }[],
        opportunityIds: [] as string[],
        experienceMapURL: null as unknown as string,
        momentsInTime: [] as string[],
        story: null as unknown as string
    });
}

export async function saveSnapshot(snapshot: SnapshotData): Promise<String> {
    return await api().saveSnapshot(snapshot);
}

export async function loadSnapshots(): Promise<SnapshotData[]> {
    return await api().loadSnapshots();
}