import React, { useEffect, useState } from "react";
import dayjs from 'dayjs';

import {
    Container,
    Wrapper,
    HourText,
    DateText,
} from './styles';

export default function () {
    const [currentTime, setCurrentTime] = useState(dayjs().format('HH:mm'));
    const [currentDay, setCurrentDay] = useState(dayjs().format('DD [de] MMMM [de] YYYY'));

    useEffect(() => {
        const interval = setInterval(() => {
            dayjs().format('HH:mm') !== currentTime && setCurrentTime(dayjs().format('HH:mm'));
            dayjs().format('DD [de] MMMM [de] YYYY') !== currentDay && setCurrentDay(dayjs().format('DD [de] MMMM [de] YYYY'));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <Container>
            <Wrapper>
                <HourText>
                    {currentTime}
                </HourText>
                <DateText>
                    {currentDay}
                </DateText>
            </Wrapper>
        </Container>
    )
}