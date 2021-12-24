import React, { useContext, useEffect, useState } from 'react';
import { AdMobBanner } from 'expo-ads-admob';
import { Alert } from 'react-native';

import LayoutScreen from '@components/LayoutScreen';
import ListItem, { HiddenListItem } from '@components/ListItem';
import Menu from '@components/Header';

import { Container, Footer, Button } from './styles';
import { Divider, useToast } from 'native-base';
import ModalCreateItem from '@components/Modals/CreateItem';
import { SwipeListView } from 'react-native-swipe-list-view';
import Loading from '@components/Loading';
import { RemoveDuplicateItems, SortItemsByDate } from '@utils/items';
import { IHeightsReponse } from '@utils/apiTypes';
import api from '@utils/api';
import { UserContext } from '@contexts/user';

type Height = {
    id: string;
    title: string;
    date: string;
}

export default function () {
    const toast = useToast();
    const { height } = useContext(UserContext);
    const { setHeight } = useContext(UserContext).actions;

    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [sortedHeight, setSortedHeight] = useState<Height[]>([]);

    const handleShowModal = () => setShowModal(true);
    const handleHideModal = () => setShowModal(false);

    async function handleSubmitHeight(value: string, date: string) {
        try {
            setShowModal(false);
            setLoading(true);

            const { data } = await api.post<{ height: Height }>('/height', {
                title: `${value} cm`,
                date
            });

            const uniqueHeights = RemoveDuplicateItems<Height, string>([...height, data.height]);

            setHeight(uniqueHeights);
            setLoading(false);
        } catch (error: any) {
            setLoading(false);
            let errorMsg = error?.response?.data?.message;
            toast.show({
                title: 'Erro',
                description: errorMsg || 'Ocorreu um erro ao localizar seus pesos.',
                status: 'error',
            });
        }
    }

    async function deleteHeight(id: string, index: number) {
        try {
            setLoading(true);
            await api.delete(`/height/${id}`);

            setLoading(false);

            let heightsInApp = [...height];
            heightsInApp.splice(index, 1);
            setHeight(heightsInApp);

            toast.show({
                title: 'Sucesso',
                description: 'Altura deletada com sucesso',
                status: 'success',
            });
        } catch (error) {
            setLoading(false);
            let errorMsg = error?.response?.data?.message;
            toast.show({
                title: 'Erro',
                description: errorMsg || 'Ocorreu um erro ao deletar esta altura.',
                status: 'error',
            });
        }
    }

    async function handleDeleteHeight(id: string, index: number) {
        Alert.alert(
            'Atenção',
            'Você tem certeza que deseja DELETAR esta altura?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Deletar', style: 'default', onPress: () => deleteHeight(id, index) }
            ]
        );
    }

    async function fetchHeights() {
        try {
            setLoading(true);
            const { data } = await api.get<IHeightsReponse>('/height');

            const uniqueHeights = RemoveDuplicateItems<Height, string>([...height, ...data.heights]);

            setHeight(uniqueHeights);
            setLoading(false);
        } catch (error: any) {
            setLoading(false);
            let errorMsg = error?.response?.data;
            toast.show({
                title: 'Erro',
                description: errorMsg || 'Ocorreu um erro ao localizar seus pesos.',
            });
        }
    }

    useEffect(() => {
        fetchHeights();
    }, []);

    useEffect(() => {
        setSortedHeight(SortItemsByDate<Height, string>(height).reverse());
    }, [height]);

    if (loading) {
        return (
            <LayoutScreen>
                <Container>
                    <Loading />
                </Container>
            </LayoutScreen>
        )
    }

    return (
        <React.Fragment>
            <LayoutScreen>
                <Container>
                    <Menu />
                    <SwipeListView
                        data={sortedHeight}
                        keyExtractor={(item) => `${item.id}`}
                        renderItem={({ item }) => <ListItem item={item} />}
                        renderHiddenItem={({ item, index }) => (
                            <HiddenListItem
                                itemID={item.id}
                                index={index}
                                onDelete={handleDeleteHeight}
                            />
                        )}
                        rightOpenValue={-70}
                        ItemSeparatorComponent={() => <Divider />}
                        contentContainerStyle={{ paddingBottom: 20 }}
                        ListFooterComponent={
                            <AdMobBanner
                                bannerSize="fullBanner"
                                adUnitID="ca-app-pub-7642727712683174/8230978731" // Test ID, Replace with your-admob-unit-id
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