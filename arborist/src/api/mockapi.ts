import type { Question, QuestionLink } from "../components/pages/QuestionsInteractor";
import type { HistoryType, Identity } from "../components/pages/SessionInteractor";
import type { API } from "./api";

let questionStore = [] as Question[];
let questionLink = [] as QuestionLink[];
let identities = [] as Identity[];
let history = [];
let currentIdentity = null as unknown as Identity;

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

export function createAPI(): API {
    return {
        loadQuestions: function (): Promise<Question[]> {
            return Promise.resolve([...questionStore]);
        },
        loadQuestionLinks: function (): Promise<QuestionLink[]> {
            return Promise.resolve([...questionLink]);
        },
        saveQuestion: function (question: Question): Promise<String> {
            questionStore.push(question);
            question.questionId = generateUUID();
            return Promise.resolve(question.questionId)
        },
        archiveQuestion: function (questionId: String): Promise<void> {
            questionStore.filter(v => v.questionId === questionId).map(q => q.archived = true);
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
        }
    } as API
}