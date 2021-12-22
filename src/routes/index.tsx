import React, { useContext, useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { UserContext } from '@contexts/user';
import Inner from './Inner';
import Auth from './Auth';
import { getStorageToken } from '@utils/asyncStorage';

export default function Routes() {
    const { user } = useContext(UserContext);

    useEffect(() => {
        async function checkExistToken() {
            const token = await getStorageToken();
            console.log(token);
        }

        checkExistToken();
    }, []);

    return (
        <NavigationContainer>
            {!user.id ? <Auth /> : <Inner />}
        </NavigationContainer>
    )
}