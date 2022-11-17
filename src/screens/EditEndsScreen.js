import { Button, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from "react";
import { jsnstringify, pickImage, renderObj, setProperties } from "../helpers/helper";

const EditEndScreen = ({navigation, items, image, keyy: key, textInput, setItems}) => {
    const teamNames = {'teamA': items.teamA.name,'teamB': items.teamB.name};
    const endPath = `shots.${key}`;
    const teamPath = `${endPath}.team`;
    const imagePath = `${endPath}.image`;
    const shotPath = `${endPath}.shot`;
    const end = items.shots[key];
    const team = end.team;
    const teamName = teamNames[team];

    const textInputOnChangeText = (value, onChangeText) => 
        textInputRender(value, onChangeText);     

    const deleteEndByKey = (key) => delete items.shots[key];
    
    const deleteEnd = (key) => deleteEndByKey(key);
    
    const updateItem = (path, value) => setItems(setProperties(items, path, value));

    const addEndImage = (image) => updateItem(imagePath, image);
    
    const addEndImage2 = (image) => end.image = image;

    const getTeamChange = (val) => val.includes('teamA') ? 'teamB': 'teamA';

    const handleTeamChange = (val) => updateItem( 
        teamPath, val.includes('teamA') ? 'teamB': 'teamA' 
    ); 

    const handleChangeTeam = () => updateItem(teamPath, (items.shots[key].team === 'teamA' ? 'teamB' : 'teamA'));
    
    const handleChangeTeamTest = () => end.team === 'teamA' ? 'teamB' : 'teamA';

    const getTeamName = () => teamNames[end.team];
    
    return(
        <ScrollView horizontal={true}>
            <View style={styles.textInputRowContainer}>      
                {renderObj()}
                <Text>{Number(key)+1} </Text>
                <Button onPress={() => handleChangeTeam()} title='swap team'></Button> 
                {/* <Button onPress={() => handleChangeTeamTest()} title={getTeamName()}></Button>  */}
                {/* {textInput(teamPath, (val) => handleTeamChange(val))} */}
                <Text> {teamName}</Text>
                {textInput(shotPath,null,null,styles.scoreTextField)}
                <MaterialIcons name='delete' size={40} color='red' onPress={() => deleteEnd(key)} />
                <Pressable style={styles.buttonStyle} onPress={() => {
                    navigation.navigate('Camera', {
                        navigation: navigation,
                        onSetImage: (uri) => {addEndImage(uri);} 
                    })
                }}>
                    {!image && <Text style={styles.textStyle}>
                        <MaterialIcons 
                            name='camera' size={40} color='black' 
                            onPress={() => addEndImage(image)} 
                            />
                        Add Photo
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