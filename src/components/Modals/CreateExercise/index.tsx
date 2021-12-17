import React, { useEffect, useState } from "react";
import {
    Button,
    CheckIcon,
    FormControl,
    Input,
    Modal,
    Row,
    Select,
    Text
} from "native-base";

interface IPropsModal {
    open: boolean;
    onClose: () => void;
}

export default function ModalCreateExercise(props: IPropsModal) {
    const { open, onClose } = props;

    const [exercise, setExercise] = useState('');
    const [day_of_week, setDayOfWeek] = useState<string>();

    const [delay_time, setDelayTime] = useState<string>();
    const [time, setTime] = useState('seg');

    const [loop, setLoop] = useState<string>();
    const [loop01, setLoop01] = useState<string>();
    const [loop02, setLoop02] = useState<string>();

    useEffect(() => {
        setLoop(`${loop01}x${loop02}`)
    }, [loop01, loop02]);

    function handleFinish() {

        onClose();
    }

    return (
        <Modal isOpen={open} onClose={onClose}>
            <Modal.Content maxW='350' >
                <Modal.CloseButton />
                <Modal.Header>Adicionar Exercício</Modal.Header>
                <Modal.Body>
                    <FormControl my={2} isRequired>
                        <FormControl.Label>Exercício</FormControl.Label>
                        <Input value={exercise} onChangeText={setExercise} />
                    </FormControl>
                    <FormControl my={2} isRequired>
                        <FormControl.Label>Dia da Semana</FormControl.Label>
                        <Select
                            selectedValue={day_of_week}
                            onValueChange={(itemValue) => setDayOfWeek(itemValue)}
                            minWidth="200"
                            accessibilityLabel="Escolha um dia da semana"
                            placeholder="Escolha um dia da semana"
                            _selectedItem={{
                                bg: "violet.400",
                                _text: {
                                    color: 'white',
                                },
                                endIcon: <CheckIcon size={5} color='white' />,
                            }}
                            mt="1"
                        >
                            <Select.Item label="Domingo" value="dom" />
                            <Select.Item label="Segunda" value="seg" />
                            <Select.Item label="Terça" value="ter" />
                            <Select.Item label="Quarta" value="qua" />
                            <Select.Item label="Quinta" value="qui" />
                            <Select.Item label="Sexta" value="sex" />
                            <Select.Item label="Sábado" value="sab" />
                        </Select>
                    </FormControl>
                    <FormControl my={2}>
                        <FormControl.Label>Repetições</FormControl.Label>
                        <Row w='100%' alignItems='center' space={2}>
                            <Input
                                flex={1}
                                value={loop01}
                                onChangeText={setLoop01}
                                keyboardType='number-pad'
                            />
                            <Text>x</Text>
                            <Input
                                flex={1}
                                value={loop02}
                                onChangeText={setLoop02}
                                keyboardType='number-pad'
                            />
                        </Row>
                    </FormControl>
                    <FormControl my={2}>
                        <FormControl.Label>Tempo</FormControl.Label>
                        <Row w='100%' space={2}>
                            <Input
                                flex={2}
                                value={delay_time}
                                onChangeText={setDelayTime}
                                keyboardType='number-pad'
                            />
                            <Select
                                flex={1}
                                selectedValue={time}
                                onValueChange={(itemValue) => setTime(itemValue)}
                                minWidth="35"
                                accessibilityLabel="Tempo em segundos"
                                placeholder="Tempo"
                                _selectedItem={{
                                    bg: "violet.400",
                                    _text: {
                                        color: 'white',
                                    },
                                    endIcon: <CheckIcon size={5} color='white' />,
                                }}
                            >
                                <Select.Item label="Segundos" value="seg" />
                                <Select.Item label="Minutos" value="min" />
                            </Select>
                        </Row>
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
                        <Button onPress={handleFinish}>
                            Adicionar
                        </Button>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    );
}