import React, { useState } from 'react'

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TextInput,
    Button,
} from 'react-native';

import TitledInput from '../includes/TitledInput';

export default ({ logged }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const login = () => username && password && logged()

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.pageTitleOrange}>Go Lo**n </Text>
                <Text style={styles.pageTitle}>yourself</Text>
            </View>
            <Separator />
            <Separator />
            <TitledInput
                value={username}
                onChange={setUsername}
                title="Nombre de usuario"
                placeholder="Ej.: davidnuñez"
            />
            <Separator />
            <TitledInput
                value={password}
                onChange={setPassword}
                title="Contraseña"
                placeholder="**********"
            />
            <Separator />
            <Button
                onPress={login}
                title="Iniciar Sesión"
                color="orange"
                disabled={!username || !password}
            />
        </View>
    )
}

const Separator = () => (
  <View style={styles.separator} />
);

const styles = StyleSheet.create({
    container: {
        margin: 12,
    },
    separator: {
        marginVertical: 8,
    },
    pageTitle: {
        fontSize: 30,
        marginLeft: 1,
        color: '#000',
        opacity: 0.3
    },
    pageTitleOrange: {
        fontSize: 30,
        marginLeft: 1,
        color: 'orange',
        opacity: 0.5
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    }
});