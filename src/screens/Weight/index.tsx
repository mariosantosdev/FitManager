import React, { useState } from 'react';
import { FlatList } from 'react-native';

import LayoutScreen from '@components/LayoutScreen';
import ListItem from '@components/ListItem';
import Menu from '@components/Header';
import theme from '@utils/theme';

import { Container, Footer, Input } from './styles';
import { Divider } from 'native-base';

type Weight = {
    id: number;
    title: string;
    date: string;
}

const weights: Weight[] = [
    {
        id: 1,
        title: '54kg',
        date: 'Mon, 13 Dec 2021 00:56:27 +0000',
    },
    {
        id: 2,
        title: '59kg',
        date: 'Mon, 13 Dec 2021 00:56:27 +0000',
    },
]

export default function () {
    const [weightInput, setWeightInput] = useState('');

    function handleSubmitWeight() {
        if (!weightInput.trim()) return;

        alert(`${weightInput} kg`);
        setWeightInput('');
    }

    return (
        <LayoutScreen>
            <Container>
                <Menu />
                <FlatList
                    data={weights}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={({ item }) => <ListItem item={item} />}
                    ItemSeparatorComponent={() => <Divider />}
                    contentContainerStyle={{ flex: 1 }}
                />
                <Footer>
                    <Input
                        placeholder='ADICIONAR PESO'
                        placeholderTextColor={theme.colors.text.inDark}
                        keyboardType='numeric'
                        onSubmitEditing={handleSubmitWeight}
                        value={weightInput}
                        onChangeText={setWeightInput}
                    />
                </Footer>
            </Container>
        </LayoutScreen>
    )
}