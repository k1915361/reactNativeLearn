import { useContext, useState } from "react";
import { Button, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import ItemContext from "../contexts/ItemContext";
import { get, jsnstringify, keys, setProperties } from '../helpers/helper';
import { MaterialIcons } from '@expo/vector-icons';
import EditEndScreen from "./EditEndScreen";
import TextInput from "../components/TextInput";

const EditItemScreen = ({navigation, route}) => {
    const {state, update} = useContext(ItemContext);
    const { onEditShot } = route.params;
    const [items, setItems] = useState(route.params.items || []);
    const [shots, setShots] = useState(items.shots || []);
    const [image, setImage] = useState('');
    const { id } = items;
    const currentEntry = state.find((e) => e.id === id);
    
    const updateItem = (path, value) => {
        setItems(setProperties(items, path, value)); 
        setShots(items.shots)
    };

    const handleShotsUpdate = () => setShots(items.shots);

    const textInputObject = (obj, path, onChangeText, placeholder, style) => 
    <TextInput 
        value={String(get(obj, path))} 
        onChangeText={onChangeText || (val => updateItem(path, val))}
        style={style} 
        placeholder={placeholder} 
    />;  

    const textInput = (path, onChangeText, placeholder, style) => textInputObject(items, path, onChangeText, placeholder, style); 

    return (
        <View style={styles.editScreenContainer}>
            <ScrollView style={styles.scrollViewContainer}>
                <Text style={styles.textLabel}>items id: {items?.id}</Text>
                {image && <Image style={styles.thumbnailStyle} resizeMode='repeat' source={{ uri:image }} /> }
                <Text style={styles.textLabel}>Competition Name:</Text>
                {textInput('competitionName')}
                <Text style={styles.textLabel}>Rink Number:</Text>
                {textInput('rinkNumber')}
                <Text style={styles.textLabel}>Team Name:</Text>
                <View style={styles.textInputRowContainer}>
                    {textInput('teamA.name')}
                    {textInput('teamB.name')}
                </View>
                <Text style={styles.textLabel}>teamA | teamB</Text>
                <Text style={styles.textLabel}>Players:</Text>
                <View style={styles.textInputRowContainer}>
                    {['A','B'].map(team => 
                        <View key={team}> 
                        {[1,2,3,4].map(num => 
                            textInput(`team${team}.player${num}.name`) 
                        )}
                        </View>
                    )}
                </View>
                <Text style={styles.textLabel}>EndNo | TeamName | Score: </Text>
                {keys(shots).map(key => 
                    <EditEndScreen 
                        key={key} 
                        keyy={key} 
                        shot={items[key]} 
                        items={items} 
                        textInput={textInput} 
                        textInputObject={textInputObject} 
                        setItems={setItems} 
                        setImage={setImage} 
                        navigation={navigation}
                    />
                )}
            </ScrollView>
            <Button title='Save Edit' 
                style={styles.button}
                onPress={() => {
                    // update(currentEntry.id, items, () => navigation.pop());
                    onEditShot(items);
                    navigation.pop();
            }} />
        </View>
    )
}

const styles = StyleSheet.create({
    editScreenContainer: {
        top: 0,
        width: '100%',
        flex: 1,
        bottom: 30,
    },
    scrollViewContainer: {
        // width: '100%',
        // height: '90%',
    },
    itemsText: {
        fontSize: 14,
    },
    button: {
        bottom: 0,
        marginBottom: 0,
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
        marginBottom: 0, 
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