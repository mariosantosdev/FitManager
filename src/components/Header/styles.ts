import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Header = styled.View`
    flex-grow: 1;
    position: relative;

    flex-direction: row;
    justify-content: center;
    align-items: center;

    background-color: ${({ theme }) => theme.colors.background.light};
    padding: ${RFValue(12)}px;
    border-bottom-width: 1px;
    border-bottom-color: #c8c7cc;
    margin-bottom: 8px;
`;

export const IconContainer = styled.View`
    position: absolute;
    top: ${RFValue(12)}px;
    left: 0px;
`;

export const Icon = styled(MaterialCommunityIcons)`
    font-size: ${RFValue(28)}px;
`;

export const Text = styled.Text`
    font-family: ${({ theme }) => theme.fonts.medium};
    font-size: ${RFValue(20)}px;
`;