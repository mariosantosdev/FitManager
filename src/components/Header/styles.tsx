import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Flex } from 'native-base';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from "styled-components/native";

export const Header = styled(Flex)`
    display: flex;
    flex-direction: row;
    position: relative;

    width: 100%;
    height: ${RFValue(60)}px;

    justify-content: center;
    align-items: center;
`;

export const IconContainer = styled(BorderlessButton)`
    position: absolute;
    left: ${RFValue(12)}px;
`;

export const Icon = styled(MaterialCommunityIcons)`
  color: ${({ theme }) => theme.colors.text.inLight};
  font-size: ${RFValue(32)}px;
  
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.bold};
    font-size: ${RFValue(20)}px;
    color: ${({ theme }) => theme.colors.text.inLight};
    
`;