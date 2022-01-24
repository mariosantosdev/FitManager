import React, { useContext, useEffect, useState } from 'react';

import constants from 'expo-constants';
import { AdMobBanner } from 'expo-ads-admob';
import { HStack, useToast, VStack } from 'native-base';

import Menu from '@components/Header';
import LayoutScreen from '@components/LayoutScreen';
import { HourCard, StatsCard } from '@components/Card';
import { UserContext, Height, Weight, Exercise } from '@contexts/user';
import api from '@utils/api';
import { IExercisesReponse } from '@utils/apiTypes';
import { getDayWeekType } from '@utils/date';
import { SortItemsByDate } from '@utils/items';
import theme from '@utils/theme';

import { Container, TextGreeting } from './styles';

export default function () {
    const toast = useToast();
    const { user, weight, height } = useContext(UserContext);

    const [imc, setIMC] = useState('');
    const [lastWeight, setLastWeight] = useState(0);
    const [lastHeight, setLastHeight] = useState(0);
    const [exercises, setExercise] = useState<Exercise[]>([]);

    function calculateIMC() {
        const isValid = lastHeight && lastWeight;
        const imcNumber = (lastWeight / (Math.pow((lastHeight / 100), 2))).toFixed(2);

        setIMC(isValid ? String(imcNumber) : 'NaN');
    }

    async function fetchExercises() {
        try {
            const day = getDayWeekType();
            const { data } = await api.get<IExercisesReponse>(`/exercise?day=${day}`);

            setExercise(data.exercises);
        } catch (error: any) {
            if (error.response) {
                // A requisição foi feita e o servidor respondeu com um código de status
                // que sai do alcance de 2xx
                console.log('response')
                console.error(error.response.data);
                console.error(error.response.status);
                console.error(error.response.headers);
            } else if (error.request) {
                // A requisição foi feita mas nenhuma resposta foi recebida
                // `error.request` é uma instância do XMLHttpRequest no navegador e uma instância de
                // http.ClientRequest no node.js
                console.log('request')
                console.error(error.request);
            } else {
                // Alguma coisa acontenceu ao configurar a requisição que acionou este erro.
                console.error('Error', error.message);
            }


            toast.show({
                title: 'Erro',
                description: 'Não foi possível encontrar seus exercícios de hoje...',
                status: 'error',
            });
        }
    }

    useEffect(() => {
        if (weight.length > 0) {
            const tempLastWeight = SortItemsByDate<Weight, string>(weight).reverse()[0].title.replace(' kg', '')
            setLastWeight(Number(tempLastWeight));
        } else {
            setLastWeight(NaN);
        }
    }, [weight]);

    useEffect(() => {
        if (height.length > 0) {
            const tempLastHeight = SortItemsByDate<Height, string>(height).reverse()[0].title.replace(' cm', '')
            setLastHeight(Number(tempLastHeight));
        } else {
            setLastHeight(NaN);
        }
    }, [height]);

    useEffect(() => calculateIMC(), [lastWeight, lastHeight]);

    useEffect(() => { fetchExercises() }, []);

    return (
        <LayoutScreen>
            <Container contentContainerStyle={{ paddingBottom: 20 }}>
                <Menu />
                {!constants.manifest.extra.developmentMode && (
                    <AdMobBanner
                        bannerSize="fullBanner"
                        adUnitID="ca-app-pub-7642727712683174/6790082160" // Test ID, Replace with your-admob-unit-id
                        servePersonalizedAds
                        onDidFailToReceiveAdWithError={(error) => console.log(error)} />
                )}
                <TextGreeting>Olá, {user.name.split(' ')[0]}</TextGreeting>
                <HourCard />

                <VStack space={4} alignItems='center'>
                    <HStack space={4}>
                        <StatsCard
                            value={lastWeight ? `${lastWeight}` : 'NaN'}
                            variation='weight'
                            color={theme.colors.variations.color01}
                        />
                        <StatsCard
                            value={lastHeight ? `${lastHeight}` : 'NaN'}
                            variation='height'
                            color={theme.colors.variations.color02}
                        />
                    </HStack>
                    <HStack space={4}>
                        <StatsCard
                            value={imc}
                            variation='imc'
                            color={theme.colors.variations.color03}
                        />
                        <StatsCard
                            value='0'
                            variation='steps'
                            color={theme.colors.variations.color04}
                        />
                    </HStack>
                    <HStack>
                        <StatsCard
                            value={
                                exercises.length > 0 ?
                                    exercises.map(exercise => exercise.title).join(', ')
                                    : 'Sem Exercícios Hoje!'
                            }
                            variation='exercises'
                            color={theme.colors.variations.color05}
                        />
                    </HStack>
                </VStack>
            </Container>

        </LayoutScreen>
    )
}