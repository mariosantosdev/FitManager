import React, { useContext, useEffect, useState } from 'react';

import { useToast } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';

import Loading from '@components/Loading';
import { UserContext } from '@contexts/user';
import api from '@utils/api';
import { ISignInResponse } from '@utils/apiTypes';
import { clearStorageToken, getStorageToken } from '@utils/asyncStorage';

import Auth from './Auth';
import Inner from './Inner';

export default function Routes() {
    const toast = useToast();
    const { user } = useContext(UserContext);
    const { setUser, setHeight, setWeight } = useContext(UserContext).actions;

    const [loading, setLoading] = useState(true);


    useEffect(() => {
        async function signInUsingToken(token: string) {
            try {
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const { data } = await api.post<ISignInResponse>('/signin/token', {});
                setLoading(false);

                setUser({ ...data.user, token: data.token });
                setWeight(data.user.weight);
                setHeight(data.user.height);
            } catch (error: any) {
                if (error.response.status === 401) {
                    await clearStorageToken();
                }

                toast.show({
                    title: 'Erro',
                    description: 'Ocorreu um erro ao recuperar sua sessão. Acesse sua conta novamente.',
                    status: 'error',
                    placement: 'bottom',
                });
                setLoading(false);
                console.log(error.toJSON());
            }
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