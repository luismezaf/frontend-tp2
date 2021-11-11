import React from "react";
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
    FlatList,

} from 'react-native';
import FichasCard from "./FichaCard";

export default function FichasList(props){

    const {fichas}=props;
    return(
        <View style={{ height:150 }} >
            <FlatList
                data={fichas}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                renderItem={({item})=> <FichasCard ficha = {item} />}
                contentContainerStyle={styles.FlatListContentContainer}
            />
          </View>
        );
}

const styles = StyleSheet.create({
    FlatListContentContainer:{
        paddingHorizontal:5
    },
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
      },
      item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      },
      title: {
        fontSize: 32,
      },
})