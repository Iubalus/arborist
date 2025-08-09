import type { ImageFile } from "../bits/image/ImageFile";
import type { NamedImage } from "./NamedImage";

export interface Interviewee extends NamedImage {
    
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
    date: string;
    interviewers: string[];
    leadInterviewer: string;
    interviewQuestions: string[];
    memorableQuotes: Quote[];
    quickFacts: string[];
    insights: string[];
    exhibits: NamedImage[];    
    experienceMap: ImageFile;
    momentsInTime: string[];
    story: string;
}