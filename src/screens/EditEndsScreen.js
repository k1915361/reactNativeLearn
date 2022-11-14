import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from "react";
import { setProperties } from "../helpers/helper";

const EditEndScreen = ({navigation, items, image, keyy: key, textInput, setItems, setImage}) => {
    const item = `shots.${key}`;

    const textInputOnChangeText = (value, onChangeText) => 
        textInputRender(value, onChangeText);     

    const deleteEndByKey = (key) => delete items.shots[key];
    
    const deleteEnd = (key) => {
        deleteEndByKey(key);
        // setItems(items);
    };
    
    const updateItem = (path, value) => setItems(setProperties(items, path, value));

    const getUpdatedItem = (path, val) => setProperties(items, path, val);
    
    const getTeamName = (team) => items?.[team === 'teamA' ? 'teamA' : 'teamB']?.name;

    const getShotEndTeamName = (key) => getTeamName(items.shots[key].team);
    
    const addEndImageByKey = (key, image) => updateItem(`${item}.image`, image);
    
    const addEndImage = (image) => updateItem(`${item}.image`, image);
    
    const addEndImageByKey2 = (key, image) => {
        items.shots[key].image = image;
        // setItems(items);
    };

    const handleTeamChange = (val, key) => updateItem(  `shots.${key}.team`, 
        val.includes('teamA') ? 'teamB': 'teamA' 
    ); 

    return(
        <View>
            <View style={styles.textInputRowContainer}>
                <Text>{Number(key)+1} </Text>
                {textInput(`${item}.team`, (val) => handleTeamChange(val))}
                <Text> {getShotEndTeamName(key)}</Text>
                {textInput(`${item}.shot`)}
                <MaterialIcons name='delete' size={24} color='red' onPress={() => deleteEnd(key)} />
                <Pressable style={styles.buttonStyle} onPress={() => {
                    navigation.navigate('Camera', {
                        navigation: navigation,
                        onSetImage: (uri) => {addEndImage(uri); setImage(uri);} 
                    })
                }}>
                    <Text style={styles.textStyle}><MaterialIcons name='edit' size={24} color='blue' onPress={() => addEndImageByKey(key, image)} />Edit</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    textInputRowContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap', 
        alignSelf:"center",
    },
});

export default EditEndScreen;