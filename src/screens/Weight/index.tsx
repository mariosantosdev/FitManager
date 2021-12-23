import React, { useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { AdMobBanner } from 'expo-ads-admob';
import { Divider, useToast } from 'native-base';

import LayoutScreen from '@components/LayoutScreen';
import ListItem, { HiddenListItem } from '@components/ListItem';
import Menu from '@components/Header';
import Loading from '@components/Loading';
import ModalCreateItem from '@components/Modals/CreateItem';
import { UserContext } from '@contexts/user';

import api from '@utils/api';
import { IWeightsReponse } from '@utils/apiTypes';
import { RemoveDuplicateItems, SortItemsByDate } from '@utils/items';

import { Container, Footer, Button } from './styles';

type Weight = {
    id: number;
    title: string;
    date: string;
}

export default function () {
    const toast = useToast();
    const { weight } = useContext(UserContext);
    const { setWeight } = useContext(UserContext).actions;

    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [sortedWeight, setSortedWeight] = useState<Weight[]>([]);

    const handleShowModal = () => setShowModal(true);
    const handleHideModal = () => setShowModal(false);

    async function handleSubmitWeight(value: string, date: string) {
        try {
            setShowModal(false);
            setLoading(true);

            const { data } = await api.post<{ weight: Weight }>('/weight', {
                title: `${value} kg`,
                date
            });

            const uniqueWeights = RemoveDuplicateItems<Weight, number>([...weight, data.weight]);

            setWeight(uniqueWeights);
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

    async function deleteWeight(id: number, index: number) {
        try {
            setLoading(true);
            await api.delete(`/weight/${id}`);

            setLoading(false);

            let weightsInApp = [...weight];
            weightsInApp.splice(index, 1);
            setWeight(weightsInApp);

            toast.show({
                title: 'Sucesso',
                description: 'Peso deletado com sucesso',
                status: 'success',
            });
        } catch (error) {
            setLoading(false);
            let errorMsg = error?.response?.data?.message;
            toast.show({
                title: 'Erro',
                description: errorMsg || 'Ocorreu um erro ao deletar este peso.',
                status: 'error',
            });
        }
    }

    async function handleDeleteWeight(id: number, index: number) {
        Alert.alert(
            'Atenção',
            'Você tem certeza que deseja DELETAR este peso?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Deletar', style: 'default', onPress: () => deleteWeight(id, index) }
            ]
        );
    }

    async function fetchWeights() {
        try {
            setLoading(true);
            const { data } = await api.get<IWeightsReponse>('/weight');

            const uniqueWeights = RemoveDuplicateItems<Weight, number>([...weight, ...data.weights]);

            setWeight(uniqueWeights);
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
        fetchWeights();
    }, []);

    useEffect(() => {
        setSortedWeight(SortItemsByDate<Weight, number>(weight).reverse());
    }, [weight]);

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
                        data={sortedWeight}
                        keyExtractor={(item) => `${item.id}`}
                        renderItem={({ item }) => <ListItem item={item} />}
                        renderHiddenItem={({ item, index }) => (
                            <HiddenListItem
                                itemID={item.id}
                                index={index}
                                onDelete={handleDeleteWeight}
                            />
                        )}
                        rightOpenValue={-70}
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