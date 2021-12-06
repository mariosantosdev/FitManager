import styled from "styled-components/native";
import { Card } from 'native-base';
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled(Card)`
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: ${({ theme }) => theme.colors.background.dark};
    width: 100%;
    height: ${RFValue(140)}px;
    border-radius: 20px;

    margin-bottom: ${RFValue(36)}px;
`;

export const Wrapper = styled.View`
    justify-content: center;
    align-items: center;
`;

export const HourText = styled.Text`
    color: ${({ theme }) => theme.colors.text.inDark};
    font-family: ${({ theme }) => theme.fonts.medium};
    font-size: ${RFValue(72)}px;
    line-height: ${RFValue(72)}px;
`;

export const DateText = styled.Text`
    color: ${({ theme }) => theme.colors.text.inDark};
    font-family: ${({ theme }) => theme.fonts.medium};
    font-size: ${RFValue(16)}px;
`;
