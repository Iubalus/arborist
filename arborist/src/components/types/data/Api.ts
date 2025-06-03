export interface ApiResponse<Body> {
    code: number;
    message: string;
    content: Body;
}

export interface Request<Payload> {
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    resource: string;
    payload?: Payload;
}

export function apiCall<Payload, Response>(request: Request<Payload>): Promise<ApiResponse<Response>> {
    if (!!request) {

    }
    return Promise.resolve({
        code: 200,
        message: "Good",
        content: null as unknown as Response
    });
}
