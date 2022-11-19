import { useContext, useEffect, useReducer, useState } from "react";
import { StyleSheet, View, Text, FlatList, Pressable } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ItemContext from "../contexts/ItemContext";
import { jsnstringify } from "../helpers/helper";

const ListCardScreen = ({navigation}) => {
    const { state, remove, update } = useContext(ItemContext);

    useEffect(() => {
        navigation.setOptions({
            headerRight: ()=> 
                <Pressable onPress={() => navigation.navigate('AddCard')} 
                    style={styles.viewAllCardsButton}
                    >
                    <Text style={styles.viewAllCardsText}> Add Card 
                        <MaterialIcons name='add' size={24} color='black' />
                    </Text>
                </Pressable>
        });
    }, [state]);

    const handleUpdate = (card) => {
        update(card.id, card);
    }

    const changeItemDateFromat = (item) => item.date = new Date(item.date).toUTCString();;

    const testRender = () => <Text>Test: {state[0]?.id} {state[0]?.teamA?.player1?.name} {state[0]?.shots?.[0]?.shot} </Text>;

    const navigateListItem = (item) => navigation.navigate('ListItem', {
            key: item.id,
            item: item,
            handleUpdate: handleUpdate,
        }
    );

    return (
        <View>
            <Pressable onPress={() => navigation.navigate('SearchApi')} 
                style={styles.viewAllCardsButton}
                >
                <Text style={styles.viewAllCardsText}> Go to Search 
                    <MaterialIcons name='arrow-forward' size={24} color='black' />
                </Text>
            </Pressable>
            <FlatList
                data={state} 
                keyExtractor={(e) => e.id}
                renderItem={({item}) => {
                    changeItemDateFromat(item);
                    return(
                        <Pressable onPress={() => navigateListItem(item)}>
                            <View style={styles.itemContainer}>
                                <View style={styles.dateContainer}>
                                    <Text style={styles.dateText}>
                                        {new Date(item.date).toLocaleDateString()}
                                    </Text>
                                    <Text style={styles.timeText}>
                                        {new Date(item.date).toLocaleTimeString()}
                                    </Text>
                                </View>
                                <Text style={styles.titleText}>
                                    {item.competitionName}          
                                </Text>
                                <Text style={styles.titleText}>
                                    {item.rinkNumber}       
                                </Text>
                                <Text style={styles.titleText}>
                                    {item?.teamA?.name} vs {item?.teamB?.name}
                                </Text>
                                <Pressable
                                    style={styles.removeButton}
                                    onPress={() => {
                                        remove(item.id)
                                    }}>
                                    <MaterialIcons name='delete' size={38} color="red"/>
                                </Pressable>
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
        flex:1,
        borderBottomWidth: 1, 
        alignItems: 'center', 
        flexDirection:'row', 
        flexWrap:'wrap',    
    },
    dateContainer: { 
        alignItems: 'center', 
    },
    dateText: { 
        fontSize: 16, 
        fontWeight: 'bold',
    },
    timeText: { 

    },
    titleText: {
        flex: 1,
        flexDirection: 'row',
        fontSize: 16,
        paddingLeft: 15,
    },
    removeButton: {
        borderRadius: 5,
    },
    button: {
        backgroundColor: '#3399ff',
        borderRadius: 5,
    },
    viewAllCardsButton: {},
    viewAllCardsText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    container: {
        backgroundColor: '#fff',
        marginInTop: 59,
    },
    heading: {
        fontSize: 30,
        fontWeight: 30,
        color: 'green'
    },
    nameText: {
        fontSize: 20,
        color: 'blue',
        marginTop: 10
    },
    img: {
        width: 250,
        height: 250
    },
});

export default ListCardScreen;



let IGNOREallBelow;

const saveAppState = async () => {
    try {     
        const {competitionName, rinkNumber, teamNames, players } = card; 
        const newCard = {
            id: Math.floor(Math.random() * 99999),
            competitionName: competitionName,
            rinkNumber: rinkNumber,
            teamNames: teamNames,
            players: players,
            date: new Date(),
        }
        let updated = [];
        cards == null ? updated = [newCard] : (updated = [...cards, newCard]);  
        let value = JSON.stringify(updated);
        await AsyncStorage.setItem('@cards', value);
    } catch (e) {
        alert(e);
    }
}

const addNewCardDummy = (card) => {
    const {competitionName, rinkNumber, teamNames, players } = card; 
    setCards([
        ...cards,
        {
            id: Math.floor(Math.random() * 99999),
            competitionName: competitionName,
            rinkNumber: rinkNumber,
            teamNames: teamNames,
            players: players,
            date: new Date(),
        }
    ])
}

const clearCards = async () => {
    await AsyncStorage.clear();
};

const mountCards = async () => {
    try {
        const cards = await AsyncStorage.getItem(`@cards`);
        setCards(JSON.parse(cards));
    } catch(e) {
      alert(e);
    }
}

const getCards = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(`@cards`);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      alert(e);
    }
}

const removeCard = async (id) => {
    try {
      const cards = await AsyncStorage.getItem(`@cards`);
      cards.forEach((obj) => {
        delete obj.a
      });
      alert(cards);
      await AsyncStorage.setItem(`@cards`, cards);
    } catch(e) {
      alert(e);
    }
}