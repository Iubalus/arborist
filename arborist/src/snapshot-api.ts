
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
                }
            ],
            company: "My Company",
            recordingURL: "#",
            date: new Date("4/19/25 4:50 PM"),
            interviewers: ["Jeff", "Jake", "Jane"],
            leadInterviewer: "Jeff",
            interviewQuestions: ["Tell us about the last time you something"],
            memorableQuotes: [
                {
                    quote: "You're aren't",
                    from: "Robin"
                },
                {
                    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pellentesque mi consectetur mauris fermentum, id faucibus neque dapibus. Phasellus vestibulum felis placerat, egestas dui ut, dictum dolor. Maecenas id euismod purus, ac faucibus nisi. Aenean et maximus neque, eu mollis turpis. In vitae urna libero. ",
                    from: "Robin"
                }
            ],
            quickFacts: ["16ft tall", "Green and brown", "somewhat \"woodsy\""],
            insights: ["Might actually be a tree. Check out exhibit 1"],
            exhibits: [{ name: "Exhibit 1", url: "/profile.jpg" }, { name: "Exhibit 2", url: "/profile.jpg" }],
            opportunityIds: ["1", "2", "3"],
            experienceMapURL: "/experience.png",
            momentsInTime: ["A", "B", "C"],
            story: "Read the entire alphabet"
        },
        {
            id: "i-2",
            interviewees: [] as Interviewee[],
            company: null as unknown as string,
            recordingURL: null as unknown as string,
            date: null as unknown as Date,
            interviewers: [] as String[],
            leadInterviewer: null as unknown as String,
            interviewQuestions: [] as String[],
            memorableQuotes: [] as Quote[],
            quickFacts: [] as String[],
            insights: [] as String[],
            exhibits: [] as { name: string, url: string }[],
            opportunityIds: [] as String[],
            experienceMapURL: null as unknown as String,
            momentsInTime: [] as String[],
            story: null as unknown as String
        }
    ]);
}