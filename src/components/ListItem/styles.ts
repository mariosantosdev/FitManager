import styled from "styled-components/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
    margin-top: ${RFValue(12)}px;
`;

export const Title = styled.Text`
    font-size: ${RFValue(32)}px;
    font-family: ${({ theme }) => theme.fonts.medium};
`;

export const Footer = styled.View`
    flex-direction: row;

    align-items: center;
    padding: ${RFValue(4)}px 0px;
`;

export const Icon = styled(MaterialCommunityIcons)`
    padding-right: ${RFValue(8)}px;
    font-size: ${RFValue(20)}px;
`;

export const Date = styled.Text`
    
`;
