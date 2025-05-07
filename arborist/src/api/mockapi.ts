import type { Opportunity } from "../components/types/Opportunity";
import type { Question, QuestionLink } from "../components/types/Questions";
import type { HistoryType, Identity } from "../components/types/Session";
import type { Interviewee, Quote, SnapshotData} from "../components/types/Snapshot";
import type { API } from "./api";

let questions = [] as Question[];
let questionLink = [] as QuestionLink[];
let identities = [] as Identity[];
let history = [];
let currentIdentity = null as unknown as Identity;
let opportunities = [
    {
        opportunityId: "TEMP",
        parentOpportunityId: null as unknown as String,
        text: "Improve the experience",
        snapshotIds: ["i-1"]
    }
] as Opportunity[];
let snapshots = [
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
    }
] as SnapshotData[];

function generateUUID() {
    let template = "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX";
    let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']
    let uuid = "";
    for (let i = 0; i < template.length; i++) {
        if (template.charAt(i) == 'X') {
            uuid += hex[Math.floor(Math.random() * hex.length)];
        } else {
            uuid += template.charAt(i);
        }
    }
    return uuid;
}

function nextSnapshotId() {
    return `i-${Math.max(...snapshots.map(s => parseInt(s.id.split("-")[1]))) + 1}`;
}

export function createAPI(): API {
    return {
        loadQuestions: function (): Promise<Question[]> {
            return Promise.resolve([...questions]);
        },
        loadQuestionLinks: function (): Promise<QuestionLink[]> {
            return Promise.resolve([...questionLink]);
        },
        saveQuestion: function (question: Question): Promise<String> {
            if (!!question.questionId) {
                for (let i = 0; i < questions.length; i++) {
                    if (questions[i].questionId === question.questionId) {
                        questions[i] = question;
                    }
                }
            } else {
                questions.push(question);
                question.questionId = generateUUID();
            }
            return Promise.resolve(question.questionId)
        },
        archiveQuestion: function (questionId: String): Promise<void> {
            questions.filter(v => v.questionId === questionId).map(q => q.archived = true);
            return Promise.resolve();
        },
        linkQuestion: function (link: QuestionLink): Promise<void> {
            questionLink.push(link);
            return Promise.resolve();
        },
        unlinkQuestion: function (link: QuestionLink): Promise<void> {
            questionLink.push(link);
            return Promise.resolve();
        },
        listIdentities: function (): Promise<Identity[]> {
            return Promise.resolve([...identities])
        },
        addIdentity: function (identity: Identity): Promise<void> {
            identities.push(identity);
            return Promise.resolve();
        },
        becomeIdentity: function (identity: Identity): Promise<void> {
            currentIdentity = identity;
            return Promise.resolve();
        },
        whoAmI: function (): Promise<Identity> {
            return Promise.resolve(currentIdentity);
        },
        recordChange: function (identity: Identity, type: HistoryType, id: String, time: Date): Promise<void> {
            history.push({
                name: identity.name,
                type: type,
                id: id,
                time: time
            })
            return Promise.resolve();
        },
        loadSnapshots: function (): Promise<SnapshotData[]> {
            return Promise.resolve([...snapshots]);
        },
        saveSnapshot: function (snapshot: SnapshotData) {
            if (!!snapshot.id) {
                for (let i = 0; i < snapshots.length; i++) {
                    if (snapshots[i].id === snapshot.id) {
                        snapshots[i] = snapshot;
                    }
                }
            } else {
                snapshot.id = nextSnapshotId();
                snapshots.push(snapshot);
            }
        },
        findSnapshotOpportunities: function (snapshotId: String): Promise<Opportunity[]> {
            return Promise.resolve(opportunities.filter((o: Opportunity) => o.snapshotIds.includes(snapshotId)))
        },
        saveOpportunity: function (opportunity: Opportunity): Promise<String> {
            if (!!opportunity.opportunityId) {
                for (let i = 0; i < opportunities.length; i++) {
                    if (opportunities[i].opportunityId === opportunity.opportunityId) {
                        opportunities[i] = opportunity;
                    }
                }
            } else {
                opportunity.opportunityId = generateUUID();
                opportunities.push(opportunity);
            }
            //remove fully unassociated
            opportunities = opportunities.filter((o: Opportunity) => o.snapshotIds.length > 0);
            return Promise.resolve(opportunity.opportunityId)
        }
    } as API
}