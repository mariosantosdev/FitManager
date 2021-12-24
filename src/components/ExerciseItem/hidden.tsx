import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import {
    HStack,
    VStack,
    Icon,
    Text,
    Pressable
} from 'native-base';

interface IPropsHiddenList {
    itemID: number;
    index: number;
    onDelete: (id: number, index: number) => void;
}

export default function HiddenListItem(props: IPropsHiddenList) {
    const { itemID, index, onDelete } = props;

    return (
        <HStack flex="1" pl="2" justifyContent='flex-end'>
            <Pressable
                w="70"
                bg="red.500"
                justifyContent="center"
                onPress={() => onDelete(itemID, index)}
                _pressed={{
                    opacity: 0.5,
                }}>
                <VStack alignItems="center" space={2}>
                    <Icon as={<MaterialCommunityIcons name="delete" />} color="white" size="xs" />
                    <Text color="white" fontSize="xs" fontWeight="medium">
                        Deletar
                    </Text>
                </VStack>
            </Pressable>
        </HStack>
    )
}