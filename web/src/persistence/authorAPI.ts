let authorSession = {
    currentAuthorId: null as unknown as string
}
let currentAuthor = null as unknown as Author;
let apiVersion = "v1";

const AUTHOR_SESSION_TOKEN = "arborist-author-session";
let fromLocal = localStorage.getItem(AUTHOR_SESSION_TOKEN);
if (!!fromLocal) {
    authorSession = {...authorSession, ...JSON.parse(fromLocal)};
}

function setCurrentAuthor(authorId: string) {
    authorSession.currentAuthorId = authorId;
    localStorage.setItem(AUTHOR_SESSION_TOKEN, JSON.stringify(authorSession));
}

function getCurrentAuthorId(): string{
    return authorSession.currentAuthorId;
}

async function getCurrentAuthor(): Promise<Author> {
    if (!!currentAuthor) {
        return Promise.resolve(currentAuthor);
    }
    if (!!authorSession.currentAuthorId) {
        return await loadAuthor(authorSession.currentAuthorId);
    }
    return Promise.resolve(null as unknown as Author);
}

async function loadAuthor(id: string): Promise<Author> {
    let response = await fetch(`author/${apiVersion}/get?id=${id}`)
    return response.json();
}

async function loadAuthors(): Promise<Author[]> {
    let response = await fetch(`author/${apiVersion}/list`);
    return response.json();
}

async function createAuthor(name: string): Promise<Author> {
    let response = await fetch(`author/${apiVersion}/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({"name": name}),
    });
    return response.json();
}

async function updateAuthor(toUpdate: Author): Promise<Author> {
    let response = await fetch(`author/${apiVersion}/update`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({"authorId": toUpdate.authorId, "name": toUpdate.name}),
    });
    return response.json();
}

export interface Author {
    authorId: string;
    apiVersion: string;
    name: string;
}

export interface AuthorAPI {
    loadAuthor(id: string): Promise<Author>

    loadAuthors(): Promise<Author[]>;

    createAuthor(name: String): Promise<Author>;

    updateAuthor(toUpdate: Author): Promise<Author>;

    setCurrentAuthor(authorId: string): void;

    getCurrentAuthorId(): string;

    getCurrentAuthor(): Promise<Author>;
}

export function authorAPI(): AuthorAPI {
    return {
        loadAuthor,
        loadAuthors,
        createAuthor,
        updateAuthor,
        setCurrentAuthor,
        getCurrentAuthorId,
        getCurrentAuthor
    }
}