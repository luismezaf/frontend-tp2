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
    Button
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';

import {endpoint} from '../config/api';

export default () => {
    const [fisiosList, setFisiosList] = useState([]);
    const [reservasList, setReservasList] = useState([]);
    const [reservasTable, setReservasTable] = useState([]);
    const [selectedFisio, setSelectedFisio] = useState(0);
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
        getFisiosData();
    });
    const formatDate = date =>( date.getFullYear() + '' + (date.getMonth() + 1) + '' + date.getDate() );
    const getReservas = async() => {
        return;
        try {
            const data =  await fetch(`${endpoint}/stock-nutrinatalia/persona/${selectedFisio}/agenda?fecha=${formatDate(date)}`);
            const response = await data.lista;
            setReservasList(response);
        }catch (error) {
            console.log(error);
            setError(error);
        }
    }
    if(error){
        return(<Text>Hubo un error: {error}</Text>);
    }
    return(
        <View>
            <Text>
                Reservas
            </Text>
            <View style={styles.filtersSection}>
                <Picker style={styles.fisioPicker} onValueChange={(itemValue, itemIndex) =>
                    setSelectedFisio(itemValue)
                } selectedValue={selectedFisio}>
                    <Picker.Item label=" -- Selecciona un doctor -- " value={0} />
                    {fisiosList.map( fisio => (
                        <Picker.Item key={`${fisio.idPersona}${fisio.nombre}${fisio.apellido}`} label={`${fisio.nombre} ${fisio.apellido}`} value={fisio.idPersona} />  
                    ))}
                </Picker>
                <DatePicker style={styles.datePicker} date={date} onDateChange={setDate}/>
                <Button
                    style={styles.botonGetReservas}
                    onPress={getReservas}
                    title="Buscar reservas"
                    color="orange"
                />
            </View>
            <View style={styles.reservas}>
                {reservasList.length === 0 && <Text>No hay reservas para su busqueda :(</Text>}
                {reservasList.map(reserva => (
                    <View>
                        Fecha { reserva.fecha} 
                    </View>
                ))}
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
        filtersSection:{
            marginLeft:"auto",
            marginRight:"auto"
        },
        datePicker:{
            marginBottom:20
        },
        botonGetReservas:{
            
        },
        reservas: {
            marginTop: 20,
        }
});