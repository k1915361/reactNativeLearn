import { useEffect, useState } from "react";
import { Button, Image, StyleSheet, Text, TextInput, View } from "react-native";
import CameraScreen from "./CameraScreen";
import * as ImagePicker from 'expo-image-picker';

const AddShotScreen = ({navigation, route}) => {
    const {teamAname, teamBname, onAddShot } = route.params;    
    const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
    const [image, setImage] = useState(null);
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
            {!image &&
                <View>
                    <Text style={styles.textLabel}>Take a new snap:</Text>
                    <CameraScreen navigation={navigation} 
                        onSetImage={(uri) => onSetImage(uri)} 
                    />
                </View>
            }
            <Text style={styles.textLabel}></Text>
            <Button title="Or Pick an image from folder" onPress={pickImage} />
            {image && <Image style={styles.imageStyle2} source={{ uri: image }} />}
            {image && <Text style={styles.textLabel}>{image}</Text>}
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
                    navigation.pop();
            }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: '20%',
        alignSelf:"center",
    },
    textLabel: {
        fontSize: 20,
    },
    textInputContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
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