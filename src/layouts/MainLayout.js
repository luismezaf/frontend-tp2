
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
    Button,
    TouchableOpacity
} from 'react-native';

const FooterOption = ({onPress, title, selected}) => {
    return (
        <View style={[styles.footerButton, {paddingHorizontal:4}]}>
            <TouchableOpacity onPress={onPress} style={{ backgroundColor:selected?'orange':'white', borderRadius:20 }} >
                <Text style={{color:selected?'white':'grey', textAlign:'center', padding:10, fontSize:16}}>{title}</Text>
            </TouchableOpacity>
        </View>
    )
}

const Footer = ({ onPageChange }) => {
    const [selected, setSelected] = useState('pacientes')
    const handleChangePage = page => {
        onPageChange(page)
        setSelected(page)
    }

    return (
        <View style={styles.footer}>
            <FooterOption selected={selected==='pacientes'} onPress={() => handleChangePage('pacientes')} title="Pacientes" />
            <FooterOption selected={selected==='reservas'} onPress={() => handleChangePage('reservas')} title="Reservas" />
            <FooterOption selected={selected==='fichas'} onPress={() => handleChangePage('fichas')} title="Fichas" />
        </View>
    );
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