import { ScrollView } from 'native-base';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import styled from "styled-components/native";

export const Container = styled(ScrollView)`
    height: ${RFPercentage(90)}px;
    padding: ${RFValue(12)}px;
    padding-bottom: ${RFValue(20)}px;
`

export const TextGreeting = styled.Text`
    font-size: ${RFValue(20)}px;
    font-family: ${({ theme }) => theme.fonts.regular};
    margin-bottom: ${RFValue(16)}px;
    color: ${({ theme }) => theme.colors.text.inLight}
`