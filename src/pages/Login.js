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
import {endpoint} from '../config/api';
import { directive } from '@babel/types';

export default ({ logged }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [users, setUsers] = useState([])
    const [loginError, setLoginError] = useState('')

    const login = () => username && password && checkUsername() && logged()
    const checkUsername = () => (users && users.includes(username)) || setLoginError('El nombre de usuario no existe') === 'xd'

    const loadUsers = async () => {
        const response =  await fetch(`${endpoint}/stock-nutrinatalia/persona/?ejemplo=%7B%22soloUsuariosDelSistema%22%3Atrue%7D`);
        const data = await response.json();
        setUsers(data.lista.map(d => d.usuarioLogin));
    }
    loadUsers()

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.pageTitleOrange}>Go Login </Text>
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
            {
                !!loginError &&
                <View style={styles.errorMessage}>
                    <Text style={{color:'white'}}>{loginError + " - Los usuarios válidos son: " + users}</Text>
                </View>
            }
        </View>
    )
}

const Separator = () => (
  <View style={styles.separator} />
);

const styles = StyleSheet.create({
    errorMessage: {
        backgroundColor: 'red',
        color: 'white',
        padding: 10,
        borderRadius: 4,
        marginTop: 10,
    },
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