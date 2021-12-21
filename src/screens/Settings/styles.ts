import { ScrollView } from 'native-base';
import { RFValue } from 'react-native-responsive-fontsize'
import styled from "styled-components/native";

export const Container = styled(ScrollView)`
    height: 100%;
    padding: ${RFValue(12)}px;
    padding-bottom: ${RFValue(20)}px;
    background-color: ${({ theme }) => theme.colors.background.light};
    border-radius: 20px
`;