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

export type ResponseExercise = {
    "id": number;
    "title": string;
    "day_of_week": string;
    "loop": string;
    "delay_time": string;
    "created_at": string;
    "user_id": number;
}

export interface ISignInResponse {
    "token": string;
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

export interface ISignUpResponse {
    "token": string;
    "user": {
        "id": number;
        "name": string;
        "email": string;
        "created_at": string;
        "updated_at": string;
        "last_login": string;
    };
}

export interface IWeightsReponse {
    weights: Weight[];
}

export interface IHeightsReponse {
    heights: Height[];
}

export interface IExercisesReponse {
    exercises: ResponseExercise[];
}