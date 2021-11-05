/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react'
import Login from './src/pages/Login'

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ActivityIndicator,
} from 'react-native'

const App = () => {
  const [hasLogged, setHasLogged] = useState(false)
  const [loading, setLoading] = useState(false)

  // On login
  const handleLogged = () => {
    setLoading(true)
    setTimeout(() => {
      setHasLogged(true)
      setLoading(false)
    }, 1200)
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      {
        loading ? <ActivityIndicator size="large" color="orange" /> :
        hasLogged ? <Text>You are now logged! :D</Text> :
          <Login logged={_ => handleLogged()} /> 
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
});

export default App;
