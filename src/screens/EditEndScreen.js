import { Button, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from "react";
import { int, jsnstringify, pickImage, renderObj, setProperties, str } from "../helpers/helper";

const EditEndScreen = ({navigation, items, keyy: key, textInput, setItems, item, shot}) => {
    const teamNames = {'teamA': items?.teamA?.name,'teamB': items?.teamB?.name};
    const end = items.shots[key];
    const image = end.image;
    const endPath = `shots.${key}`;
    const teamPath = `${endPath}.team`;
    const imagePath = `${endPath}.image`;
    const shotPath = `${endPath}.shot`;
    const team = end.team;
    const teamName = teamNames[team];

    const textInputOnChangeText = (value, onChangeText) => 
        textInputRender(value, onChangeText);     

    const deleteEndByKey = (key) => delete items.shots[key];
    
    const deleteEnd = (key) => deleteEndByKey(key);
    
    const updateItem = (path, value) => setItems(setProperties(items, path, value));

    const addEndImage = (image) => updateItem(imagePath, image);
    
    const addEndImageV2 = (image) => end.image = image;

    const getTeamTextChange = (val) => val.includes('teamA') ? 'teamB': 'teamA';

    const handleTextTeamChange = (val) => updateItem( 
        teamPath, val.includes('teamA') ? 'teamB': 'teamA' 
    ); 

    let experiments = textInput(teamPath, (val) => handleTextTeamChange(val));

    const handleChangeTeam = () => updateItem(teamPath, (items.shots[key].team === 'teamA' ? 'teamB' : 'teamA'));

    const getTeamName = () => teamNames[end.team];
    
    return(
        <ScrollView horizontal={true}>
            <View style={styles.textInputRowContainer}>      
                {/* <Text> {jsnstringify(items.shots)} </Text> */}
                <Text> {jsnstringify(shot)} </Text>
                <Text>{Number(key)+1} </Text>
                <Button onPress={() => handleChangeTeam()} title='swap team'></Button> 
                <Text> {teamName}</Text>
                {textInput(shotPath)}
                <MaterialIcons name='delete' size={40} color='red' onPress={() => deleteEnd(key)} />
                <Pressable style={styles.buttonStyle} onPress={() => {
                    navigation.navigate('Camera', {
                        navigation: navigation,
                        onSetImage: (uri) => {addEndImage(uri);} 
                    })
                }}>
                    { <Text style={styles.textStyle}>
                        <MaterialIcons 
                            name='camera' size={40} color='black' 
                            onPress={() => addEndImage(image)} 
                            />
                        {!image ? 'Add Photo' : 'Change Photo'}
                    </Text>}
                </Pressable>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    textInputRowContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap', 
        alignSelf:"center",
    },
    scoreTextField: {
        alignSelf:"center",
        borderColor: 'grey',
        borderWidth: 0.4,
        paddingHorizontal: 0,
        paddingHorizontal: 0,
        paddingVertical: 0,
        marginVertical: 0, 
        marginBottom: 0, 
        borderRadius: 0, 
        textAlign: "center",
        paddingHorizontal: 0,
        maxWidth: 100, 
        width: 60, 
        height: 40, 
        fontSize: 20, 
        padding: 0,
        margin: 4,
    }
});

export default EditEndScreen;