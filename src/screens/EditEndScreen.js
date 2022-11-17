import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from "react";
import { setProperties } from "../helpers/helper";

const EditEndScreen = ({navigation}) => {
    

    return(
        <View>
            <View style={styles.textInputRowContainer}>
                <Text>{Number(key)+1} </Text>
                {textInput(`${item}.team`, (val) => handleTeamChange(val))}
                <Text> {getShotEndTeamName(key)}</Text>
                {textInput(`${item}.shot`)}
                <MaterialIcons name='delete' size={24} color='red' onPress={() => deleteEnd(key)} />
                <Pressable style={styles.buttonStyle} onPress={() => {
                    navigation.navigate('Camera', {
                        navigation: navigation,
                        onSetImage: (uri) => addEndImageByKey(uri) 
                    })
                }}>
                    <Text style={styles.textStyle}><MaterialIcons 
                        name='edit' size={24} color='blue' 
                        onPress={() => addEndImageByKey(key, image)} />Edit</Text>
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