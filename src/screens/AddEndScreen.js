import { useEffect, useState } from "react";
import { Button, Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import CameraScreen from "./CameraScreen";
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { renderObj } from "../helpers/helper";

const AddShotScreen = ({navigation, route}) => {
    const {teamAname, teamBname, onAddShot } = route.params;    
    const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
    const [image, setImage] = useState('');
    const [shotA, setShotA] = useState(0);
    const [shotB, setShotB] = useState(0);
    
    const getTeam = () => shotA ? 'teamA' : 'teamB';
    
    useEffect(() =>{
        requestPermission();
    },[])    

    const getFirstAsset = (result) => result.assets[0].uri;

    const getAsset = (result) => result.uri || result.assets[0].uri;

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
        });    
        if (!result.cancelled) {
            setImage(result.uri);
        }    
    };    
    
    const onSetImage = (uri) => setImage(uri);
    
    return (
        <View style={styles.container} >
            <Text style={styles.textLabel}>getTeamName</Text>
                <Pressable 
                    onPress={() => navigation.navigate('Camera', {
                        navigation: navigation,
                        onSetImage: async (uri) => setImage(await uri),
                    })}
                    style={styles.buttonStyle}
                >
                    <Text style={styles.textStyle}>
                        Take a Snap 
                        <MaterialIcons name='camera' size={24} color='black' />
                    </Text>
                </Pressable>
            <View>
            </View>
            <Text style={styles.textLabel}></Text>
            <Button title="Pick an image" onPress={pickImage} />
            {image && <Image style={styles.imageStyle2} source={{ uri: image }} />}
            {image && renderObj(image.substring(0,300))}
            <Text style={styles.textLabel}></Text>
            <Text style={styles.textLabel}>Enter your shot:</Text>
            <View style={styles.textInputContainer}>
                <TextInput style={styles.textInput}
                    placeholder={teamAname} value={shotA}
                    onChangeText={(text) => { 
                        setShotA(text); 
                        setShotB(0);
                    }}
                />
                <TextInput style={styles.textInput}
                    placeholder={teamBname} value={shotB}
                    onChangeText={(text) => { 
                        setShotB(text); 
                        setShotA(0);
                    }}
                />
            </View>
            <Text>{getTeam()} {parseInt(shotA || shotB)}</Text>
            <Button title='Submit Item' 
                disabled={Number(shotA) === 0 && Number(shotB) === 0 && true}
                onPress={() => {
                    onAddShot( {team: getTeam(), shot: parseInt(shotA || shotB), image: image});
                    navigation.popToTop();
            }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    textLabel: {
        fontSize: 20,
    },
    textInputContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    textStyle: {
        fontSize: 30,
    },
    buttonStyle: {
        flex: 0.1,
        alignItems: 'center',
    },
    textInput: {
        borderColor: 'black',
        borderWidth: 1,
        marginBottom: -1,
        height: 80,
        textAlign: "center",      
        borderRadius: 10,
        fontSize: 20,
        width: '50%',
    },
    imageStyle: {
        flex: 1,
        alignSelf: 'stretch',
    },
    imageStyle2: {
        width: 200, 
        height: 200
    },
    addButton: {
        height: 150,
    },
});

export default AddShotScreen;