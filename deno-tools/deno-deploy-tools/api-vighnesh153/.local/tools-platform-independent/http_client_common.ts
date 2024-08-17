export interface HttpQueryParameters {
    [key: string]: string[];
}

export const HttpHeaderKeys = {
    contentType: "Content-Type",
    contentLength: "Content-Length",
    setCookie: "Set-Cookie",
} as const;

export const HttpHeaderValues = {
    contentType: {
        applicationJson: "application/json",
    },
};
