import React, { useState } from "react";

export type Exercise = {
    id: number;
    title: string;
    day_of_week: string;
    delay_time?: string;
    loop?: string;
}

export type Height = {
    id: number;
    title: string;
    date: string;
}

export type Weight = {
    id: number;
    title: string;
    date: string;
}

export type User = {
    id: number;
    name: string;
    email: string;
    token: string;
}

export interface IUserContext {
    user: User;
    weight: Weight[];
    height: Height[];
    exercises: Exercise[];

    actions: {
        setUser: React.Dispatch<React.SetStateAction<User>>;
        setWeight: React.Dispatch<React.SetStateAction<Weight[]>>;
        setHeight: React.Dispatch<React.SetStateAction<Height[]>>;
        setExercise: React.Dispatch<React.SetStateAction<Exercise[]>>;
        signOut: () => void;
    }
}

export const UserContext = React.createContext({} as IUserContext);

export default function UserContextProvider({ children }) {
    const [user, setUser] = useState<User>({
        id: 0,
        name: '',
        email: '',
        token: '',
    });

    const [weight, setWeight] = useState<Weight[]>([]);
    const [height, setHeight] = useState<Height[]>([]);
    const [exercises, setExercise] = useState<Exercise[]>([]);

    function signOut() {
        setUser({
            id: 0,
            name: '',
            email: '',
            token: '',
        });
        setWeight([]);
        setHeight([]);
        setExercise([]);
    }

    const actions = {
        setUser,
        setWeight,
        setHeight,
        setExercise,
        signOut,
    }

    return (
        <UserContext.Provider
            value={{
                user,
                weight,
                height,
                exercises,
                actions,
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

