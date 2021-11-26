import styled from "styled-components/native";
import { Center } from 'native-base';
import { TextProps } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

interface IPropsValue extends TextProps {
    size?: 'small' | 'normal'
}

export const Container = styled(Center)`
    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 20px;

    background-color: ${({ theme, color }) => color ? color : theme.colors.variations.color01};

    max-width: 100%;
    min-width: ${RFValue(152)}px;
    height: ${RFValue(136)}px;

`;

export const Wrapper = styled(Center)`
    display: flex;
    flex-direction: row;
    
    justify-content: flex-start;
    align-items: baseline;
    padding-left: ${RFValue(12)}px;

    width: 100%;
`;

export const Value = styled.Text<IPropsValue>`
    font-size: ${props => props.size === 'small' ? RFValue(28) : RFValue(48)}px;
    font-family: ${({ theme }) => theme.fonts.medium};
    color: ${({ theme }) => theme.colors.text.inDark};
`;

export const TextInfo = styled.Text`
    font-size: ${RFValue(24)}px;
    font-family: ${({ theme }) => theme.fonts.regular};
    color: ${({ theme }) => theme.colors.text.inDark};
`;

export const TextVariation = styled.Text`
    font-size: ${RFValue(24)}px;
    font-family: ${({ theme }) => theme.fonts.light};
    color: ${({ theme }) => theme.colors.text.inDark};
`;
