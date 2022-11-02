import { useContext, useEffect, useReducer, useState } from "react";
import { StyleSheet, View, Text, FlatList, Pressable } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ItemContext from "../contexts/ItemContext";

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

    return (
        <View>
            <Text>{JSON.stringify(state)}</Text>            
            <FlatList
                data={state} 
                keyExtractor={(e) => e.id}
                renderItem={({item}) => {
                    return(
                        <Pressable onPress={() => navigation.navigate('ListItem', {
                            id: item.id,
                            competitionName: item.competitionName,
                            rinkNumber: item.rinkNumber,
                            teamA: item.teamA,
                            teamB: item.teamB,
                            shots: item.shots,
                            date: new Date(item.date).toUTCString(),
                            handleUpdate: (id, title, content, date) => 
                                handleUpdate(id, title, content, date),
                        })}>
                            <View style={styles.itemContainer}>
                                <View style={styles.dateContainer}>
                                    <Text style={styles.dateText}>
                                        {new Date(item.date).toLocaleDateString()}
                                    </Text>
                                    <Text>
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
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
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
    itemContainer: {
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 4,
        padding: 5,
      marginVertical: 5,
    },
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
    viewAllCardsText: {
        fontSize: 16,
        fontWeight: 'bold',
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