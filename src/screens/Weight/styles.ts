import { Button as NBButton } from 'native-base';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from "styled-components/native";

export const Container = styled.View`
    flex: 100%;

    position: relative;
    padding: ${RFValue(12)}px;
    padding-bottom: ${RFValue(20)}px;
    background-color: ${({ theme }) => theme.colors.background.light};
`;

export const Footer = styled.View`
    background-color: ${({ theme }) => theme.colors.primary};
    padding: ${RFValue(12)}px;
    margin: -${RFValue(20)}px -${RFValue(12)}px;
`;

export const Button = styled(NBButton)`
    color: ${({ theme }) => theme.colors.text.inDark};
    border: 0px;
    text-align: center;
    font-size: ${RFValue(20)}px;
    font-family: ${({ theme }) => theme.fonts.medium};
`;