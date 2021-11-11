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

export default ({modalVisible, setModalVisible, paciente}) => {
    const [pacienteNombre, setPacienteNombre] = useState('');
    const [pacienteEmail, setPacienteEmail] = useState('');
    const [pacienteTelefono, setPacienteTelefono] = useState('');
    const [pacienteCedula, setPacienteCedula] = useState('');
    const [pacienteFechaNacimiento, setFechaNacimiento] = useState('');
    
    
    useEffect( ()=>{
        if(paciente ){
                console.log("asdENTRO")
                setPacienteNombre( paciente.nombreCompleto );
                setFechaNacimiento( paciente.fechaNacimiento);
                setPacienteEmail(paciente.email);
                setPacienteTelefono(paciente.telefono);
                setPacienteCedula(paciente.cedula);            
        }else{
                setPacienteNombre('');

        }
    }, [paciente, paciente?.nombreCompleto, paciente?.fechaNacimiento,paciente?.email,paciente?.telefono,paciente?.cedula] );
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text >{pacienteNombre}</Text>
                        <Text >{pacienteEmail}</Text>
                        <Text >{pacienteTelefono}</Text>
                        <Text >{pacienteCedula}</Text>
                        <Text >{pacienteFechaNacimiento}</Text>
                        
                        
                        
                        <View style={styles.actions}>
                            <Button 
                                style={styles.botonGuardar}
                                onPress={() => setModalVisible(false)}
                                title="OK"
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