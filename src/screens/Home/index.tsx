import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RFValue } from 'react-native-responsive-fontsize';

import Header from '@components/Header';
import { Container, TextGreeting } from './styles';
import { HourCard, StatsCard } from '@components/Card';
import { HStack, VStack } from 'native-base';
import theme from '@utils/theme';

const stats = {
    name: 'Ana Flávia',
    hour: '18:35',
    date: '4 de Setembro de 2021',
    weight: '54',
    height: '163',
    imc: '19',
    steps: '1243',
    exercises: ['Flexão', 'Abdominal', 'Cárdio']
}

export default function () {
    return (
        <SafeAreaView>
            <Header title='Inicio' />
            <Container contentContainerStyle={{ paddingBottom: RFValue(20) }}>
                <TextGreeting>Olá, {stats.name.split(' ')[0]}</TextGreeting>
                <HourCard />

                <VStack space={4} alignItems='center'>
                    <HStack space={4}>
                        <StatsCard
                            value={stats.weight}
                            variation='weight'
                            color={theme.colors.variations.color01}
                        />
                        <StatsCard
                            value={stats.height}
                            variation='height'
                            color={theme.colors.variations.color02}
                        />
                    </HStack>
                    <HStack space={4}>
                        <StatsCard
                            value={stats.imc}
                            variation='imc'
                            color={theme.colors.variations.color03}
                        />
                        <StatsCard
                            value={stats.steps}
                            variation='steps'
                            color={theme.colors.variations.color04}
                        />
                    </HStack>
                    <HStack>
                        <StatsCard
                            value={stats.exercises.join(', ')}
                            variation='exercises'
                            color={theme.colors.variations.color05}
                        />
                    </HStack>
                </VStack>
            </Container>
        </SafeAreaView>
    )
}