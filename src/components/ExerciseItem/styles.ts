import styled from "styled-components/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";

import {
    Row as NBRow,
} from 'native-base';

export const Title = styled.Text`
    font-size: ${RFValue(32)}px;
    font-family: ${({ theme }) => theme.fonts.medium};
    width: 90%;
`;

export const Footer = styled(NBRow)`
    align-items: center;
    padding: ${RFValue(4)}px 0px;
`;

export const Icon = styled(MaterialCommunityIcons)`
    padding-right: ${RFValue(8)}px;
    font-size: ${RFValue(20)}px;
`;

export const Row = styled(NBRow)`
    margin-right: ${RFValue(20)}px;
    align-items: center;
`;