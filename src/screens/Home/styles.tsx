import { ScrollView } from 'native-base';
import { RFValue } from 'react-native-responsive-fontsize'
import styled from "styled-components/native";

export const Container = styled(ScrollView)`
    padding: ${RFValue(12)}px;
    padding-bottom: ${RFValue(20)}px;
    background-color: ${({ theme }) => theme.colors.background.light};
    border-radius: 20px
`

export const TextGreeting = styled.Text`
    font-size: ${RFValue(20)}px;
    font-family: ${({ theme }) => theme.fonts.regular};
    margin-bottom: ${RFValue(16)}px;
    color: ${({ theme }) => theme.colors.text.inLight}
`