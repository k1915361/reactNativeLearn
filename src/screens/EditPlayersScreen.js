import { ScrollView, StyleSheet, Text, View } from "react-native";
import { get, jsnstringify, keys, setProperties } from '../helpers/helper';

const EditPlayerScreen = ({navigation, route, textInput, path, updateItem, items}) => {

    const update = (value) => updateItem(items, path, value);

    const textInput = (path, onChangeText, placeholder, key, style) => textInputObject(items, path, onChangeText, placeholder, key, style); 

    return (
        <View style={styles.editScreenContainer}>
            <ScrollView style={styles.scrollViewContainer}>
                <Text>{jsnstringify()} </Text>
                <Text style={styles.textLabel}>teamA | teamB</Text>
                <Text style={styles.textLabel}>Players:</Text>
                <View style={styles.textInputRowContainer}>
                    {['A','B'].map(team => 
                        <View key={team} style={''}>
                            {[1,2,3,4].map(num => 
                                textInput(`team${team}.player${num}.name`,'','',num) 
                            )}
                        </View>
                    )}
                </View>
                
            </ScrollView>
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

export default EditPlayerScreen;