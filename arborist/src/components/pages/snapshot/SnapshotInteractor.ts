import { api } from "@/api/api";
import { type ImageFile } from "@/components/bits";
import {
    type Interviewee,
    type NamedImage,
    type Quote,
    type SnapshotData
} from "@/components/types";

export async function createSnapshot(): Promise<String> {
    return await api().saveSnapshot({
        id: null as unknown as string,
        interviewees: [] as Interviewee[],
        company: null as unknown as string,
        recordingURL: null as unknown as string,
        date: null as unknown as string,
        interviewers: [] as string[],
        leadInterviewer: null as unknown as string,
        interviewQuestions: [] as string[],
        memorableQuotes: [] as Quote[],
        quickFacts: [] as string[],
        insights: [] as string[],
        exhibits: [] as NamedImage[],
        experienceMap: null as unknown as ImageFile,
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