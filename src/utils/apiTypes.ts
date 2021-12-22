export type Height = {
    "id": number;
    "title": string;
    "date": string;
    "created_at": string;
    "user_id": number;
}

export type Weight = {
    "id": number;
    "title": string;
    "date": string;
    "created_at": string;
    "user_id": number;
}

export interface ISignInResponse {
    "token": string;
    "refreshToken": string;
    "user": {
        "id": number;
        "name": string;
        "email": string;
        "last_login": string;
        "created_at": string;
        "updated_at": string;
        "height": Height[],
        "weight": Weight[],
    };
}