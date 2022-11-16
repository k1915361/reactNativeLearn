import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from "react";
import { jsnstringify, setProperties } from "../helpers/helper";

const EditEndScreen = ({navigation, items, image, shots, keyy: key, textInput, setItems, setImage}) => {
    const [end, setEnd] = useState(items && items.shots[key]);
    const [endPath, setEndPath] = useState(key && `shots.${key}`);
    // const endPath = `shots.${key}`;
    // const end = items.shots[key];
    const teamName = {teamA: items.teamA.name,teamB: items.teamA.name};

    const textInputOnChangeText = (value, onChangeText) => 
        textInputRender(value, onChangeText);     

    const deleteEndByKey = (key) => delete items.shots[key];
    
    const deleteEnd = (key) => deleteEndByKey(key);
    
    const updateItem = (path, value) => setItems(setProperties(items, path, value));

    const getUpdatedItem = (path, val) => setProperties(items, path, val);
    
    const getTeamNameByKey2 = (key) => getTeamName(items.shots[key].team);

    const getTeamName2 = (team) => items?.[team === 'teamA' ? 'teamA' : 'teamB']?.name;
    
    const getTeamName = (team) => teamName[team];

    const getEndTeamName = () => end.team;

    const getTeamAName = () => end.teamA.name;
    const getTeamBName = () => end.teamB.name;
    
    const addEndImageByKey = (key, image) => updateItem(`${endPath}.image`, image);
    
    const addEndImage = (image) => updateItem(`${endPath}.image`, image);
    
    const addEndImage2 = (image) => end.image = image;
    
    const addEndImageByKey3 = (key, image) => items.shots[key].image = image;

    const handleTeamChange = (val, key) => updateItem(  `shots.${key}.team`, 
        val.includes('teamA') ? 'teamB': 'teamA' 
    ); 

    return(
        <View>
            <View style={styles.textInputRowContainer}>
                {/* <Text>-t- {jsnstringify(end.team)} </Text> */}
                <Text>-t- {jsnstringify(items.shots[key])} --</Text>
                <Text>{Number(key)+1} </Text>
                {textInput(`${endPath}.team`, (val) => handleTeamChange(val))}
                <Text> {getEndTeamName()}</Text>
                {textInput(`${endPath}.shot`)}
                <MaterialIcons name='delete' size={24} color='red' onPress={() => deleteEnd(key)} />
                <Pressable style={styles.buttonStyle} onPress={() => {
                    navigation.navigate('Camera', {
                        // navigation: navigation,
                        onSetImage: (uri) => {addEndImage(uri); setImage(uri);} 
                    })
                }}>
                    <Text style={styles.textStyle}>
                        <MaterialIcons 
                            name='edit' size={24} color='blue' 
                            onPress={() => addEndImageByKey(key, image)} 
                        />
                            Edit
                        </Text>
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