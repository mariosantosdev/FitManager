import AsyncStorage from '@react-native-async-storage/async-storage';

export enum StorageKeys {
    'token' = '@token',
}

export function storageToken(token: string) {
    return new Promise(async (resolve, reject) => {
        try {
            await AsyncStorage.setItem(StorageKeys.token, token);
            resolve(token);
        } catch (error) {
            reject(error);
        }
    });
}

export function getStorageToken() {
    return new Promise<string>(async (resolve, reject) => {
        try {
            const token = await AsyncStorage.getItem(StorageKeys.token);
            resolve(token);
        } catch (error) {
            reject(error);
        }
    })
}

export function clearStorageToken() {
    return new Promise<void>(async (resolve, reject) => {
        try {
            await AsyncStorage.removeItem(StorageKeys.token);
            resolve();
        } catch (error) {
            reject(error);
        }
    })
}