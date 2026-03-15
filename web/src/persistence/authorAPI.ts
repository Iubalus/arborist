import type {APIResponse} from "@/persistence/APIResponse.ts";

let currentAuthor = null as unknown as Author;

async function loadAuthors(): Promise<APIResponse<Author[]>> {
    return Promise.resolve({
        data: [
            {
                authorId: "123213213",
                name: "John Smith"
            }
        ]
    });
}

function setCurrentAuthor(author: Author) {
    currentAuthor = author;
}

function getCurrentAuthor(): Author {
    return currentAuthor;
}


async function createAuthor(name: string): Promise<APIResponse<Author>> {
    console.log("Create author", name)
    return Promise.resolve({});
}

async function updateAuthor(toUpdate: Author): Promise<APIResponse<Author>> {
    console.log("Update author", toUpdate)
    return Promise.resolve({});
}

export interface Author {
    authorId: string;
    name: string;
}

export interface AuthorAPI {
    loadAuthors(): Promise<APIResponse<Author[]>>;

    createAuthor(name: String): Promise<APIResponse<Author>>;

    updateAuthor(toUpdate: Author): Promise<APIResponse<Author>>;

    setCurrentAuthor(author: Author): void;

    getCurrentAuthor(): Author;
}

export function authorAPI(): AuthorAPI {
    return {
        loadAuthors,
        createAuthor,
        updateAuthor,
        setCurrentAuthor,
        getCurrentAuthor
    }
}