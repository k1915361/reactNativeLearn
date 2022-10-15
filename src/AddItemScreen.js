import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

const AddItemScreen = ({navigation, route}) => {
    const {callback} = route.params;
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    let name = '';

    return (
        <View>
            <Text style={styles.textLabel}>Enter your title:</Text>
            <TextInput style={styles.textInput}
                placeholder='Type title here' value={title}
                onChangeText={(text) => { setTitle(text); }}
            />
            <Text style={styles.textLabel}>Enter your content:</Text>
            <TextInput style={styles.textInput}  
                placeholder="Type content here" value={content}
                onChangeText={(text) => {
                    setContent(text);
                }}
                multiline={true}
                numberOfLines={4}
                autoCapitalisze='none'
                autoCorrect={false}
                autoFocus={true}
                keyboardType='email-address'
                maxLength={100}
                onFocus={() => {/* e.g. chnage styling */}}
            >
            </TextInput>     
            <Button title='Submit Item' onPress={() => {
                callback(title, content);
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
        padding: 0,
    }
});

export default AddItemScreen;