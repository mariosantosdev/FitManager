import React from 'react';

import { HStack, VStack } from 'native-base';

import LayoutScreen from '@components/LayoutScreen';
import { HourCard, StatsCard } from '@components/Card';
import theme from '@utils/theme';

import { Container, TextGreeting } from './styles';
import Menu from '@components/Header';

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
        <LayoutScreen>
            <Container contentContainerStyle={{ paddingBottom: 20 }}>
                <Menu />
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

        </LayoutScreen>
    )
}