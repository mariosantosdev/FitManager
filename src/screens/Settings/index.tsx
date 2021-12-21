import React from 'react';

import { AdMobBanner } from 'expo-ads-admob';
import { Button, Divider, Heading, Icon, VStack } from 'native-base';
import { AntDesign } from '@expo/vector-icons';

import LayoutScreen from '@components/LayoutScreen';
import Menu from '@components/Header';

import { Container } from './styles';
import { Linking } from 'react-native';


export default function () {

    const handleOpenInstagramProfile = () => Linking.openURL('https://www.instagram.com/mariosantos.dev/');
    const handleOpenGithubProfile = () => Linking.openURL('https://github.com/mariosantosdev/');

    return (
        <LayoutScreen>
            <Container contentContainerStyle={{ paddingBottom: 20 }}>
                <Menu />
                <AdMobBanner
                    bannerSize="fullBanner"
                    adUnitID="ca-app-pub-7642727712683174/6790082160" // Test ID, Replace with your-admob-unit-id
                    servePersonalizedAds
                    onDidFailToReceiveAdWithError={(error) => console.log(error)} />
                <VStack w="100%" flex={1} alignItems="center">
                    <Heading my={2}>Créditos</Heading>
                    <Button
                        w="100%"
                        leftIcon={
                            <Icon as={AntDesign} name='instagram' size='sm' />
                        }
                        onPress={handleOpenInstagramProfile}
                        style={{
                            backgroundColor: '#8a3ab9'
                        }}
                    >
                        Instagram
                    </Button>
                    <Divider my={2} w="100%" />
                    <Button
                        w="100%"
                        leftIcon={
                            <Icon as={AntDesign} name='github' size='sm' />
                        }
                        onPress={handleOpenGithubProfile}
                        style={{
                            backgroundColor: '#333'
                        }}
                    >
                        Github
                    </Button>
                    <Divider w="100%" />
                </VStack>
            </Container>

        </LayoutScreen>
    )
}