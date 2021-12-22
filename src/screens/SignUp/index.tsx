import * as React from "react"
import { useNavigation } from "@react-navigation/native";
import {
    Box,
    Heading,
    VStack,
    FormControl,
    Input,
    Button,
    Center,
    useToast,
    HStack,
    Text,
} from "native-base"
import api from "@utils/api";
import { ISignUpResponse } from "@utils/apiTypes";
import { UserContext } from "@contexts/user";
import { storageToken } from "@utils/asyncStorage";
import Loading from "@components/Loading";

export default function () {
    const toast = useToast();
    const navigation = useNavigation();
    const { setUser, setWeight, setHeight } = React.useContext(UserContext).actions;

    const [name, setName] = React.useState<string>('');
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [confirmPassword, setConfirmPassword] = React.useState<string>('');
    const [loading, setLoading] = React.useState<boolean>(false);

    const handleNavigateSignIn = () => navigation.navigate('SignIn');

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

    async function handleSignUp() {
        try {
            if (!name.trim()) return showError('Preencha o campo Nome', 'Erro no formulário', 'miss-name');
            if (!email.trim()) return showError('Preencha o campo E-mail', 'Erro no formulário', 'miss-email');
            if (!password.trim()) return showError('Preencha o campo de Senha', 'Erro no formulário', 'miss-password');
            if (!confirmPassword.trim()) return showError('Preencha o campo de Confirmar Senha', 'Erro no formulário', 'miss-confirm-password');

            if (password !== confirmPassword) return showError('Suas senhas NÃO são iguais!', 'Erro no formulário', 'different-passwords');

            setLoading(true);
            const { data } = await api.post<ISignUpResponse>('signup', {
                name,
                email,
                password,
            });

            successSignUp(data);
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

            showError(messageError, 'Erro ao cadastrar sua conta', 'server-error');
        }
    }

    async function successSignUp(data: ISignUpResponse) {
        setLoading(false);
        const { id, name } = data.user;

        setUser({
            id,
            name,
            email,
            token: data.token,
        });

        setHeight([]);
        setWeight([]);

        storageToken(data.token);
        toast.show({
            status: 'success',
            description: 'Usuário cadastrado com sucesso.',
            placement: 'top'
        });
    }

    if (loading) return <Loading />

    return (
        <Center flex={1}>
            <Box safeArea p="2" w="90%" maxW="290" py="8">
                <Heading
                    size="lg"
                    color="coolGray.800"
                    fontWeight="semibold"
                >
                    Bem Vindo
                </Heading>
                <Heading
                    mt="1"
                    color="coolGray.600"
                    fontWeight="medium"
                    size="xs"
                >
                    Cadastre-se para Continuar!
                </Heading>
                <VStack space={3} mt="5">
                    <FormControl isRequired>
                        <FormControl.Label>Nome</FormControl.Label>
                        <Input
                            value={name}
                            onChangeText={text => setName(text)}
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormControl.Label>E-mail</FormControl.Label>
                        <Input
                            value={email}
                            onChangeText={text => setEmail(text)}
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormControl.Label>Senha</FormControl.Label>
                        <Input
                            type="password"
                            value={password}
                            onChangeText={text => setPassword(text)}
                        />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>Confirmar Senha</FormControl.Label>
                        <Input
                            type="password"
                            value={confirmPassword}
                            onChangeText={text => setConfirmPassword(text)}
                        />
                    </FormControl>
                    <Button
                        mt="2"
                        colorScheme="primary"
                        disabled={!email.trim() && !name.trim() && !password.trim() && !confirmPassword.trim()}
                        onPress={handleSignUp}
                    >
                        Cadastrar
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