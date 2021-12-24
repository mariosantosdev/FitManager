import React, { useState } from 'react';

import { AdMobBanner } from 'expo-ads-admob';
import { Button, Divider, Heading, Icon, VStack } from 'native-base';
import { AntDesign } from '@expo/vector-icons';

import LayoutScreen from '@components/LayoutScreen';
import Menu from '@components/Header';

import { Container } from './styles';
import { Linking } from 'react-native';
import ModalChangePassword from '@components/Modals/ChangePassword';


export default function () {

    const [showModalChangePassword, setShowModalChangePassword] = useState(false);

    const handleShowModalChangePassword = () => setShowModalChangePassword(true);
    const handleHideModalChangePassword = () => setShowModalChangePassword(false);

    const handleOpenInstagramProfile = () => Linking.openURL('https://www.instagram.com/mariosantos.dev/');
    const handleOpenGithubProfile = () => Linking.openURL('https://github.com/mariosantosdev/');

    return (
        <React.Fragment>
            <LayoutScreen>
                <Container contentContainerStyle={{ paddingBottom: 20 }}>
                    <Menu />
                    <AdMobBanner
                        bannerSize="fullBanner"
                        adUnitID="ca-app-pub-7642727712683174/8237544138" // Test ID, Replace with your-admob-unit-id
                        servePersonalizedAds
                        onDidFailToReceiveAdWithError={(error) => console.log(error)} />
                    <VStack w="100%" flex={1} alignItems="center">
                        <Heading my={2}>Conta</Heading>
                        <Button
                            w="100%"
                            mb={2}
                            onPress={handleShowModalChangePassword}
                        >
                            Alterar Senha
                        </Button>
                    </VStack>
                    <Divider my={4} w='100%' />
                    <VStack w="100%" flex={1} alignItems="center">
                        <Heading my={2}>Créditos</Heading>
                        <Button
                            w="100%"
                            mb={2}
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
            <ModalChangePassword
                open={showModalChangePassword}
                onClose={handleHideModalChangePassword}
            />
        </React.Fragment>
    )
}