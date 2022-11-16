/* 
https://docs.expo.dev/versions/latest/sdk/imagepicker

2022 Update: use the media-library to save
https://docs.expo.dev/versions/latest/sdk/media-library/#medialibrarygetpermissionsasyncwriteonly

https://docs.expo.dev/versions/latest/sdk/camera/    
*/
import React, { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { jsnstringify } from "../helpers/helper";

const CameraPhotoScreen = ({ navigation, route }) => {
    const [isAccessMediaLocationEnabled, setIsAccessMediaLocationEnabled] = useState(false);
    const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
    const [image, setImage] = useState(null);
    const { uri, onSetImage } = route.params;

    const getAssetInfo = async (asset) => {
        const assetInfo = await MediaLibrary.getAssetInfoAsync(asset);
        return assetInfo;
    }

    const getPermission = async () => {
        const { status } = await MediaLibrary.getPermissionsAsync();
        setIsAccessMediaLocationEnabled(status === true);
    };

    useEffect(() => { getPermission(); }, []);

    useEffect(() => { requestPermission(); }, []);
    
    const getLocalUri = async (uri) => await FileSystem.downloadAsync(uri, FileSystem.documentDirectory + filename);    
    
    const createAsset = async (uri) => await MediaLibrary.createAssetAsync(uri);
    
    const createAlbum = async (asset) => await MediaLibrary.createAlbumAsync('ScoreCardApp', asset);

    const saveImage = async (uri) => {
        const asset = await createAsset(uri);
    }

    return (
        <View style={styles.container}>
            <Image style={styles.imageStyle} source={{ uri: uri }}/>
            {image && <Text style={styles.textStyle}>{uri.substring(0,20)}</Text>}
            {image && <Text style={styles.textStyle}>{jsnstringify(image)}</Text>}
            <Text style={styles.textStyle}></Text>
            <Text style={styles.textStyle}></Text>
            <Pressable style={styles.buttonStyle} onPress={() => {
                    saveImage(uri);
                    onSetImage(uri);
                    navigation.pop();
            }}>
                <Text style={styles.textStyle}>Save</Text>
            </Pressable>
            <Pressable style={styles.buttonStyle} onPress={() => {
                    navigation.pop();
                }}>
                <Text style={styles.textStyle}>Discard</Text>
            </Pressable>
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
    buttonStyle: {
        flex: 0.1,
        alignItems: 'center',
    },
    textStyle: {
        fontSize: 30,
    },
});

export default CameraPhotoScreen;