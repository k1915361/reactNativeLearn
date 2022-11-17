import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from "react";
import { jsnstringify, setProperties } from "../helpers/helper";

const EditEndScreen = ({navigation, items, image, shots, keyy: key, textInput, setItems, setImage}) => {
    const [end, setEnd] = useState(items && items.shots[key]);
    // const [endPath, setEndPath] = useState(key && `shots.${key}`);
    const endPath = `shots.${key}`;
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
    
    const addEndImage = (image) => updateItem(`${endPath}.image`, image);
    
    const addEndImage2 = (image) => end.image = image;

    const getTeamChange = (val) => val.includes('teamA') ? 'teamB': 'teamA';

    const handleTeamChange = (val) => updateItem(  `${endPath}.team`, 
        val.includes('teamA') ? 'teamB': 'teamA' 
    ); 

    const objectRenderTest = (obj) => <Text> {jsnstringify(obj)} </Text>;

    return(
        <View>
            <View style={styles.textInputRowContainer}>                
                <Text>{Number(key)+1} </Text>
                {textInput(`${endPath}.team`, (val) => handleTeamChange(val))}
                <Text> {getEndTeamName()}</Text>
                {textInput(`${endPath}.shot`)}
                <MaterialIcons name='delete' size={24} color='red' onPress={() => deleteEnd(key)} />
                <Pressable style={styles.buttonStyle} onPress={() => {
                    navigation.navigate('Camera', {
                        navigation: navigation,
                        onSetImage: (uri) => {addEndImage(uri);} 
                    })
                }}>
                    <Text style={styles.textStyle}>
                        <MaterialIcons 
                            name='camera' size={40} color='green' 
                            onPress={() => addEndImage(image)} 
                        />
                            Add Photo
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