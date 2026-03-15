import type {APIResponse} from "@/persistence/APIResponse.ts";

let currentAuthor = null as unknown as Author;
let apiVersion = "v1";

function setCurrentAuthor(author: Author) {
    currentAuthor = author;
}

function getCurrentAuthor(): Author {
    return currentAuthor;
}

async function loadAuthor(id: string): Promise<APIResponse<Author>> {
    let response = await fetch(`author/${apiVersion}/get?id=${id}`)
    return response.json();
}

async function loadAuthors(): Promise<APIResponse<Author[]>> {
    let response = await fetch(`author/${apiVersion}/list`);
    return response.json();
}

async function createAuthor(name: string): Promise<APIResponse<Author>> {
    let response = await fetch(`author/${apiVersion}/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({"name": name}),
    });
    return response.json();
}

async function updateAuthor(toUpdate: Author): Promise<APIResponse<Author>> {
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
    name: string;
}

export interface AuthorAPI {
    loadAuthor(id:string): Promise<APIResponse<Author>>

    loadAuthors(): Promise<APIResponse<Author[]>>;

    createAuthor(name: String): Promise<APIResponse<Author>>;

    updateAuthor(toUpdate: Author): Promise<APIResponse<Author>>;

    setCurrentAuthor(author: Author): void;

    getCurrentAuthor(): Author;
}

export function authorAPI(): AuthorAPI {
    return {
        loadAuthor,
        loadAuthors,
        createAuthor,
        updateAuthor,
        setCurrentAuthor,
        getCurrentAuthor
    }
}