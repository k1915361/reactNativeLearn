import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';

const CameraScreen = ({  route }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const { navigation, onSetImage }= route.params;
    let camera;
    
    useEffect(() => { getCameraPermission(); }, []);

    const getPicture = async () => {
        if (camera) {
            const photo = await camera.takePictureAsync();
            const result = await createAsset(photo.uri);
            
            onSetImage(photo.uri);
            navigation.pop();            
            // navigation.navigate('Photo', { 
            //     uri: photo.uri,
            //     onSetImage: (uri) => onSetImage(uri)
            // });
        };
    };

    const createLocalUri = async (uri) => await FileSystem.downloadAsync(uri, FileSystem.documentDirectory + filename);

    const createAsset = async (uri) => await MediaLibrary.createAssetAsync(uri);

    const createAlbum = async (asset) => await MediaLibrary.createAlbumAsync('Download', asset);
    
    const navigateToViewSnappedPhoto = (photo) => navigation.navigate('Photo', { 
        uri: photo.uri,
        onSetImage: (uri) => onSetImage(uri)
    });

    const getCameraPermission = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
    };

    const getMediaPermission = async () => {
        const { status } = await MediaLibrary.getPermissionsAsync();
        setIsAccessMediaLocationEnabled(status === true);
    };

    if (hasPermission === null) {
        return <Text>Awaiting Permission</Text>
    }
    if (hasPermission === false) {
        return <Text>Access denied!</Text>
    }

    return (
        <View style={styles.container}>
            <Camera style={styles.subContainer} ref={(ref) => {camera = ref}}>
                <Pressable style={styles.buttonStyle} onPress={() => {
                    getPicture()
                }}>
                    <Text style={styles.textStyle}>Take a Picture!</Text>
                </Pressable>
            </Camera>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    subContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row-reverse',
        alignItems: 'flex-end',
        // height: 300,
    },
    buttonStyle: {
        flex: 0.1,
        alignItems: 'center',
    },
    textStyle: {
        fontSize: 24,
        marginBottom: 15,
        color: 'white',
        shadowColor:'black',
    },
});

export default CameraScreen;