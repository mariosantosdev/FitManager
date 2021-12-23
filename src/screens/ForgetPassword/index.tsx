import * as React from "react"
import { useNavigation } from "@react-navigation/native";

import {
    Box,
    Text,
    Heading,
    VStack,
    FormControl,
    Input,
    Button,
    HStack,
    Center,
    useToast,
} from "native-base";

import api from "@utils/api";
import Loading from "@components/Loading";

export default function () {
    const navigation = useNavigation();
    const toast = useToast();

    const [email, setEmail] = React.useState<string>('');
    const [loading, setLoading] = React.useState<boolean>(false);

    const handleNavigateSignIn = () => navigation.canGoBack() ?
        navigation.goBack() :
        navigation.navigate('SignIn');

    function showError(description: string, title?: string, id?: string) {
        if (id && toast.isActive(id)) return;

        toast.show({
            id,
            title,
            status: 'error',
            description,
            placement: 'top'
        });
    }

    async function handleForgetPassword() {
        try {
            if (!email.trim()) return showError('Preencha o campo E-mail!', 'Erro no Formulário', 'miss-email');
            setLoading(true);

            await api.post('/forgot', {
                email,
            });

            toast.show({
                title: 'Sucesso',
                description: 'Uma nova senha foi enviada para seu e-mail',
                status: 'success',
                placement: 'bottom',
            });
            setLoading(false);
        } catch (error: any) {
            setLoading(false);
            let messageError: string = 'Ocorreu um erro na conexão com o servidor!';
            if (error.response) {
                if (typeof error.response.data.message === 'string') {
                    messageError = error.response.data.message;
                } else {
                    messageError = 'Ocorreu um erro na conexão com o servidor, por favor contate nosso suporte!';
                    console.log(error.response.data);
                }
            }

            showError(messageError, 'Erro ao recuperar sua senha', 'server-error');
        }
    }

    if (loading) return <Loading />

    return (
        <Center flex={1}>
            <Box safeArea p="2" py="8" w="90%" maxW="290">
                <Heading
                    size="lg"
                    fontWeight="600"
                    color="coolGray.800"
                >
                    Puxa...
                </Heading>
                <Heading
                    mt="1"
                    color="coolGray.600"
                    fontWeight="medium"
                    size="xs"
                >
                    Insira seu e-mail para recuperar sua senha
                </Heading>

                <VStack space={3} mt="5">
                    <FormControl isRequired>
                        <FormControl.Label>E-mail</FormControl.Label>
                        <Input value={email} onChangeText={text => setEmail(text)} />
                    </FormControl>
                    <Button mt="2" colorScheme="primary" onPress={handleForgetPassword}>
                        Recuperar Senha
                    </Button>
                    <HStack mt="6" justifyContent="center">
                        <Text
                            fontSize="sm"
                            color="coolGray.600"
                        >
                            Já tem uma conta?{" "}
                        </Text>
                        <Button
                            variant='link'
                            _text={{
                                color: "primary.500",
                                fontWeight: "medium",
                                fontSize: "sm",
                                underline: true,
                            }}
                            padding="0"
                            onPress={handleNavigateSignIn}
                        >
                            Entrar
                        </Button>
                    </HStack>
                </VStack>
            </Box>
        </Center>
    )
}