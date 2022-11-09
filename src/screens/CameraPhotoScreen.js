import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import * as MediaLibrary from 'expo-media-library';

const CameraPhotoScreen = ({ route }) => {
    const [isAccessMediaLocationEnabled, setIsAccessMediaLocationEnabled] = useState(false);
    const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
    const { uri } = route.params;

    /* 
    Use the image picker photo library to save and use photos stored on device
    https://docs.expo.dev/versions/latest/sdk/imagepicker

    2022 Update: use the media-library to save
    https://docs.expo.dev/versions/latest/sdk/media-library/#medialibrarygetpermissionsasyncwriteonly
    
    More features of the Camera component
    https://docs.expo.dev/versions/latest/sdk/camera/    
    */
    const getPermission = async () => {
        const { status } = await MediaLibrary.getPermissionsAsync();
        setIsAccessMediaLocationEnabled(status === true);
    };

    useEffect(() => {
        getPermission();
    }, []);

    return (
        <View style={styles.container}>
            <Image style={styles.imageStyle} source={{ uri: uri }}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageStyle: {
        flex: 1,
        alignSelf: 'stretch',
    },
});

export default CameraPhotoScreen;