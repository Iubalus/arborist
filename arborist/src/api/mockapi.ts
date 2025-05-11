import type { ImageFile } from "../components/types/ImageFile";
import type { NamedImage } from "../components/types/NamedImage";
import type { Opportunity } from "../components/types/Opportunity";
import type { Question, QuestionLink } from "../components/types/Questions";
import type { HistoryType, Identity } from "../components/types/Session";
import type { Interviewee, Quote, SnapshotData } from "../components/types/Snapshot";
import { generateUUID } from "../components/util/uuid-util";
import type { API } from "./api";

const ARBORIST_DATA_KEY = "arborist-data";

let data = {
    questions: [] as Question[],
    questionLink: [] as QuestionLink[],
    identities: [] as Identity[],
    history: [] as any[],
    images: [] as ImageFile[],
    currentIdentity: null as unknown as Identity,
    opportunities: [
        {
            opportunityId: "TEMP",
            parentOpportunityId: null as unknown as String,
            text: "Improve the experience",
            snapshotIds: ["i-1"]
        }
    ] as Opportunity[],
    snapshots: [
        {
            id: "i-1",
            interviewees: [
                {
                    name: "Robin Smith",
                    image: null as unknown as ImageFile
                },
                {
                    name: "Jeff Smith",
                    image: null as unknown as ImageFile
                }
            ] as Interviewee[],
            company: "My Company",
            recordingURL: "#",
            date: "2025-04-19T22:50:00.000Z",
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
            exhibits: [{ name: "Exhibit 1", image: null as unknown as ImageFile }, { name: "Exhibit 2", image: null as unknown as ImageFile }] as NamedImage[],
            experienceMap: null as unknown as ImageFile,
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
            exhibits: [] as NamedImage[],
            experienceMap: null as unknown as ImageFile,
            momentsInTime: [] as string[],
            story: null as unknown as string
        }
    ] as SnapshotData[]
}

let fromLocal = localStorage.getItem(ARBORIST_DATA_KEY);
if (!!fromLocal) {
    data = { ...data, ...JSON.parse(fromLocal) };
}

function nextSnapshotId() {
    return `i-${Math.max(...data.snapshots.map(s => parseInt(s.id.split("-")[1]))) + 1}`;
}

function commitStore() {
    //disabling this since the images are too large
    localStorage.setItem(ARBORIST_DATA_KEY, JSON.stringify(data));
}

export function clearCachedData() {
    localStorage.setItem(ARBORIST_DATA_KEY, "");
}

export function createAPI(): API {
    return {
        loadQuestions: function (): Promise<Question[]> {
            return Promise.resolve([...data.questions]);
        },
        loadQuestionLinks: function (): Promise<QuestionLink[]> {
            return Promise.resolve([...data.questionLink]);
        },
        saveQuestion: function (question: Question): Promise<String> {
            if (!!question.questionId) {
                for (let i = 0; i < data.questions.length; i++) {
                    if (data.questions[i].questionId === question.questionId) {
                        data.questions[i] = question;
                    }
                }
            } else {
                data.questions.push(question);
                question.questionId = generateUUID();
            }
            commitStore();
            return Promise.resolve(question.questionId)
        },
        archiveQuestion: function (questionId: String): Promise<void> {
            data.questions.filter(v => v.questionId === questionId).map(q => q.archived = true);
            commitStore();
            return Promise.resolve();
        },
        linkQuestion: function (link: QuestionLink): Promise<void> {
            data.questionLink.push(link);
            commitStore();
            return Promise.resolve();
        },
        unlinkQuestion: function (link: QuestionLink): Promise<void> {
            data.questionLink.push(link);
            commitStore();
            return Promise.resolve();
        },
        listIdentities: function (): Promise<Identity[]> {
            return Promise.resolve([...data.identities])
        },
        addIdentity: function (identity: Identity): Promise<void> {
            data.identities.push(identity);
            commitStore();
            return Promise.resolve();
        },
        becomeIdentity: function (identity: Identity): Promise<void> {
            data.currentIdentity = identity;
            commitStore();
            return Promise.resolve();
        },
        whoAmI: function (): Promise<Identity> {
            return Promise.resolve(data.currentIdentity);
        },
        recordChange: function (identity: Identity, type: HistoryType, id: String, time: Date): Promise<void> {
            data.history.push({
                name: identity.name,
                type: type,
                id: id,
                time: time
            });
            commitStore();
            return Promise.resolve();
        },
        loadSnapshots: function (): Promise<SnapshotData[]> {
            return Promise.resolve([...data.snapshots]);
        },
        saveSnapshot: function (snapshot: SnapshotData): Promise<String> {
            if (!!snapshot.id) {
                for (let i = 0; i < data.snapshots.length; i++) {
                    if (data.snapshots[i].id === snapshot.id) {
                        data.snapshots[i] = snapshot;
                    }
                }
            } else {
                snapshot.id = nextSnapshotId();
                data.snapshots.push(snapshot);
            }
            commitStore();
            return Promise.resolve(snapshot.id);
        },
        findSnapshotOpportunities: function (snapshotId: String): Promise<Opportunity[]> {
            return Promise.resolve(data.opportunities.filter((o: Opportunity) => o.snapshotIds.includes(snapshotId)))
        },
        saveOpportunity: function (opportunity: Opportunity): Promise<String> {
            if (!!opportunity.opportunityId) {
                for (let i = 0; i < data.opportunities.length; i++) {
                    if (data.opportunities[i].opportunityId === opportunity.opportunityId) {
                        data.opportunities[i] = opportunity;
                    }
                }
            } else {
                opportunity.opportunityId = generateUUID();
                data.opportunities.push(opportunity);
            }
            //remove fully unassociated
            data.opportunities = data.opportunities.filter((o: Opportunity) => o.snapshotIds.length > 0);
            commitStore();
            return Promise.resolve(opportunity.opportunityId)
        },
        saveImage: function (image: ImageFile): Promise<String> {
            if (!!image.imageId) {
                for (let i = 0; i < data.images.length; i++) {
                    if (data.images[i].imageId === image.imageId) {
                        data.images[i] = image;
                    }
                }
            } else {
                image.imageId = generateUUID();
                data.images.push(image);
            }
            commitStore();
            return Promise.resolve(image.imageId);
        },
        deleteImage: function (imageId: string): Promise<void> {
            data.images = data.images.filter(i => i.imageId !== imageId);
            commitStore();
            return Promise.resolve();
        },
        export: function (): Promise<any> {
            return Promise.resolve(data);
        },
        import: function (newData: any): Promise<void> {
            data = { ...data, ...newData };
            commitStore();
            return Promise.resolve();
        }
    } as API
}