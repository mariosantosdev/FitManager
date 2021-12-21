import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { AdMobBanner } from 'expo-ads-admob';
import { Divider } from 'native-base';

import LayoutScreen from '@components/LayoutScreen';
import ExerciseItem from '@components/ExerciseItem';
import Header from '@components/Header';
import ModalCreateExercise from '@components/Modals/CreateExercise';
import FilterDays from '@components/FilterDays';
import { DaysValue, getDayWeekType } from '@utils/date';

import { Container, Footer, Button } from './styles';

type Exercise = {
    id: number;
    title: string;
    day_of_week: string;
    delay_time?: string;
    loop?: string;
}

const exercises: Exercise[] = [
    {
        id: 1,
        title: 'Flexão',
        day_of_week: 'sab',
        delay_time: '30 seg',
        loop: '3x12',
    },
    {
        id: 2,
        title: 'Abdominal',
        day_of_week: 'sab',
        delay_time: '25 seg',
        loop: '4x15',
    },
    {
        id: 3,
        title: 'Cárdio',
        day_of_week: 'sab',
        delay_time: '15 min',
    },
    {
        id: 4,
        title: 'Prancha',
        day_of_week: 'sab',
        delay_time: '3 min',
    },
    {
        id: 5,
        title: 'Cadeira Extensora',
        day_of_week: 'sab',
        delay_time: '30 seg',
        loop: '3x10',
    },
]

export default function () {
    const [exerciseInput, setExerciseInput] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedDay, setSelecteddDay] = useState<DaysValue>(getDayWeekType());
    const [tratedExercises, setTratedExercises] = useState<Exercise[]>([]);

    function handleSubmitExercise(value: string, date: string) {
        if (!exerciseInput.trim()) return;
        setShowModal(false);

        alert(`${exerciseInput} kg`);
        setExerciseInput('');
    }

    const handleShowModal = () => setShowModal(true);
    const handleHideModal = () => setShowModal(false);

    useEffect(() => {
        const exercise = [...exercises].filter(exercise => exercise.day_of_week === selectedDay);
        setTratedExercises(exercise);
    }, [selectedDay]);

    return (
        <React.Fragment>
            <LayoutScreen>
                <Container>
                    <Header />
                    <FilterDays
                        value={selectedDay}
                        onChangeValue={setSelecteddDay}
                    />
                    <FlatList
                        data={tratedExercises}
                        keyExtractor={(item) => `${item.id}`}
                        renderItem={({ item }) => <ExerciseItem item={item} />}
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
            <ModalCreateExercise open={showModal} onClose={handleHideModal} />
        </React.Fragment>
    )
}