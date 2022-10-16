import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

const AddPlayerScreen = ({navigation, route}) => {
    const {callback} = route.params;
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    return (
        <View>
            <Text style={styles.textLabel}>Enter your firstname:</Text>
            <TextInput style={styles.textInput}
                placeholder='Type your firstname' value={firstName}
                onChangeText={(text) => { setFirstName(text); }}
            />
            <Text style={styles.textLabel}>Enter your lastname:</Text>
            <TextInput style={styles.textInput}  
                placeholder="Type your lastname" value={lastName}
                onChangeText={(text) => {
                    setLastName(text);
                }}
                multiline={true}
                numberOfLines={1}
                autoCapitalisze='none'
                autoCorrect={false}
                autoFocus={true}
                keyboardType='email-address'
                maxLength={100}
                onFocus={() => {/* e.g. chnage styling */}}
            >
            </TextInput>     
            <Button title='Submit Item' onPress={() => {
                callback(firstName, lastName);
                navigation.pop();
                }} 
            />
        </View>
    )
}

const styles = StyleSheet.create({
    textLabel: {
        padding: 0,
    },
    textInput: {
        padding: 5,
    }
});

export default AddPlayerScreen;