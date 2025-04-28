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