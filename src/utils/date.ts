import dayjs from 'dayjs';

export type DaysValue = 'dom' | 'seg' | 'ter' | 'qua' | 'qui' | 'sex' | 'sab' | 'all';
export type DayOfWeek = 'Domingo' | 'Segunda' | 'Terça' | 'Quarta' | 'Quinta' | 'Sexta' | 'Sábado' | 'Todos os Dias';

export enum EnumDayOfWeek {
    'dom' = 'Domingo',
    'seg' = 'Segunda',
    'ter' = 'Terça',
    'qua' = 'Quarta',
    'qui' = 'Quinta',
    'sex' = 'Sexta',
    'sab' = 'Sábado',
    'all' = 'Todos os Dias'
}

export function getDayWeekType(): DaysValue {
    switch (dayjs().day()) {
        case 0:
            return 'dom';
        case 1:
            return 'seg';
        case 2:
            return 'ter';
        case 3:
            return 'qua';
        case 4:
            return 'qui';
        case 5:
            return 'sex';
        case 6:
            return 'sab';
    }
}

export function getDayOfWeek(dayValue: DaysValue): EnumDayOfWeek {
    switch (dayValue) {
        case 'dom':
            return EnumDayOfWeek.dom;
        case 'seg':
            return EnumDayOfWeek.seg;
        case 'ter':
            return EnumDayOfWeek.ter;
        case 'qua':
            return EnumDayOfWeek.qua;
        case 'qui':
            return EnumDayOfWeek.qui;
        case 'sex':
            return EnumDayOfWeek.sex;
        case 'sab':
            return EnumDayOfWeek.sab;
        case 'all':
            return EnumDayOfWeek.all;
    }
}