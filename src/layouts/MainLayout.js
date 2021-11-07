
import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TextInput,
    Button
} from 'react-native';

const Footer = ({onPageChange}) => {
    return(<View style={styles.footer}>
        <Button style={styles.footerButton} onPress={()=>onPageChange('pacientes')} title="Pacientes" color="orange" />
        <Button style={styles.footerButton} onPress={()=>onPageChange('reservas')} title="Reservas" color="orange" />
        <Button style={styles.footerButton} onPress={()=>onPageChange('fichas')} title="Fichas" color="orange" />
    </View>);
}

export default ( {children, onPageChange} ) => {
    return(
        <View style={styles.container}>
            <View style={styles.content}>
                {children}
            </View>
            <Footer onPageChange={onPageChange}/>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        height: '100%'
    },
    content:{
        flexGrow: 1,
        display: 'flex'
    },
    footer:{
        display: "flex",
        flexDirection: "row",
        width: "100%"
    },
    footerButton: {
        flexGrow: 1,
        display: 'flex',
        flexBasis: 0
    }
});