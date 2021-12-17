import React, { useState } from 'react';
import { FlatList } from 'react-native';

import LayoutScreen from '@components/LayoutScreen';
import ListItem from '@components/ListItem';
import Menu from '@components/Header';

import { Container, Footer, Button } from './styles';
import { Divider } from 'native-base';
import ModalCreateItem from '@components/Modals/CreateItem';

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
    const [showModal, setShowModal] = useState(false);

    function handleSubmitWeight(value: string, date: string) {
        if (!weightInput.trim()) return;
        setShowModal(false);

        alert(`${weightInput} kg`);
        setWeightInput('');
    }

    const handleShowModal = () => setShowModal(true);
    const handleHideModal = () => setShowModal(false);

    return (
        <React.Fragment>
            <LayoutScreen>
                <Container>
                    <Menu />
                    <FlatList
                        data={weights}
                        keyExtractor={(item) => `${item.id}`}
                        renderItem={({ item }) => <ListItem item={item} />}
                        ItemSeparatorComponent={() => <Divider />}
                        contentContainerStyle={{ paddingBottom: 20 }}
                    />
                    <Footer>
                        <Button onPress={handleShowModal}>ADICIONAR PESO</Button>
                    </Footer>
                </Container>
            </LayoutScreen>
            <ModalCreateItem
                open={showModal}
                title='Adicionar Peso'
                action={handleSubmitWeight}
                onClose={handleHideModal}
                variant='Peso'
            />
        </React.Fragment>
    )
}