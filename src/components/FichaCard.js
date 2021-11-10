import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ImageColors from "react-native-image-colors";

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
              Motivo de consulta:{"\n"}
              { ficha.motivoConsulta }{"\n"}
              ID:
              { '\n#' + ficha.idFichaClinica }
              </Text>
      </View>
  </TouchableOpacity>
        );
}


const styles = StyleSheet.create({
  container: {
      width: (windowWidth * 0.5) - 15,
      height: (windowWidth * 0.4) - 15,
      borderRadius: 20,
      marginBottom: 10,
      marginLeft: 10,
      flexDirection: 'column',
      justifyContent: 'space-around',
      elevation: 10,

      // Sombras en IOS

      // shadowColor: '#000',
      // shadowOffset: {
      //     width: 5,
      //     height: 5,
      // },
      // shadowOpacity: 0.25,
      // shadowRadius: 20,
  },

  nombre: {
      color: '#fff',
      marginLeft: 15,
      marginTop: 15,
      fontSize: 12,
  },
 
})