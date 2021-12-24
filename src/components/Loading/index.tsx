import React from 'react';

import {
    Center,
    Spinner,
    HStack,
    Heading,
} from 'native-base';

export default function Loading() {
    return (
        <Center flex={1}>
            <HStack space={2} alignItems='center'>
                <Spinner accessibilityLabel='Carregando...' />
                <Heading color='primary.500' fontSize='md'>
                    Carregando...
                </Heading>
            </HStack>
        </Center>
    )
}