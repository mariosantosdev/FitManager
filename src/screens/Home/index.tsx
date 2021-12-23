import React, { useContext, useEffect, useState } from 'react';

import { AdMobBanner } from 'expo-ads-admob';
import { HStack, VStack } from 'native-base';

import Menu from '@components/Header';
import LayoutScreen from '@components/LayoutScreen';
import { HourCard, StatsCard } from '@components/Card';
import { Height, UserContext, Weight } from '@contexts/user';
import theme from '@utils/theme';
import { SortItemsByDate } from '@utils/items';

import { Container, TextGreeting } from './styles';

export default function () {
    const { user, weight, height, exercises } = useContext(UserContext);

    const [imc, setIMC] = useState('');
    const [lastWeight, setLastWeight] = useState(0);
    const [lastHeight, setLastHeight] = useState(0);


    function calculateIMC() {
        const isValid = lastHeight && lastWeight;
        const imcNumber = (lastWeight / (Math.pow((lastHeight / 100), 2))).toFixed(2);

        setIMC(isValid ? String(imcNumber) : 'NaN');
    }

    useEffect(() => {
        if (weight.length > 0) {
            const tempLastWeight = SortItemsByDate<Weight, number>(weight).reverse()[0].title.replace(' kg', '')
            setLastWeight(Number(tempLastWeight));
        } else {
            setLastWeight(NaN);
        }
    }, [weight]);

    useEffect(() => {
        if (height.length > 0) {
            const tempLastHeight = SortItemsByDate<Height, number>(height).reverse()[0].title.replace(' cm', '')
            setLastHeight(Number(tempLastHeight));
        } else {
            setLastHeight(NaN);
        }
    }, [height]);

    useEffect(() => calculateIMC(), [lastWeight, lastHeight]);

    return (
        <LayoutScreen>
            <Container contentContainerStyle={{ paddingBottom: 20 }}>
                <Menu />
                <AdMobBanner
                    bannerSize="fullBanner"
                    adUnitID="ca-app-pub-7642727712683174/6790082160" // Test ID, Replace with your-admob-unit-id
                    servePersonalizedAds
                    onDidFailToReceiveAdWithError={(error) => console.log(error)} />
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
                            value={exercises.length > 0 ? exercises.join(', ') : 'Sem Exercícios Hoje!'}
                            variation='exercises'
                            color={theme.colors.variations.color05}
                        />
                    </HStack>
                </VStack>
            </Container>

        </LayoutScreen>
    )
}