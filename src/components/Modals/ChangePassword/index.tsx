import React, { useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import {
    Button,
    FormControl,
    Input,
    Modal,
    useToast
} from "native-base";
import axios from "axios";

import api from "@utils/api";
import { clearStorageToken } from "@utils/asyncStorage";
import Loading from "@components/Loading";
import { UserContext } from "@contexts/user";

interface IPropsModal {
    open: boolean;
    onClose: () => void;
}

export default function ModalChangePassword(props: IPropsModal) {
    const { open, onClose } = props;

    const toast = useToast();
    const { signOut } = useContext(UserContext).actions;

    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const [loading, setLoading] = useState(false);

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

    async function handleSignOut() {
        await clearStorageToken();
        signOut();
    }

    async function changePassword() {
        try {
            setLoading(true);

            await api.put('/user/password', {
                password,
                newPassword
            });


            await handleSignOut();
        } catch (error: any) {
            setLoading(false);
            let errorMsg = error?.response?.data?.message || 'Ocorreu um erro ao alterar sua senha.';
            showError(errorMsg, 'Erro ao alterar sua senha', 'server-error');
            onClose();
        }
    }

    function handleChangePassword() {
        if (!password.trim()) return showError('Preencha o campo "Senha".', 'Erro no formulário', 'pass-miss');
        if (!newPassword.trim()) return showError('Preencha o campo "Nova Senha"', 'Erro no formulário', 'new-pass-miss');

        Alert.alert(
            'Atenção',
            'Você tem certeza que deseja ALTERAR sua senha?\nApós a alteração você precisa entrar na sua conta novamente!',
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Alterar', style: 'default', onPress: async () => await changePassword() }
            ]
        );
    }

    function cancelRequest() {
        source.cancel('Operação cancelada pelo usuário');
        setLoading(false);
        onClose();
    }

    if (loading) {
        return (
            <Modal isOpen={loading} onClose={cancelRequest}>
                <Modal.Content maxW='350' minH='1/3' justifyContent='center'>
                    <Modal.CloseButton />
                    <Loading />
                </Modal.Content>
            </Modal>
        )
    }

    return (
        <Modal isOpen={open} onClose={onClose}>
            <Modal.Content maxW='350' >
                <Modal.CloseButton />
                <Modal.Header>Alterar Senha</Modal.Header>
                <Modal.Body>
                    <FormControl mb={2}>
                        <FormControl.Label>Senha Atual</FormControl.Label>
                        <Input
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            type="password"
                        />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>Nova Senha</FormControl.Label>
                        <Input
                            value={newPassword}
                            onChangeText={(text) => setNewPassword(text)}
                            type="password"
                        />
                    </FormControl>
                </Modal.Body>
                <Modal.Footer>
                    <Button.Group space={2}>
                        <Button
                            variant="ghost"
                            onPress={onClose}
                        >
                            Cancelar
                        </Button>
                        <Button onPress={handleChangePassword}>
                            Alterar
                        </Button>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    );
}