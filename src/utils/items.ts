import dayjs from "dayjs";

type Item<T> = { id: T; date: string };

export function RemoveDuplicateItems<T extends Item<K>, K>(arrays: Array<T>) {
    if (arrays.length <= 0) return;
    const uniqueItems = new Map<K, T>();

    arrays.forEach(item => {
        if (!uniqueItems.has(item?.id)) {
            uniqueItems.set(item.id, item);
        }
    });

    return Array.from(uniqueItems.values());
}

export function SortItemsByDate<T extends Item<K>, K>(items: Array<T>) {
    return items.sort((a, b) => {
        return dayjs(a.date).unix() > dayjs(b.date).unix() ? 1 : -1
    });
}