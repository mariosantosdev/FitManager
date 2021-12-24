import React from "react";
import dayjs from 'dayjs';
import HiddenListItem from "./hidden";

import {
    Title,
    Icon,
    Date,
    Footer,
} from './styles';
import { VStack } from "native-base";
import theme from "@utils/theme";

interface IPropsListView {
    item: {
        id: string;
        title: string;
        date: string;
    }
};

export default function ListItem(props: IPropsListView) {
    const { id, title, date } = props.item;

    const formatedDate = dayjs(date).format('ddd, DD [de] MMM[.]');

    return (
        <VStack flex={1} justifyContent='center' bgColor={theme.colors.background.light}>
            <Title>{title}</Title>
            <Footer>
                <Icon name='calendar' />
                <Date>{formatedDate}</Date>
            </Footer>
        </VStack>
    )
}

export { HiddenListItem };