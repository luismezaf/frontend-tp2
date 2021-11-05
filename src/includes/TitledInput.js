import React, { useState } from 'react'

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TextInput,
} from 'react-native';

export default ({ value, onChange, title, placeholder, style }) => {
    const [hasFocus, setHasFocus] = useState(false)

    return (
        <View style={[styles.container, hasFocus && styles.selectedContainer, style]}>
            <Text style={[styles.title, hasFocus && styles.selectedTitle]}>{title}</Text>
            <TextInput
                style={styles.input}
                onChangeText={text => onChange(text)}
                onFocus={_ => setHasFocus(true)}
                onBlur={_ => setHasFocus(false)}
                placeholder={placeholder}
                value={value}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 45,
    },
    title: {
        marginLeft: 0,
    },
    selectedTitle: {
        marginLeft: 0,
        color: 'orange'
    },
    container: {
        paddingHorizontal: 16,
        paddingVertical: 4,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    selectedContainer: {
        borderColor: 'orange',
    }
});