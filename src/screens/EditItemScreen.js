import { useContext, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import ItemContext from "../contexts/ItemContext";

const EditItemScreen = ({navigation, route}) => {
    const {id} = route.params;
    const {state, update} = useContext(ItemContext);
    const currentEntry = state.find((e) => e.id ===id);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

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
                update(currentEntry.id, title, content, 
                    currentEntry.date, () => navigation.pop());
            }} />
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

export default EditItemScreen;