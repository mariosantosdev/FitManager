import React from "react";

import { Header, IconContainer, Icon, Title } from './styles';

interface IHeader {
    title: string;
}

export default function (props: IHeader) {
    const { title } = props;

    return (
        <Header>
            <IconContainer>
                <Icon name='menu' />
            </IconContainer>
            <Title>{title}</Title>
        </Header>
    )
}