import { useContext, useState } from "react";
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import ItemContext from "../contexts/ItemContext";
import { get, keys, setProperties } from '../helpers/helper';
import { MaterialIcons } from '@expo/vector-icons';

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

    const getTeamName = (team) => items?.[team === 'teamA' ? 'teamA' : 'teamB']?.name;

    const handleTeamChange = (val, key) => 
        setItems(
            setProperties(items, 
                `shots.${key}.team`, 
                val.includes('teamA') ? 'teamB': 'teamA' )
    ); 

    const deleteEnd = (key) => {
        console.log('before', items.shots[key]);
        delete items.shots[key];
        console.log('after', items.shots[key]);
        setItems(
            items
        );
    }

    return (
        <ScrollView style={styles.editScreenContainer}>
            <Text>{getTeamName('teamA') }</Text>
            <Text style={styles.textLabel}>Competition Name:</Text>
            {textInput(items, 'competitionName')}
            <Text style={styles.textLabel}>Rink Number:</Text>
            {textInput(items, 'rinkNumber')}
            <Text style={styles.textLabel}>Team Name:</Text>
            <View style={styles.textInputRowContainer}>
                {textInput(items, 'teamA.name')}
                {textInput(items, 'teamB.name')}
            </View>
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
            <Text style={styles.textLabel}>Ends | TeamName | Score: </Text>
            {keys(items.shots).map(key => {
                return (
                    <View>
                        <View style={styles.textInputRowContainer}>
                            <Text>{Number(key)+1}</Text>
                            {textInputOnChangeText(items, `shots.${key}.team`, (val) => handleTeamChange(val, key))}
                            {textInput(items, `shots.${key}.shot`)}
                            <MaterialIcons name='delete' size={24} color='red' onPress={(key) => deleteEnd(key)} />
                        </View>
                    </View>
                );
            })}
                <Button title='Save Edit' 
                    onPress={() => {
                        update(currentEntry.id, items, () => navigation.popToTop());
                }} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    editScreenContainer: {
        width: '100%',
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
        alignSelf:"center",
    },
    textInput: {
        alignSelf:"center",
        borderColor: 'grey',
        borderWidth: 0.4,
        paddingHorizontal: 0,
        paddingHorizontal: 0,
        paddingVertical: 0,
        marginVertical: 0, 
        marginBottom: -1, 
        borderRadius: 0, 
        textAlign: "center",
        paddingHorizontal: 0,
        maxWidth: 100, 
        width: 100, 
        height: 40, 
        fontSize: 20, 
        padding: 0,
        margin: 4,
    },
});

export default EditItemScreen;