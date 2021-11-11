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

export async function getFisiosData() {
    try {
        const url =  await fetch(`${endpoint}/stock-nutrinatalia/persona?ejemplo=%7B%22soloUsuariosDelSistema%22%3Atrue%7D`);
        const response = await fetch(url);
        const result = await response.json();
        return result;

    }catch(error){
        throw error;
    }
}

export async function getClientsData() {
    try {
        const url =  await fetch(`${endpoint}/stock-nutrinatalia/persona`);
        const response = await fetch(url);
        const result = await response.json();
        return result;

    }catch(error){
        throw error;
    }

}
