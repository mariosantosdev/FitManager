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
import { UserContext } from "@contexts/user";
import { ISignInResponse } from "@utils/apiTypes";
import { storageToken } from "@utils/asyncStorage";
import Loading from "@components/Loading";

export default function () {
    const navigation = useNavigation();
    const toast = useToast();
    const { setUser, setHeight, setWeight } = React.useContext(UserContext).actions;

    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [loading, setLoading] = React.useState<boolean>(false);

    const handleNavigateSignUp = () => navigation.navigate('SignUp');
    const handleNavigateForgetPassword = () => navigation.navigate('ForgetPassword');

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

    async function handleSignIn() {
        try {
            if (!email.trim()) return showError('Preencha o campo E-mail!', 'Erro no Formulário', 'miss-email');
            if (!password.trim()) return showError('Preencha o campo Senha!', 'Erro no Formulário', 'miss-pass');
            setLoading(true);

            const { data } = await api.post<ISignInResponse>('/signin', {
                email,
                password
            });
            successSignIn(data);
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

            showError(messageError, 'Erro ao realizar o login', 'server-error');
        }
    }

    async function successSignIn(data: ISignInResponse) {
        setLoading(false);
        const { id, name, height, weight } = data.user;

        setUser({
            id,
            name,
            email,
            token: data.token,
            refreshToken: data.refreshToken,
        });

        setHeight(height);
        setWeight(weight);

        storageToken(data.token);
        toast.show({
            status: 'success',
            title: 'Sucesso',
            description: 'Login realizado com sucesso.',
            placement: 'bottom'
        });
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
                    Bem Vindo
                </Heading>
                <Heading
                    mt="1"
                    color="coolGray.600"
                    fontWeight="medium"
                    size="xs"
                >
                    Entre para continuar!
                </Heading>

                <VStack space={3} mt="5">
                    <FormControl isRequired>
                        <FormControl.Label>E-mail</FormControl.Label>
                        <Input value={email} onChangeText={text => setEmail(text)} />
                    </FormControl>
                    <FormControl isRequired>
                        <FormControl.Label>Senha</FormControl.Label>
                        <Input
                            type="password"
                            value={password}
                            onChangeText={text => setPassword(text)}
                        />
                        <Button
                            _text={{
                                fontSize: "xs",
                                fontWeight: "500",
                                color: "primary.500",
                                underline: true,
                            }}
                            alignSelf="flex-end"
                            variant="link"
                            mt="1"
                            p="0"
                            onPress={handleNavigateForgetPassword}
                        >
                            Esqueceu sua Senha?
                        </Button>
                    </FormControl>
                    <Button mt="2" colorScheme="primary" onPress={handleSignIn}>
                        Entrar
                    </Button>
                    <HStack mt="6" justifyContent="center">
                        <Text
                            fontSize="sm"
                            color="coolGray.600"
                        >
                            Ainda não tem uma conta?{" "}
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
                            onPress={handleNavigateSignUp}
                        >
                            Cadastrar
                        </Button>
                    </HStack>
                </VStack>
            </Box>
        </Center>
    )
}