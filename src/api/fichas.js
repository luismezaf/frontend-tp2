import {endpoint} from '../config/api';

export async function getFichas(){
    try{
        const url = `${endpoint}/stock-nutrinatalia/fichaClinica`;
        const response = await fetch(url);
        const result = await response.json();
        return result;

    }catch(error){
        throw error;
    }
}

export async function getFichasPaciente(){
    try{
        const url = `${endpoint}/stock-nutrinatalia/fichaClinica`;
        const response = await fetch(url);
        const result = await response.json();
        return result;

    }catch(error){
        throw error;
    }
}

