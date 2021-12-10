import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    padding: 0px ${RFValue(10)}px;
`

export const Header = styled.View`
    padding-top: 24px;
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-bottom: 40px;
`

export const HeaderTexts = styled.View`
    flex-direction: column;
    justify-content: center;
    margin-left: ${RFValue(12)}px;
`

export const Name = styled.Text`
    font-family: ${({ theme }) => theme.fonts.medium};
    font-size: ${RFValue(16)}px;
    color: ${({ theme }) => theme.colors.text.inDark};
`

export const Email = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(12)}px;
    color: ${({ theme }) => theme.colors.text.inDark};
`

export const Avatar = styled.Image`
    width: ${RFValue(60)}px;
    height: ${RFValue(60)}px;
    border-radius: 60px;
    background-color: ${({ theme }) => theme.colors.background.light};
`

export const ListItems = styled.View`
    flex-grow: 1;
`;