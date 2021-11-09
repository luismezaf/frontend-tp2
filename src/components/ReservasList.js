import React, { useEffect, useState } from 'react';
import BigList from "react-native-big-list";
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
    FlatList
} from 'react-native';
import ReservasModal from './ReservasModal';

export default ({reservasList, setError, getReservas, idCliente, strDate}) => {
    const [selectedReservaObj, setSelectedReservaObj] = useState(null);
    const [modificarReservaModal, setModificarReservaModal] = useState(false);
    const reservar = async ({fechaCadena, horaInicioCadena, horaFinCadena, idEmpleado}, idCliente = 3) => {
        const body = JSON.stringify({
            fechaCadena,
            horaInicioCadena,
            horaFinCadena,
            idEmpleado:{
                idPersona: idEmpleado.idPersona
            },
            idCliente:{
                idPersona:idCliente
            }
        });
        const completeEndpoint = `${endpoint}/stock-nutrinatalia/reserva`;
        try {
            const data = await fetch(completeEndpoint, { method: 'POST', body, headers:{
                usuario: "usuario1",
                'Content-Type': 'application/json'
            }});   
            getReservas();   
        } catch (error) {
            console.log(error);
            setError(error);
        }
    }
    const cancelarReserva = async(idReserva) => {
        const completeEndpoint = `${endpoint}/stock-nutrinatalia/reserva/${idReserva}`;
        try {
            await fetch(completeEndpoint, {method:'DELETE'});
            getReservas();   
        } catch (error) {
            console.log(error);
            setError(error);
        }

    }
    const modificarReserva = async(reserva) => {
        setSelectedReservaObj(reserva);
        setModificarReservaModal(true);
    }
    const renderItem = ({item}) => ( 
        <View style={styles.reservasListItem}>
            <View style={styles.modal}>
                <ReservasModal setModalVisible={setModificarReservaModal} modalVisible={modificarReservaModal}
                    reserva={selectedReservaObj}
                />
            </View>
            <View >
                <Text> {item.fecha.substring(0, 10)} desde {item.horaInicioCadena} hasta {item.horaFinCadena}</Text>
                { item.idReserva && <Text>{item.idCliente.nombreCompleto}</Text>}
            </View>
            { item.idReserva ? 
            <View style={styles.actions}>
                <Button 
                    style={styles.botonReservar}
                    onPress={() => cancelarReserva(item.idReserva)}
                    title="Cancelar"
                    color="red"/> 
                <Button 
                    style={styles.botonModificar}
                    onPress={() => modificarReserva(item)}
                    title="Modificar"
                    disabled={item.fechaCadena < strDate}
                color="grey"/> 
            </View>: 
            <Button 
                style={styles.botonReservar}
                onPress={() => reservar(item, idCliente)}
                title="Reservar"
                color="orange"/>
            }
        </View>)
    return(
        <View style={styles.reservas}>
            <BigList data={reservasList} renderItem={renderItem} renderEmpty={()=> <Text>No hay reservas para su busqueda :(</Text>}
             itemHeight={90} />
        </View>
    );
};
const styles = StyleSheet.create({
    botonReservar:{
        
    },
    reservasListItem:{
        height: "100%",
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        borderBottomWidth:2,
        borderBottomColor:"grey",
    },
    actions: {
        display:'flex',
        height:'100%',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems:'stretch'
    },
    modal: {
        width: 0,
    }
});