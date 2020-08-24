import React, { createContext, useState, useEffect } from 'react'
import * as auth from '../services/auth'
import { AsyncStorage, View } from 'react-native'
import { ActivityIndicator, Text } from 'react-native-paper'
import { primary } from '../utils/colors'

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)
    const [processing, setProcessing] = useState(false)

    useEffect(() => {
        const loadStorageData = async () => {
            const storageUser = await AsyncStorage.getItem('@FM:user')
            const storageToken = await AsyncStorage.getItem('@FM:token')

            if (storageUser && storageToken) setUser(JSON.parse(storageUser))
            if(!processing) setLoading(false)
        }

        loadStorageData()
    })

    const signIn = async () => {
        setLoading(true)
        setProcessing(true)
        const res = await auth.SignIn(null, null)

        setUser(res.user)
        await AsyncStorage.setItem('@FM:user', JSON.stringify(res.user))
        await AsyncStorage.setItem('@FM:token', res.token)
        setProcessing(false)
        setLoading(false)
    }

    const signOut = async () => {
        await AsyncStorage.removeItem('@FM:user')
        await AsyncStorage.removeItem('@FM:token')
        setUser(null)
    }

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
                <ActivityIndicator animating={true} size="large" color={primary.darker} />
            </View>
        )
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, loading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}