import React from "react";
import { Pressable } from "react-native";

import { MaterialCommunityIcons } from '@expo/vector-icons';

import {
    Row,
    Text,
    Actionsheet,
    useDisclose,
    Box,
} from "native-base";
import { getDayOfWeek, DaysValue, DayOfWeek } from "@utils/date";

export interface IFilterDays {
    value: DaysValue;
    onChangeValue: React.Dispatch<React.SetStateAction<DaysValue>>;
}

type Days = {
    value: DaysValue;
    title: DayOfWeek;
}

export default function FilterDays(props: IFilterDays) {
    const { value, onChangeValue } = props;
    const { isOpen, onOpen, onClose } = useDisclose();

    const days: Days[] = [
        { value: 'dom', title: 'Domingo' },
        { value: 'seg', title: 'Segunda' },
        { value: 'ter', title: 'Terça' },
        { value: 'qua', title: 'Quarta' },
        { value: 'qui', title: 'Quinta' },
        { value: 'sex', title: 'Sexta' },
        { value: 'sab', title: 'Sábado' },
    ];

    function handleChangeValue(day: DaysValue) {
        onChangeValue(day);
        onClose();
    }

    return (
        <>
            <Row>
                <Text>Ver exercícios de </Text>
                <Pressable onPress={onOpen}>
                    <Row>
                        <Text underline>{getDayOfWeek(value)}</Text>
                        <MaterialCommunityIcons name="chevron-down" size={20} color="black" />
                    </Row>
                </Pressable>
            </Row>
            <Actionsheet isOpen={isOpen} onClose={onClose}>
                <Actionsheet.Content>
                    {days.map((item) => {
                        if (item.value === value) {
                            return (
                                <Box key={item.value} w='100%' h={60} px={4} justifyContent='center'>
                                    <Text
                                        fontSize={16}
                                        color='gray.500'
                                        _dark={{
                                            color: 'gray.300'
                                        }}
                                    >{item.title}</Text>
                                </Box>
                            )
                        }

                        return (
                            <Actionsheet.Item key={item.value} onPress={() => handleChangeValue(item.value)}>
                                {item.title}
                            </Actionsheet.Item>
                        )
                    })}
                </Actionsheet.Content>
            </Actionsheet>
        </>
    )
}