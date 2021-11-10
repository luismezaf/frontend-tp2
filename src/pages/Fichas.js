import React, { useState,useEffect } from 'react';
import { getFichas } from '../api/fichas';
import FichasList from '../components/FichasList';
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
    console.log(fichas);
    
    useEffect(()=>{
        (async () =>{
            await loadFichas();
        })()
    },[])

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
            <FichasList fichas={fichas}/>
        </View>
    );
}