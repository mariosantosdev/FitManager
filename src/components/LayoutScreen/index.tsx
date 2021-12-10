import React, { useEffect } from 'react';

import { useDrawerStatus } from '@react-navigation/drawer';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LayoutScreen({ children }) {
    const isDrawerOpen = useDrawerStatus() === 'open';
    const sharedValue = useSharedValue(0);

    useEffect(() => {
        sharedValue.value = withTiming(isDrawerOpen ? 0.94 : 1, { duration: 250, easing: Easing.ease });
    }, [isDrawerOpen]);

    const scale = useAnimatedStyle(() => ({
        transform: [{ scale: sharedValue.value }]
    }))

    const borderRadius = useAnimatedStyle(() => ({
        borderRadius: sharedValue.value >= 1 ? 0 : 20
    }));


    return (
        <Animated.View style={[{ flex: 1, backgroundColor: 'white' }, borderRadius, scale]}>
            <SafeAreaView>
                {children}
            </SafeAreaView>
        </Animated.View>
    )
}