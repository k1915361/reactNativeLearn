import { useContext, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import ItemContext from "../contexts/ItemContext";

const AddShotScreen = ({navigation, route}) => {
    const {create} = useContext(ItemContext);
    const {teamAname, teamBname, onChangeShot } = route.params;
    const [shotA, setShotA] = useState(0);
    const [shotB, setShotB] = useState(0);

    return (
        <View>
            <Text style={styles.textLabel}>Enter your shot:</Text>
            <View style={styles.textInputContainer}>
                <TextInput style={styles.textInput}
                    placeholder='TeamA' value={shotA}
                    onChangeText={(text) => { 
                        setShotA(text); 
                        setShotB(0);
                    }}
                />
                <TextInput style={styles.textInput}
                    placeholder='TeamB' value={shotB}
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
                    onChangeShot(shotA ? 'teamA': 'teamB', parseInt(shotA) || parseInt(shotB));
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