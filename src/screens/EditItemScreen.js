import { useContext, useState } from "react";
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import ItemContext from "../contexts/ItemContext";
import { get, setProperties } from '../helpers/helper';

const EditItemScreen = ({navigation, route}) => {
    const { id, shots } = route.params.items;

    const {state, update} = useContext(ItemContext);
    const currentEntry = state.find((e) => e.id ===id);
    const [items, setItems] = useState(route.params.items);
    
    const textInputRender = (value, onChangeText, style = styles.textInput, placeholder = 'Type Here') => <TextInput 
        style={style} placeholder={placeholder} 
        value={value} onChangeText={onChangeText}
    />;  

    const textInput = (obj, path, style) => 
         textInputRender(
            String(get(obj, path)), 
            val => setItems(setProperties(obj, path, val)),
            style
    ); 
    
    const textInputOnChangeText = (obj, path, onChangeText, style) => 
         textInputRender(
            String(get(obj, path)), 
            onChangeText,
            style
    ); 

    const handleTeamChange = (val, key) => 
        setItems(
            setProperties(items, 
                `shots.${key}.team`, 
                val.includes('teamA') ? 'teamB': 'teamA' )
    ); 

    return (
        <ScrollView style={styles.editScreenContainer}>
            <Text>{ }</Text>
            <Text style={styles.textLabel}>Competition Name:</Text>
            {textInput(items, 'competitionName')}
            <Text style={styles.textLabel}>Rink Number:</Text>
            {textInput(items, 'rinkNumber')}
            <Text style={styles.textLabel}>Players:</Text>
            <View style={styles.textInputRowContainer}>
                {['A','B'].map(team => 
                    <View style={''}>
                        {[1,2,3,4].map(num => 
                            textInput(items, `team${team}.player${num}.name`)
                        )}
                    </View>
                )}
            </View>
            <Text style={styles.textLabel}>Ends (Team Name - Score): </Text>
            {Object.keys(shots).map(key => {
                return (
                    <View>
                        <View style={styles.textInputRowContainer}>
                            <Text>{Number(key)+1}</Text>
                            {/* {textInput(items, `shots.${key}.team`)} */}
                            {textInputOnChangeText(items, `shots.${key}.team`, (val) => handleTeamChange(val, key))}
                            {textInput(items, `shots.${key}.shot`)}
                        </View>
                    </View>
                );
            })}
            <Button title='Save Edit' onPress={() => {
                update(currentEntry.id, items, () => navigation.popToTop());
            }} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    editScreenContainer: {
        alignContent:"center",
        alignSelf:"center",
    },
    itemsText: {
        fontSize: 14,
    },
    textLabel: {
        padding: 0,
        textAlign: "center",
    },
    textInputRowContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap', 
    },
    textInputColumnContainer: {
        flexDirection: 'column',
        flexWrap: 'wrap', 
    },
    textInput: {
        borderColor: 'grey',
        borderWidth: 0.4,
        paddingHorizontal: 0,
        marginBottom: -1, 
        borderRadius: 10, 
        textAlign: "center",
        paddingHorizontal: 60, 
        // paddingVertical: 0, 
        height: 40, 
        fontSize: 20, 
        padding: 0,
        margin: 4,
        // width: 'null', 
    },
});

export default EditItemScreen;