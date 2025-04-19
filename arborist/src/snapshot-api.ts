
export interface Interviewee {
    name: string;
    profileURL: string;
}

export interface Quote {
    quote: string;
    from: string;
}

export interface Snapshot {
    id: string;
    interviewees: Interviewee[];
    company: string;
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

export function createSnapshot() {

}

export function loadSnapshots(): Promise<Snapshot[]> {
    return Promise.resolve([
        {
            id: "i1",
            interviewees: [
                {
                    name: "Robin Smith",
                    profileURL: "/profile.jpg"
                }
            ],
            company: "My Company",
            date: new Date("4/19/25 4:50PM"),
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