import React, { useContext, useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { UserContext } from '@contexts/user';
import Inner from './Inner';
import Auth from './Auth';
import { getStorageToken } from '@utils/asyncStorage';
import api from '@utils/api';
import { ISignInResponse } from '@utils/apiTypes';
import Loading from '@components/Loading';

export default function Routes() {
    const { user } = useContext(UserContext);
    const { setUser, setHeight, setWeight } = useContext(UserContext).actions;

    const [loading, setLoading] = useState(true);


    useEffect(() => {
        async function signInUsingToken(token: string) {
            const { data } = await api.post<ISignInResponse>('/signin/token', {}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            setLoading(false);

            setUser({ ...data.user, token: data.token });
            setWeight(data.user.weight);
            setHeight(data.user.height);
        }

        async function checkExistToken() {
            const token = await getStorageToken();
            if (token) {
                await signInUsingToken(token);
            } else {
                setLoading(false);
            }
        }

        checkExistToken();
    }, []);

    if (loading) return <Loading />

    return (
        <NavigationContainer>
            {!user.id ? <Auth /> : <Inner />}
        </NavigationContainer>
    )
}