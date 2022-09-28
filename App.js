import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { symbolicateLogLazy } from 'react-native/Libraries/LogBox/Data/LogBoxData';
import Homepage from './src/Homepage';

export default function App() {
    const myArray = [ 15, 1, 25.5, 32 ];
    const myArray2 = [ 
        { id:1, message: ''},
        { id:2, message: ''},
        { id:3, message: ''},
        { id:4, message: ''},
        { id:5, message: ''},
     ];
    const pi = 3.14;

    const newArray = myArray.map(item => item * pi);
    const filteredArray = myArray.filter(item => item > 16);
    const findArray = myArray2.find(item => item.id === 2);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {
            newArray.map(e => <Text key={e}>{e}</Text>)
        }
      <Text>Fred </Text>
      <Text>Wilma </Text>
      <Text>Pebbles </Text>
      <Text>Barney </Text>
      <Text>Bettie </Text>
      <Text>Bamm-Bamm </Text>
      <Text style={{
        fontSize: 20,
        fontWeight: 'bold',
        color: 'green',}}>
            My Text is green
        </Text>
        {/* <Image source={ require('./assets/favicon.png')} style={{img250x250 }}/> */}
      <StatusBar style="auto" />
      {/* <Homepage/> */}
      </ScrollView>
    </SafeAreaView>
  );
}

const img250x250 = StyleSheet.create({
    container: {
        width: 250, 
        height: 250,
    }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
