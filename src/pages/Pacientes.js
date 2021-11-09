import React, { useEffect, useState, Component } from 'react';
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
    FlatList,
    Pressable
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';

import {endpoint} from '../config/api';



export default () => {
    const [pacientesList, setPacientesList] = useState([]);
    const [selectedFisio, setSelectedFisio] = useState(0);
    const [date, setDate] = useState( new Date() );
    const [error, setError] = useState(null);
    useEffect(()=>{
        const getPacientesData = async () => {
            
            try {
                const data =  await fetch(`${endpoint}/stock-nutrinatalia/persona`);
                const res = await data.json();
                setPacientesList(res.lista);
            
            } catch (error) {
                console.log(error);
                setError(error);
                
            }
        }
        getPacientesData();
    });
  
    const handlePress = (paciente) => {
        console.log(paciente.nombre);
    };

 
    return(
         <View style={styles.container, styles.row}>

            <FlatList
            data={pacientesList}
            renderItem={({item}) => (
                <Pressable onPress={()=>{handlePress(item)}} style={styles.containerPressable}>

                    <View style={styles.row}>
                        <Text style={styles.symbolText}>{item.cedula}</Text>
                        <Text style={styles.nameText}>{item.nombre}</Text>
                        <Text style={styles.priceText}>{item.apellido}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.percentText}>{item.tipoPersona}</Text>
                    
                    </View>

                </Pressable>
            )}
        />
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
        },
        row: {
            flexDirection: "row"
        },
        symbolText: {
            color: "orange",
            fontWeight: "bold",
            fontSize: 16,
            marginRight: 12
        },
        nameText: {
            color: "#000",
            fontSize: 14,
            marginRight: 16
        },
        priceText: {
            color: "#000",
            fontSize: 14,
        },
        percentText: {
            color: "orange",
            fontSize: 12,
            marginRight: 8
        },
        containerPressable: {
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 5,
            borderBottomColor: "orange",
            borderBottomWidth: 1,
            paddingLeft: Platform.OS == 'ios' ? 0 : 16,
            marginLeft: Platform.OS == 'ios' ? 16 : 0
        },
});