import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

interface IActiveProp {
    isActive?: boolean;
}

export const Container = styled.View<IActiveProp>`
    flex-direction: row;
    margin: ${RFValue(12)}px 0px;
    align-items: center;
    background-color: ${({ theme, isActive }) => isActive ? theme.colors.text.inDark : 'transparent'};
    border-radius: 8px;
    padding: 4px 8px;
`;

export const Text = styled.Text<IActiveProp>`
    margin-left: 4px;
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: 20px;
    color: ${({ theme, isActive }) => isActive ? theme.colors.text.inLight : theme.colors.text.inDark};
`;