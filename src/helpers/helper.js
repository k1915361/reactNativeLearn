import * as ImagePicker from 'expo-image-picker';

import { Button, FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

export const head = ([h]) => h;

export const tail = ([, ...t]) => t; 

export const get = (obj, path) => path.split('.').reduce((r, val) => (r ? r[val] : undefined) , obj);

export const textInput = (value, onChangeText, styles = '', placeholder = 'Type Here') => <TextInput 
    style={styles}
    placeholder={placeholder} value={value}
    onChangeText={onChangeText}
/>;

export const setProperties = (obj, path, value) => {
    const [head, ...rest] = path.split('.')

    return {
        ...obj,
        [head]: rest.length
        ? setProperties(obj[head], rest.join('.'), value)
        : value
    }
}

export const renderObj = (obj) => <Text>{jsnstringify(obj)}</Text>;

export const keys = (obj) => Object.keys(obj);

export const jsnstringify = (obj) => JSON.stringify(obj); 

export const typeOf = (obj) => typeof(obj);

export const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
    });    
    if (!result.cancelled) {
        return result.uri;
    }    
};

export const updateObjPropExperiment = (obj, path, val) =>{     
    path = path.split('.');
    return obj[path[0]][path[1]][path[2]] = val;
};

export const accessNestedObjByStringExperiment = (obj, str) =>  {
    str = str.split('.');
    return obj[str[0]][str[1]][str[2]];
};

//{head, tail, get, textInput}