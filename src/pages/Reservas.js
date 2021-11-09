import React, { useEffect, useState } from 'react';
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

import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';

import {endpoint} from '../config/api';
import ReservasList from '../components/ReservasList';

export default () => {
    const [fisiosList, setFisiosList] = useState([]);
    const [clientsList, setClientsList] = useState([]);
    const [reservasList, setReservasList] = useState([]);
    const [selectedFisio, setSelectedFisio] = useState(0);
    const [selectedClient, setSelectedClient] = useState(0);
    const [date, setDate] = useState( new Date() );
    const [error, setError] = useState(null);

    useEffect(()=>{
        const getFisiosData = async () => {
            try {
                const data =  await fetch(`${endpoint}/stock-nutrinatalia/persona?ejemplo=%7B%22soloUsuariosDelSistema%22%3Atrue%7D`);
                const response = await data.json();
                setFisiosList(response.lista);
            } catch (error) {
                console.log(error);
                setError(error);
            }
        }
        const getClientsData = async () => {
            try {
                const data =  await fetch(`${endpoint}/stock-nutrinatalia/persona`);
                const response = await data.json();
                setClientsList(response.lista);
            } catch (error) {
                console.log(error);
                setError(error);
            }
        }
        getFisiosData();
        getClientsData();
    }, []);
    const formatDate = date =>`${date.getFullYear()}${(date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : `0${date.getMonth() + 1}`}${date.getDate() >= 10 ?date.getDate() : `0${date.getDate()}`}`;
    const getReservas = async() => {
        setReservasList([]);
        try {
            const completeEndpoint = `${endpoint}/stock-nutrinatalia/persona/${selectedFisio}/agenda?fecha=${formatDate(date)}`;
            const response =  await fetch(completeEndpoint);
            let data = await response.json();
            if( selectedClient ){
                data = data.filter( reserva => reserva.idCliente?.idPersona === selectedClient );
            }
            setReservasList(data);
        }catch (error) {
            console.log(error);
            setError(error);
        }
    }
    return(
        <View>
            <Text style={styles.mainTitle}>
                Reservas
            </Text>
            {error ? <Text>Hubo un error!! {error.message} </Text> :
            <>
                <View style={styles.filtersSection}>
                    <Picker style={styles.fisioPicker} onValueChange={(itemValue, itemIndex) =>
                        setSelectedFisio(itemValue)
                    } selectedValue={selectedFisio}>
                        <Picker.Item label=" -- Selecciona un doctor -- " value={0} />
                        {fisiosList.map( fisio => (
                            <Picker.Item key={`${fisio.idPersona}${fisio.nombre}${fisio.apellido}`} label={`${fisio.nombre} ${fisio.apellido}`} value={fisio.idPersona} />  
                        ))}
                    </Picker>
                    <Picker style={styles.fisioPicker} onValueChange={(itemValue, itemIndex) =>
                        setSelectedClient(itemValue)
                    } selectedValue={selectedClient}>
                        <Picker.Item label=" -- Selecciona un cliente -- " value={0} />
                        {clientsList.map( client => (
                            <Picker.Item key={`${client.idPersona}${client.nombreCompleto}`} label={`${client.nombreCompleto}`} value={client.idPersona} />  
                        ))}
                    </Picker>
                    <DatePicker style={styles.datePicker} date={date} onDateChange={setDate}
                        fadeToColor='none' textColor='#fff' mode='date'
                    />
                    <Button
                        style={styles.botonGetReservas}
                        onPress={getReservas}
                        title="Buscar reservas"
                        color="orange"
                    />
                    <ReservasList reservasList={reservasList} setError={setError} 
                        getReservas={getReservas} idCliente={selectedClient}
                        strDate={formatDate(new Date())}
                    />
                </View>
            </>}
        </View>
    );
}
const styles = StyleSheet.create({
        filtersSection:{
            marginLeft:"auto",
            marginRight:"auto"
        },
        datePicker:{
            marginLeft:"auto",
            marginRight:"auto",
            marginBottom:20
        },
        botonGetReservas:{
            
        },
        reservas: {
            marginTop: 20,
        },
        mainTitle:{
            marginTop:20,
            textAlign:"center",
            fontSize:30
        }
});