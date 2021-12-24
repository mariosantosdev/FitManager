import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { AdMobBanner } from 'expo-ads-admob';
import { Divider, useToast } from 'native-base';

import ExerciseItem, { HiddenExerciseItem } from '@components/ExerciseItem';
import FilterDays from '@components/FilterDays';
import Header from '@components/Header';
import ModalCreateExercise from '@components/Modals/CreateExercise';
import LayoutScreen from '@components/LayoutScreen';
import Loading from '@components/Loading';
import api from '@utils/api';
import { IExercisesReponse } from '@utils/apiTypes';
import { DaysValue, getDayWeekType } from '@utils/date';

import { Container, Footer, Button } from './styles';

type Exercise = {
    id: number;
    title: string;
    day_of_week: string;
    delay_time?: string;
    loop?: string;
}

export default function () {
    const toast = useToast();

    const [showModal, setShowModal] = useState(false);
    const [selectedDay, setSelecteddDay] = useState<DaysValue>(getDayWeekType());
    const [exercises, setExercises] = useState<Exercise[]>([]);

    const [loading, setLoading] = useState(false);

    const handleShowModal = () => setShowModal(true);
    const handleHideModal = () => setShowModal(false);

    async function fetchExercise() {
        try {
            setLoading(true);
            const haveSelectedDay = selectedDay !== 'all' ? `?day=${selectedDay}` : '';
            const { data } = await api.get<IExercisesReponse>(`/exercise${haveSelectedDay}`);

            setExercises(data.exercises);
            setLoading(false);
        } catch (error: any) {
            setLoading(false);
            let errorMsg = error?.response?.data;
            toast.show({
                title: 'Erro',
                description: errorMsg || 'Ocorreu um erro ao localizar seus exercícios.',
            });
        }
    }

    async function deleteExercise(id: number, index: number) {
        try {
            setLoading(true);
            await api.delete(`/exercise/${id}`);

            setLoading(false);

            let exercisesInApp = [...exercises];
            exercisesInApp.splice(index, 1);
            setExercises(exercisesInApp);

            toast.show({
                title: 'Sucesso',
                description: 'Exercício deletado com sucesso',
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

    async function handleDeleteExercise(id: number, index: number) {
        Alert.alert(
            'Atenção',
            'Você tem certeza que deseja DELETAR este exercício?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Deletar', style: 'default', onPress: () => deleteExercise(id, index) }
            ]
        );
    }

    useEffect(() => {
        fetchExercise();
    }, [selectedDay]);

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
                    <Header />
                    <FilterDays
                        value={selectedDay}
                        onChangeValue={setSelecteddDay}
                    />
                    <SwipeListView
                        data={exercises}
                        keyExtractor={(item) => `${item.id}`}
                        renderItem={({ item }) => <ExerciseItem item={item} />}
                        renderHiddenItem={({ item, index }) => (
                            <HiddenExerciseItem
                                itemID={item.id}
                                index={index}
                                onDelete={handleDeleteExercise}
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
                        <Button onPress={handleShowModal}>ADICIONAR EXERCÍCIO</Button>
                    </Footer>
                </Container>
            </LayoutScreen>
            <ModalCreateExercise
                open={showModal}
                onClose={handleHideModal}
                refetch={fetchExercise}
            />
        </React.Fragment>
    )
}