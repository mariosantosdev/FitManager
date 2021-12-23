import React, { useEffect, useState } from "react";
import {
    Button,
    FormControl,
    Input,
    Modal,
    Pressable,
    Text
} from "native-base";
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';

interface IPropsModal {
    open: boolean;
    title: string;
    action: (value: string, date: string) => void;
    onClose: () => void;
    variant: 'Peso' | 'Altura';
}

export default function ModalCreateItem(props: IPropsModal) {
    const { open, title, variant, action, onClose } = props;

    const [value, setValue] = useState('');
    const [date, setDate] = useState(dayjs().toDate());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [formatDate, setFormatDate] = useState('');

    function handleFinish() {
        if (!value.trim() || !date) return;

        action(value, date.toString());
        setValue('');
        setDate(dayjs().toDate());
        setShowDatePicker(false);
        onClose();
    }

    function changeDate(event: Event, selectedDate: Date) {
        if (event.type === 'dimissed') return setShowDatePicker(false);
        if (!selectedDate) return setShowDatePicker(false);

        setShowDatePicker(false);
        setDate(selectedDate);
    }

    function renderHelperText() {
        switch (variant) {
            case 'Altura':
                return 'Altura deve ser em cm.';

            case 'Peso':
                return 'Peso deve ser em kg.';
        }
    }

    useEffect(() => {
        const formated = dayjs(date).format('DD[/]MM[/]YYYY');
        setFormatDate(formated);
    }, [date]);

    return (
        <Modal isOpen={open} onClose={onClose}>
            {showDatePicker && (
                <DateTimePicker
                    value={date}
                    mode='date'
                    is24Hour={true}
                    display="default"
                    onChange={changeDate}
                />
            )}
            <Modal.Content maxW='350' >
                <Modal.CloseButton />
                <Modal.Header>{title}</Modal.Header>
                <Modal.Body>
                    <FormControl>
                        <FormControl.Label>{variant}</FormControl.Label>
                        <Input value={value} onChangeText={(text) => setValue(text)} keyboardType='number-pad' />
                        <FormControl.HelperText>
                            {renderHelperText()}
                        </FormControl.HelperText>
                    </FormControl>
                    <FormControl mt="3">
                        <FormControl.Label>Data</FormControl.Label>
                        <Pressable onPress={() => setShowDatePicker(true)}>
                            <Text>{formatDate}</Text>
                        </Pressable>
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