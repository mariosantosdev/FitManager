import AsyncStorage from '@react-native-async-storage/async-storage';

export enum StorageKeys {
    'token' = '@token',
}

export function storageToken(token: string) {
    return new Promise(async (resolve, reject) => {
        try {
            await AsyncStorage.setItem(StorageKeys.refreshToken, token);
            resolve(token);
        } catch (error) {
            reject(error);
        }
    });
}

export function getStorageToken() {
    return new Promise(async (resolve, reject) => {
        try {
            const token = await AsyncStorage.getItem(StorageKeys.refreshToken);
            resolve(token);
        } catch (error) {
            reject(error);
        }
    })
}