
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
    exhibitsURLs: string[];
    opportunityIds: string[];
    experienceMapURL: string;
    momentsInTime: string[];
    story: string;
}

export function loadSnapshots(): Promise<SnapshotData[]> {
    return Promise.resolve([
        {
            id: "i-1",
            interviewees: [
                {
                    name: "Robin Smith",
                    profileURL: "/profile.jpg"
                },
                {
                    name: "Jeff Smith",
                    profileURL: "/profile.jpg"
                },
                {
                    name: "Jane Smith",
                    profileURL: "/profile.jpg"
                }
            ],
            company: "My Company",
            recordingURL: "#",
            date: new Date("4/19/25 4:50 PM"),
            interviewers: ["Jeff"],
            leadInterviewer: "Jeff",
            interviewQuestions: ["Tell us about the last time you something"],
            memorableQuotes: [
                {
                    quote: "You're aren't",
                    from: "Robin"
                },
                {
                    quote: "But what if?",
                    from: "Robin"
                }
            ],
            quickFacts: ["16ft tall", "Green and brown", "somewhat \"woodsy\""],
            insights: ["Might actually be a tree. Check out exhibit 1"],
            exhibitsURLs: ["/ex1.png"],
            opportunityIds: ["1", "2", "3"],
            experienceMapURL: "/experience.png",
            momentsInTime: ["A", "B", "C"],
            story: "Read the entire alphabet"
        }
    ]);
}