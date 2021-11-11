import React, { useEffect, useState } from 'react';
import { endpoint } from '../config/api';
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
    Modal,
    Switch,
    Pressable
} from 'react-native';
import TitledInput from '../includes/TitledInput';

export default ({ query, setQuery}) => {

    
    return (
    <View>
        <TextInput
          style={[
            styles.textInput,
            Platform.OS == 'ios' ?
              styles.textInputIOS :
              styles.textInputAndroid
            ]}
          onChangeText={setQuery}
          value={query}
          placeholder="Buscar Paciente"
          placeholderTextColor="#fff"
        />
      </View>
    );
};

const styles = StyleSheet.create({
  textInput: {
    height: 46,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    paddingLeft: 16,
    color: "#fff"
  },
  textInputAndroid: {
    borderBottomWidth: 2,
    borderBottomColor: "#FFA"
  },
  textInputIOS: {
    margin: 8,
    borderRadius: 8
  }
});