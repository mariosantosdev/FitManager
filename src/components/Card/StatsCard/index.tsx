import React from "react";
import { ICenterProps } from 'native-base';

import {
    Container,
    Wrapper,
    Value,
    TextInfo,
    TextVariation
} from './styles';

interface IPropssStats extends ICenterProps {
    variation: 'weight' | 'height' | 'imc' | 'steps' | 'exercises';
    value: string;
}

export default function (props: IPropssStats) {
    const { value, variation, ...rest } = props;

    const infoStats = function () {
        switch (variation) {
            case 'weight':
                return 'kg';

            case 'height':
                return 'cm';

            default:
                return '';
        }
    }

    const variationName = function () {
        switch (variation) {
            case 'weight':
                return 'Peso';

            case 'height':
                return 'Altura';

            case 'imc':
                return 'IMC';

            case 'steps':
                return 'Passos';

            case 'exercises':
                return 'Exercícios';

            default:
                return '';
        }
    }

    return (
        <Container flex={1} {...rest}>
            <Wrapper>
                <Value
                    size={variation === 'exercises' ? 'small' : 'normal'}
                    numberOfLines={1}
                >
                    {value}
                    {infoStats() && <TextInfo>{infoStats()}</TextInfo>}
                </Value>
            </Wrapper>
            <Wrapper>
                <TextVariation>{variationName()}</TextVariation>
            </Wrapper>
        </Container>
    );
};