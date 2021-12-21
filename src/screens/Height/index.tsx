import React, { useState } from 'react';
import { AdMobBanner } from 'expo-ads-admob';
import { FlatList } from 'react-native';

import LayoutScreen from '@components/LayoutScreen';
import ListItem from '@components/ListItem';
import Menu from '@components/Header';

import { Container, Footer, Button } from './styles';
import { Divider } from 'native-base';
import ModalCreateItem from '@components/Modals/CreateItem';

type Height = {
    id: number;
    title: string;
    date: string;
}

const heights: Height[] = [
    {
        id: 1,
        title: '163cm',
        date: 'Mon, 13 Dec 2021 00:56:27 +0000',
    },
    {
        id: 2,
        title: '160cm',
        date: 'Mon, 9 Dec 2021 00:56:27 +0000',
    },
]

export default function () {
    const [heightInput, setHeightInput] = useState('');
    const [showModal, setShowModal] = useState(false);

    function handleSubmitHeight(value: string, date: string) {
        if (!heightInput.trim()) return;
        setShowModal(false);

        alert(`${heightInput} cm`);
        setHeightInput('');
    }

    const handleShowModal = () => setShowModal(true);
    const handleHideModal = () => setShowModal(false);

    return (
        <React.Fragment>
            <LayoutScreen>
                <Container>
                    <Menu />
                    <FlatList
                        data={heights}
                        keyExtractor={(item) => `${item.id}`}
                        renderItem={({ item }) => <ListItem item={item} />}
                        ItemSeparatorComponent={() => <Divider />}
                        contentContainerStyle={{ paddingBottom: 20 }}
                        ListFooterComponent={
                            <AdMobBanner
                                bannerSize="fullBanner"
                                adUnitID="ca-app-pub-7642727712683174/6790082160" // Test ID, Replace with your-admob-unit-id
                                servePersonalizedAds
                                onDidFailToReceiveAdWithError={(error) => console.log(error)} />
                        }
                    />
                    <Footer>
                        <Button onPress={handleShowModal}>ADICIONAR ALTURA</Button>
                    </Footer>
                </Container>
            </LayoutScreen>
            <ModalCreateItem
                open={showModal}
                title='Adicionar Altura'
                action={handleSubmitHeight}
                onClose={handleHideModal}
                variant='Altura'
            />
        </React.Fragment>
    )
}