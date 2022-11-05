import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

const AddShotScreen = ({navigation, route}) => {
    const {teamAname, teamBname, onAddShot } = route.params;

    const [shotA, setShotA] = useState(0);
    const [shotB, setShotB] = useState(0);

    return (
        <View style={styles.container}>
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
            <Text>{shotA === 0 && shotB === 0}</Text>
            <Text>{typeof(shotA)} {typeof(shotB)}</Text>
            <Button title='Submit Item' 
                disabled={Number(shotA) === 0 && Number(shotB) === 0 && true}
                onPress={() => {
                    onAddShot(shotA ? 'teamA': 'teamB', parseInt(shotA) || parseInt(shotB));
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
    addButton: {
        height: 150,
    },
});

export default AddShotScreen;