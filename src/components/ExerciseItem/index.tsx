import React from "react";

import {
    Text,
    Row as NBRow,
    Box,
    VStack,
} from "native-base";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { DaysValue, getDayOfWeek } from "@utils/date";
import theme from "@utils/theme";

import HiddenExerciseItem from './hidden';
import {
    Title,
    Icon,
    Row,
    Footer,
} from './styles';

interface IPropsListView {
    item: {
        id: number;
        title: string;
        day_of_week: string;
        delay_time?: string;
        loop?: string;
    }
};

export default function ExerciseItem(props: IPropsListView) {
    const { id, title, day_of_week, delay_time, loop } = props.item;

    const dayOfWeek = getDayOfWeek(day_of_week as DaysValue);

    return (
        <VStack
            flex="1"
            justifyContent='center'
            bgColor={theme.colors.background.light}
            key={id}
        >
            <NBRow alignItems='center'>
                <Box flex={1}>
                    <Title numberOfLines={1}>{title}</Title>
                </Box>
                {/* <MaterialCommunityIcons
                        name="chevron-right"
                        size={32}
                        color={theme.colors.text.inLight}
                    /> */}
            </NBRow>
            <Footer>
                {delay_time ? (
                    <Row>
                        <Icon name='clock-outline' />
                        <Text>{delay_time}</Text>
                    </Row>
                ) : null}
                {loop ? (
                    <Row>
                        <Icon name='sync' />
                        <Text>{loop}</Text>
                    </Row>
                ) : null}
                <Row>
                    <Icon name='calendar-clock' />
                    <Text>{dayOfWeek}</Text>
                </Row>
            </Footer>
        </VStack>
    )
}

export { HiddenExerciseItem };