import React, { useState } from "react";

type Exercise = {
    id: number;
    title: string;
    day_of_week: string;
    delay_time?: string;
    loop?: string;
}

type Height = {
    id: number;
    title: string;
    date: string;
}

type Weight = {
    id: number;
    title: string;
    date: string;
}

type User = {
    id: number;
    name: string;
    email: string;
    token: string;
    refreshToken: string;
}

interface IUserContext {
    user: User;
    weight: Weight[];
    height: Height[];
    exercises: Exercise[];

    actions: {
        setUser: React.Dispatch<React.SetStateAction<User>>;
        setWeight: React.Dispatch<React.SetStateAction<Weight[]>>;
        setHeight: React.Dispatch<React.SetStateAction<Height[]>>;
        setExercise: React.Dispatch<React.SetStateAction<Exercise[]>>;
    }
}

export const UserContext = React.createContext({} as IUserContext);

export default function UserContextProvider({ children }) {
    const [user, setUser] = useState<User>({
        id: 0,
        name: '',
        email: '',
        token: '',
        refreshToken: ''
    });

    const [weight, setWeight] = useState<Weight[]>([]);
    const [height, setHeight] = useState<Height[]>([]);
    const [exercises, setExercise] = useState<Exercise[]>([]);

    const actions = {
        setUser,
        setWeight,
        setHeight,
        setExercise
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

