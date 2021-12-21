import React from "react";
import dayjs from 'dayjs';

import {
    Container,
    Title,
    Icon,
    Date,
    Footer,
} from './styles';

interface IPropsListView {
    item: {
        id: number;
        title: string;
        date: string;
    }
};

export default function ListItem(props: IPropsListView) {
    const { id, title, date } = props.item;

    const formatedDate = dayjs(date).format('ddd, DD [de] MMM[.]');

    return (
        <Container>
            <Title>{title}</Title>
            <Footer>
                <Icon name='calendar' />
                <Date>{formatedDate}</Date>
            </Footer>
        </Container>
    )
}