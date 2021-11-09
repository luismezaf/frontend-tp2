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

export default ({modalVisible, setModalVisible, reserva}) => {
    const [observacion, setObservacion] = useState('');
    const [flagAsistio, setFlagAsistio] = useState(false);
    const handleSave = async() => {
        setModalVisible(!modalVisible);
        const body = JSON.stringify({
            idReserva: reserva.idReserva,
            observacion,
            flagAsistio: flagAsistio ? "S" : null 
        });
        const completeEndpoint = `${endpoint}/stock-nutrinatalia/reserva`;
        try {
            const req = await fetch(completeEndpoint, {method:'PUT', body, headers:{
                usuario: "usuario1",
                'Content-Type': 'application/json'
            }});   
            console.log(completeEndpoint);
            console.log(body);
            console.log(req.data);
        } catch (error) {
            console.log('error');
        }
    }
    useEffect( ()=>{
        if(reserva ){
            if( reserva.observacion ){
                setObservacion( reserva.observacion );
            }else{
                setObservacion('');
            }
            if( reserva.flagAsistio ){
                setFlagAsistio(true);
            }else{
                setFlagAsistio(false);
            }
        }
    }, [reserva, reserva?.observacion, reserva?.flagAsistio] );
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
                        <TitledInput
                            value={observacion}
                            onChange={setObservacion}
                            title="Observacion"
                            placeholder="Ej.: El paciente tiene fiebre"
                        />
                        <View style={styles.switch}>
                            <Text>Asistio: </Text>
                            <Switch
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor={flagAsistio ? "#f5dd4b" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={()=>setFlagAsistio( previousState => !previousState )}
                                value={flagAsistio}
                            />
                        </View>
                        <View style={styles.actions}>
                            <Button 
                                style={styles.botonGuardar}
                                onPress={() => setModalVisible(false)}
                                title="Cancelar"
                                color="red"
                            />
                            <Button 
                                style={styles.botonGuardar}
                                onPress={handleSave}
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
          justifyContent:'space-around'
      },
      switch:{
          width:'100%',
          display:'flex',
          flexDirection:'row',
          justifyContent:'flex-start',
          padding: 10
      }
    });