import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

const AddShotScreen = ({navigation, route}) => {
    const {teamAname, teamBname, onAddShot } = route.params;
    const [shotA, setShotA] = useState(0);
    const [shotB, setShotB] = useState(0);

    return (
        <View>
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
            <Text>{shotA} {shotB}</Text>
            <Text>{shotA || shotB}</Text>
            <Text>{shotA ? 'teamA': 'teamB'}</Text>
            <Button title='Submit Item' 
                onPress={() => {
                    onAddShot(shotA ? 'teamA': 'teamB', parseInt(shotA) || parseInt(shotB));
                    navigation.pop();
            }} />
        </View>
    )
}

const styles = StyleSheet.create({
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
        paddingHorizontal: 0,
        marginBottom: -1,
        borderRadius: 1,
        height: 50,       
        fontSize: 20,
        display: 'flex', 
        width: '50%',
    },

});

export default AddShotScreen;