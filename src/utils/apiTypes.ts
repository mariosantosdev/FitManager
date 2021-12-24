export type Height = {
    "id": string;
    "title": string;
    "date": string;
    "created_at": string;
    "user_id": string;
}

export type Weight = {
    "id": string;
    "title": string;
    "date": string;
    "created_at": string;
    "user_id": string;
}

export type ResponseExercise = {
    "id": string;
    "title": string;
    "day_of_week": string;
    "loop": string;
    "delay_time": string;
    "created_at": string;
    "user_id": string;
}

export interface ISignInResponse {
    "token": string;
    "user": {
        "id": string;
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
        "id": string;
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