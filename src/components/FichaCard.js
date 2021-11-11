import React, { useEffect, useRef, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const windowWidth = Dimensions.get('window').width

export default function FichaCard(props){
    const [bgColor, setBgColor] = useState('grey')

    const {ficha}=props;

    return(
      <TouchableOpacity

      >
      <View style={{ 
              ...styles.container,
              backgroundColor: bgColor,
          }}>
          <Text style={ styles.nombre }>
              Motivo de consulta:
              { " " + ficha.motivoConsulta }{"\n"}
              idFichaClinica:
              { ' ' + ficha.idFichaClinica }
              {"\n"}diagnostico:
              { ' ' + ficha.diagnostico }
              {"\n"}observacion:
              { ' ' + ficha.observacion }
              {"\n"}idEmpleado:
              { ' ' + ficha.idEmpleado.idPersona + ' - ' + ficha.idEmpleado.nombre+ ' ' + ficha.idEmpleado.apellido  }
              {"\n"}idCliente:
              { ' ' + ficha.idCliente.idPersona + ' - ' + ficha.idCliente.nombre+ ' ' + ficha.idCliente.apellido }
              {"\n"}idTipoProducto:
              { ' ' + ficha.idTipoProducto.idTipoProducto + ' - ' + ficha.idTipoProducto.descripcion}

            </Text>
      </View>
  </TouchableOpacity>
        );
}


const styles = StyleSheet.create({
  container: {
      width: (windowWidth * 0.5) - 15,
      height: (windowWidth * 0.4) - 15,
      borderRadius: 10,
      marginBottom: 10,
      marginLeft: 10,
      elevation: 10,

  },

  nombre: {
      color: '#fff',
      marginLeft: 10,
      marginTop: 10,
      paddingTop:0,
      fontSize: 12,

  },
 
})