import { useState } from "react";
import { StyleSheet, View, Text, FlatList, Pressable } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import AddPlayerScreen from "./AddPlayerScreen";

const ListPlayerScreen = ({navigation, route, players, addNewPlayer}) => {
    // const {players:playerss} = route.params; 
    // const [players, setPlayers] = useState(playerss);

    return (
        <View>
            <Pressable onPress={() => navigation.navigate('AddPlayer', {callback: addNewPlayer})}>
                <Text style={styles.font16Bold}>
                    <MaterialIcons name='add' size={24} color='black' />
                    Add Player
                </Text>  
            </Pressable>
            {/* <AddPlayerScreen 
                navigation={navigation}
                callback=''
            /> */}
            <FlatList
                data={players}
                keyExtractor={(e) => e.id.toString()}
                renderItem={({item}) => {
                    return(
                        <Pressable 
                            /*onPress={() => navigation.navigate('ViewPlayer', {
                            id: item.id,                
                            firstName: firstName, 
                            lastName: lastName, 
                        })}*/
                        >
                            <View style={styles.itemContainer}>
                                <View style={styles.dateContainer}>
                                    <Text style={styles.dateText}>
                                        {item.firstName}
                                    </Text>
                                    <Text >
                                        {item.lastName}
                                    </Text>
                                </View>
                            </View>
                        </Pressable>
                    );
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        marginTop: 15,
        padding: 15,
        borderBottomWidth: 1,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateContainer: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    dateText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    titleText: {
        fontSize: 16,
        paddingLeft: 15,
        flex: 1,
        alignSelf: 'flex-start',
    },
    button: {
        backgroundColor: '#3399ff',
        borderRadius: 5,
    },
    viewAllCardsButton: {},
    font16Bold: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    viewAllCardsText: {
        fontsize: 1,
        fontweight: 1,
    },
    addItemText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});



export default ListPlayerScreen;