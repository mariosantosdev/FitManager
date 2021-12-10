import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
    flex-direction: row;
    margin: ${RFValue(12)}px 0px;
    align-items: center;
`;

export const Text = styled.Text`
    margin-left: 4px;
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: 20px;
    color: ${({ theme }) => theme.colors.text.inDark};
`;