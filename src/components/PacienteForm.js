import React, { useEffect, useState } from 'react';
import { endpoint } from '../config/api';
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
    Modal,
    Switch,
    Pressable
} from 'react-native';
import TitledInput from '../includes/TitledInput';

export default ({modalFormVisible, setModalFormVisible, paciente,getPacientes}) => {
    
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [ruc, setRuc] = useState('');
    const [cedula, setCedula] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [tipoPersona, setTipoPersona] = useState('');
    const createPaciente = async () => {
        setModalFormVisible(!modalFormVisible);
        console.log("NPMBREEEe",{nombre})
        console.log("NPMBREEEe")

        const body = JSON.stringify({
            nombre: nombre,
            apellido: apellido,
            email,
            ruc: ruc,
            telefono,
            cedula,
            fechaNacimiento:"1999-11-11 00:00:00",
            tipoPersona:"FISICA"

        });
        const completeEndpoint = `${endpoint}/stock-nutrinatalia/persona`;
        try {
            const data = await fetch(completeEndpoint, { method: 'POST', body, headers:{
                usuario: "usuario1",
                'Content-Type': 'application/json'
            }});
            setApellido("");
            setNombre("");
            setRuc("");
            setEmail("");
            setCedula("");
            setTelefono("");
            console.log("res", data)   
        } catch (error) {
            console.log(error);
            setApellido("");
            setNombre("");
            setRuc("");
            setEmail("");
            setCedula("");
            setTelefono("");
        }
        getPacientes();
    }
    
    return (
       <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalFormVisible}
                onRequestClose={() => {
                    setModalFormVisible(!modalFormVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        
                        <TextInput value={nombre} onChangeText={setNombre} placeholder="Nombre"/>

                        <TextInput value={apellido} onChangeText={setApellido} placeholder="Apellido"/>
                        <TextInput value={ruc} onChangeText={setRuc} placeholder="RUC"/>
                        <TextInput value={cedula} onChangeText={setCedula} placeholder="Cedula"/>

                        <TextInput value={email} onChangeText={setEmail} placeholder="Email"/>
                        <TextInput value={telefono} onChangeText={setTelefono} placeholder="Telefono"/>
                        
                        <View style={styles.actions}>
                            <Button 
                                style={styles.botonGuardar}
                                onPress={() => setModalFormVisible(false)}
                                title="Cancelar"
                                color="red"
                            />
                            <Button 
                                style={styles.botonGuardar}
                                onPress={createPaciente}
                                title="Guardar"
                                color="orange"
                            />
                        </View>    
                    </View>
                </View>
            </Modal>
        </View>
    );
};
    
    const styles = StyleSheet.create({
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "grey",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      actions: {
          width:'80%',
          display:'flex',
          flexDirection:'row',
          justifyContent:'center'
      },
      switch:{
          width:'100%',
          display:'flex',
          flexDirection:'row',
          justifyContent:'flex-start',
          padding: 10
      }
    });