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
import { FAB } from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';

import {endpoint} from '../config/api';
import PacienteItem from '../components/PacienteItem';
import PacienteForm from '../components/PacienteForm';
import PacienteSearch from '../components/PacienteSearch';


export default () => {
    const [pacientesList, setPacientesList] = useState([]);
    const [pacientesListFiltered, setPacientesListFiltered] = useState([]);
    const [selectedPacienteObj, setSelectedPacienteObj] = useState(null);
    const [pacienteModal, setPacienteModal] = useState(false);
    const [pacienteFormModal, setPacienteFormModal] = useState(false);
    const [query, setQuery] = useState('');
    const [error, setError] = useState(null);
    useEffect(()=>{
        const getPacientesData = async () => {
            
            try {
                const data =  await fetch(`${endpoint}/stock-nutrinatalia/persona`);
                const res = await data.json();
                setPacientesListFiltered(res.lista)
                setPacientesList(res.lista);
            
            } catch (error) {
                console.log(error);
                setError(error);
                
            }
        }

        getPacientesData();
    },[]);
     useEffect(()=>{
        handleSearch(query);
     },[query]);

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
    const getPaciente = async(paciente) => {
        setSelectedPacienteObj(paciente);
        setPacienteModal(true);
    }

    const createPaciente = async() => {

        setPacienteFormModal(true);
    }

    const handleSearch = (query) => {
        
        const pacientesFiltered = pacientesList.filter((paciente) => {
        return (
            paciente.nombre.toLowerCase().includes(query.toLowerCase())
        );
        });
        setPacientesListFiltered(pacientesFiltered);
  };
 
    return(
         <View style={styles.container}>
             <View style={{position:"absolute", top:0, width:"100%"}} >
                <PacienteSearch onChange={handleSearch} query={query} setQuery={setQuery} />
        

             </View>
            

           
            <View style={styles.modal}>
                <PacienteItem setModalVisible={setPacienteModal} modalVisible={pacienteModal}
                    paciente={selectedPacienteObj}
                />
                <PacienteForm setModalFormVisible={setPacienteFormModal} modalFormVisible={pacienteFormModal}
                    getPacientes={getPacientesData}
                />
                
            </View>
            <FlatList
            data={pacientesListFiltered}
            renderItem={({item}) => (
                <Pressable onPress={()=>{getPaciente(item)}} style={styles.containerPressable}>

                    <View style={styles.row}>
                        <Text style={styles.symbolText}>{item.cedula}</Text>
                    </View>

                    <View style={styles.row} center>
                        <Text style={styles.nameText}>{item.nombreCompleto}</Text>

                    
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.percentText}>{item.tipoPersona}</Text>
                    </View>
                </Pressable>
            )}
        />

                <FAB style={{marginBottom:50}} title="+" placement="right" color="orange" onPress={createPaciente} />
      </View>
        
    );
}

const styles = StyleSheet.create({
        container:{
            position:"relative",
            top:0
        },
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
            padding: 16,
            borderBottomColor: "orange",
            borderBottomWidth: 1,
            paddingLeft: Platform.OS == 'ios' ? 0 : 16,
            marginLeft: Platform.OS == 'ios' ? 16 : 0
        },
        modal: {
            width: 0,
        }
});