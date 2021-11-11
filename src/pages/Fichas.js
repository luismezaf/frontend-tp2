import React, { useState,useEffect } from 'react';
import { getFichas, getFichasPaciente } from '../api/fichas';
import FichasList from '../components/FichasList';

import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import {endpoint} from '../config/api';
import TitledInput from '../includes/TitledInput';
import {
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';
export default () => {
    const [fichas, setfichas] = useState([]);
    const [fisiosList, setFisiosList] = useState([]);
    const [clientsList, setClientsList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [reservasList, setReservasList] = useState([]);
    const [motivo, setMotivo] = useState([]);
    const [diagnostico, setDiagnostico] = useState([]);
    const [observacion, setObservacion] = useState([]);
    const [selectedFisio, setSelectedFisio] = useState(0);
    const [selectedClient, setSelectedClient] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [selectedFicha, setSelectedFicha] = useState(0);
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
        const getCategoryData = async () => {
            try {
                const data =  await fetch(`${endpoint}/stock-nutrinatalia/categoria`);
                const response = await data.json();
                setCategoryList(response.lista);
            } catch (error) {
                console.log(error);
                setError(error);
            }
        }
        getCategoryData();
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
    const getFichasSubCategoria = async() => {
        setfichas([]);
        try {
            const completeEndpoint = `${endpoint}/stock-nutrinatalia/fichaClinica?ejemplo=%7B%22idTipoProducto%22%3A%7B%22idTipoProducto%22%3A${selectedCategory}%7D%7D`;
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
    const postFicha = async() => {
        const body = JSON.stringify({
            "motivoConsulta": motivo,
            "diagnostico":diagnostico,
            "observacion":observacion,
            "idEmpleado":{
                "idPersona":selectedFisio
            },
            "idCliente":{
                "idPersona":selectedClient
            },
            "idTipoProducto": {
                "idTipoProducto":selectedCategory
            }
        });
        console.log(body);
        const completeEndpoint = `${endpoint}/stock-nutrinatalia/fichaClinica`;
        try {
            const data = await fetch(completeEndpoint, { method: 'POST', body, headers:{
                usuario: "gustavo",
                'Content-Type': 'application/json'
            }});   
            console.log(data);
            loadFichas();   
        } catch (error) {
            console.log(error);
            setError(error);
        }
    }
    const putFicha = async() => {
        const body = JSON.stringify({
            "idFichaClinica":selectedFicha,
            "observacion":observacion
        });
        const completeEndpoint = `${endpoint}/stock-nutrinatalia/fichaClinica`;
        try {
            const req = await fetch(completeEndpoint, {method:'PUT', body, headers:{
                usuario: "gustavo",
                'Content-Type': 'application/json'
            }});
            console.log(req);   
            loadFichas();   
        } catch (error) {
            console.log('error');
        }
    }
    const loadFichas = async () =>{

        try {
            const response = await getFichas();
           
            setfichas(response.lista);

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
                    <View >
                    <View style={{flex:1, flexDirection:"row", paddingBottom:70}}>
                        <View style={{width:200,height:200}} >
                            <TitledInput
                                value={motivo}
                                onChange={setMotivo}
                                title="motivoConsulta"
                                placeholder="Ej.: dolor en la rodilla"
                                
                            />
                        </View>
                        <View style={{width:200,height:200}} >
                            <TitledInput
                                value={diagnostico}
                                onChange={setDiagnostico}
                                title="diagnostico"
                                placeholder="Ej.: lesion leve"
                            
                            />
                        </View>

                    </View>    
                    <View style={{flex:1, flexDirection:"row", paddingBottom:70}}>
                        <View style={{width:200,height:200}} >
                            <TitledInput
                                value={observacion}
                                onChange={setObservacion}
                                title="observacion"
                                placeholder="Ej.: nada grave"       
                            
                            />
                        </View>
                        <View style={{width:200,height:200}} >
                            <Picker style={styles.fisioPicker} onValueChange={(itemValue, itemIndex) =>
                                setSelectedCategory(itemValue)
                            } selectedValue={selectedCategory}>
                                <Picker.Item label=" -- SelecSubCategory -- " value={0} />
                                {categoryList.map( category => (
                                    <Picker.Item key={`${category.idCategoria}${category.descripcion}${category.flagVisible}`} label={`${category.descripcion} ${category.flagVisible}`} value={category.idCategoria} />  
                                ))}
                            </Picker>
                        </View>                        
                    </View>

                    <View style={{flex:1, flexDirection:"row", paddingBottom:50}} >
                        <View style={{width:200,height:200}} >
                            <Picker style={styles.fisioPicker} onValueChange={(itemValue, itemIndex) =>
                                setSelectedFisio(itemValue)
                            } selectedValue={selectedFisio}>
                                <Picker.Item label=" -- SelecDoctor -- " value={0} />
                                {fisiosList.map( fisio => (
                                    <Picker.Item key={`${fisio.idPersona}${fisio.nombre}${fisio.apellido}`} label={`${fisio.nombre} ${fisio.apellido}`} value={fisio.idPersona} />  
                                ))}
                            </Picker>
                        </View>
                        <View style={{width:200,height:200}} >
                            <Picker style={styles.fisioPicker} onValueChange={(itemValue, itemIndex) =>
                                setSelectedClient(itemValue)
                            } selectedValue={selectedClient}>
                                <Picker.Item label=" -- SelecCliente -- " value={0} />
                                {clientsList.map( client => (
                                    <Picker.Item key={`${client.idPersona}${client.nombreCompleto}`} label={`${client.nombreCompleto}`} value={client.idPersona} />  
                                ))}
                            </Picker>
                        </View>
                    </View>
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
                    <Text style={styles.text}>Filtros</Text>
                    <View style={{flex:1, flexDirection:"row", paddingBottom:40}} >
                         <View style={{width:200,height:200}} >
                            <Button
                                style={styles.botonGetReservas}
                                onPress={getFichasPaciente}
                                title="Fichas_Paciente"
                                color="orange"
                            />
                        </View>
                        <View style={{width:200,height:200}} >
                            <Button
                                style={styles.botonGetReservas}
                                onPress={getFichasFisioterapeuta}
                                title="Fichas_Fisio"
                                color="green"
                            />
                        </View>

                    </View>
                    <View style={{flex:1, flexDirection:"row", paddingBottom:50}} >
                        <View style={{width:200,height:200}} >
                                <Button
                                    style={styles.botonGetReservas}
                                    onPress={getFichasEntreFechas}
                                    title="Fichas_Entre_fechas"
                                    color="red"
                                />
                        </View>
                        <View style={{width:200,height:200}} >
                                <Button
                                    style={styles.botonGetReservas}
                                    onPress={getFichasSubCategoria}
                                    title="Fichas_SubCategoria"
                                    color="blue"
                                />
                        </View>
                    </View>

                    <View style={{flex:1, flexDirection:"row", paddingBottom:50}} >
                        <View style={{width:200,height:200}} >
                                <Button
                                    style={styles.botonGetReservas}
                                    onPress={postFicha}
                                    title="POST Ficha"
                                    color="purple"
                                />
                        </View>
                        <View style={{width:100,height:200}} >
                                <Button
                                    style={styles.botonGetReservas}
                                    onPress={putFicha}
                                    title="PUT Ficha"
                                    color="pink"
                                />
                        </View>
                        <View style={{width:115,height:200}} >
                                <Picker style={styles.fisioPicker} onValueChange={(itemValue, itemIndex) =>
                                        setSelectedFicha(itemValue)
                                    } selectedValue={selectedFicha}>
                                        <Picker.Item label="ID" value={0} />
                                        {fichas.map( ficha => (
                                            <Picker.Item key={`${ficha.idFichaClinica}`} label={`ID: ${ficha.idFichaClinica}`} value={ficha.idFichaClinica} />  
                                        ))}
                                </Picker>
                        </View>
                    </View>
                      
                </View>
                <View stryle={{ height:100 }}>
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
        textAlign:"center"
    },
    ajustar: { 
        height: 60,
        width:300,


        
    },
});