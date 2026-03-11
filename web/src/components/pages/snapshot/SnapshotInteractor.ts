import { persistence } from "@/persistence/persistence";
import { type ImageFile } from "@/components/bits";
import {
    type Interviewee,
    type NamedImage,
    type Quote,
    type SnapshotData
} from "@/components/types";

export async function createSnapshot(): Promise<String> {
    let locator = await persistence().createLocator("snapshot");
    console.log(locator);
    return (await persistence().save(
        locator,
        {
            id: locator,
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
        })).message;
}

export async function saveSnapshot(snapshot: SnapshotData): Promise<String> {
    return (await persistence().save(snapshot.id, snapshot)).message;
}

export async function loadSnapshots(): Promise<SnapshotData[]> {
    return (await persistence().list('snapshot', [])).content;    
}