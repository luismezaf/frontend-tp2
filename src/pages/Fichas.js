import React, { useState,useEffect } from 'react';
import { getFichas, getFichasPaciente } from '../api/fichas';
import FichasList from '../components/FichasList';
import axios from "axios";
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import {endpoint} from '../config/api';
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
export default () => {
    const [fichas, setfichas] = useState([]);
    const [fisiosList, setFisiosList] = useState([]);
    const [clientsList, setClientsList] = useState([]);
    const [reservasList, setReservasList] = useState([]);
    const [selectedFisio, setSelectedFisio] = useState(0);
    const [selectedClient, setSelectedClient] = useState(0);
    const [date1, setDate1] = useState( new Date() );
    const [date2, setDate2] = useState( new Date() );
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
        (async () =>{
            await loadFichas();
        })()
    },[])
    const formatDate1 = date1 =>`${date1.getFullYear()}${(date1.getMonth() + 1) >= 10 ? (date1.getMonth() + 1) : `0${date1.getMonth() + 1}`}${date1.getDate() >= 10 ?date1.getDate() : `0${date1.getDate()}`}`;
    const formatDate2 = date2 =>`${date2.getFullYear()}${(date2.getMonth() + 1) >= 10 ? (date2.getMonth() + 1) : `0${date2.getMonth() + 1}`}${date2.getDate() >= 10 ?date2.getDate() : `0${date2.getDate()}`}`;
    
    const getFichasPaciente = async() => {
        setfichas([]);
        try {
            const completeEndpoint = `${endpoint}/stock-nutrinatalia/fichaClinica?ejemplo=%7B%22idCliente%22%3A%7B%22idPersona%22%3A${selectedClient}%7D%7D`;
            const response =  await fetch(completeEndpoint,
                { method: 'GET', headers:{
                    usuario: "gustavo",
                    'Content-Type': 'application/json'
                }}); 
            let data = await response.json();
            if( selectedClient ){
                data = data.lista.filter( ficha => ficha.idCliente?.idPersona === selectedClient );
            }
            //console.log(data)
            setfichas(data);
        }catch (error) {
            console.log(error);
            setError(error);
        }
    }
    const getFichasFisioterapeuta = async() => {
        setfichas([]);
        try {
            const completeEndpoint = `${endpoint}/stock-nutrinatalia/fichaClinica?ejemplo=%7B%22idEmpleado%22%3A%7B%22idPersona%22%3A${selectedFisio}%7D%7D`;
            const response =  await fetch(completeEndpoint,
                { method: 'GET', headers:{
                    usuario: "gustavo",
                    'Content-Type': 'application/json'
                }}); 
            let data = await response.json();
            if( selectedFisio ){
                data = data.lista.filter( ficha => ficha.idEmpleado?.idPersona === selectedFisio );
            }
           // console.log(data)
            setfichas(data);
        }catch (error) {
            console.log(error);
            setError(error);
        }
    }
    const getFichasEntreFechas = async() => {
        setfichas([]);
        try {
            const completeEndpoint = `${endpoint}/stock-nutrinatalia/fichaClinica?ejemplo=%7B%22fechaDesdeCadena%22%3A${formatDate1(date1)}%2C%22fechaHastaCadena%22%3A${formatDate2(date2)}%7D`;
            const response =  await fetch(completeEndpoint,
                { method: 'GET', headers:{
                    usuario: "gustavo",
                    'Content-Type': 'application/json'
                }}); 
            let data = await response.json();
            
            setfichas(data.lista);
        }catch (error) {
            console.log(error);
            setError(error);
        }
    }
    const loadFichas = async () =>{

        try {
            const response = await getFichas();
            const fichasArray = [];

            for await (const ficha of response.lista){
                fichasArray.push({
                    "idFichaClinica": ficha.idFichaClinica,
                    "fechaHora": "2021-11-10 08:39:45",
                    "motivoConsulta": ficha.motivoConsulta,
                    "diagnostico": ficha.diagnostico,
                    "observacion": ficha.observacion,
                })
            }
            setfichas([...fichas,...fichasArray]);

        } catch (error) {
            console.error(error);
        }
    }


    return(
        <View>
            <Text style={styles.mainTitle}>
                Fichas
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
                    <View   >
                    <Text style={styles.text}>Seleccione fecha de inicio</Text>
                        <DatePicker style={styles.datePicker,styles.container} date={date1} onDateChange={setDate1}
                            fadeToColor='none' textColor='#fff' mode='date'
                        />
                        <Text style={styles.text}>Seleccione fecha de fin</Text>                        
                        <DatePicker style={styles.datePicker,styles.container} date={date2} onDateChange={setDate2}
                            fadeToColor='none' textColor='#fff' mode='date'
                        />
                    </View>
           
                    <Button
                        style={styles.botonGetReservas}
                        onPress={getFichasPaciente}
                        title="Fichas de paciente"
                        color="orange"
                    />
                    <Button
                        style={styles.botonGetReservas}
                        onPress={getFichasFisioterapeuta}
                        title="Fichas de fisioterapeuta"
                        color="green"
                    />
                    <Button
                        style={styles.botonGetReservas}
                        onPress={getFichasEntreFechas}
                        title="Fichas entre fechas"
                        color="red"
                    />
                       <FichasList fichas={fichas}/>
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
    },
    container: { 

        height: 40,
        padding:20,


    },
    text: { 
        padding:10,
    },
});