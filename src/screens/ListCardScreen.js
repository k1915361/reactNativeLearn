import { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, Pressable } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ListCardScreen = ({navigation}) => {
    const [cards, setCards] = useState([]);
    
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

    const addNewCard = async (card) => {
        try {     
            const cards = await getCards();
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
            mountCards();
        } catch (e) {
            alert(e);
        }
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

    useEffect(() => {
        mountCards();
    }, []);
      
    useEffect(() => {
        navigation.setOptions({
            headerRight: ()=> 
                <Pressable onPress={() => navigation.navigate('AddCard', {callback: addNewCard})} 
                    style={styles.viewAllCardsButton}>
                    <Text style={styles.viewAllCardsText}> Add Card 
                        <MaterialIcons name='add' size={24} color='black' />
                    </Text>
                </Pressable>
        });
    }, [cards]);

    return (
        <View>
            <FlatList
                data={cards}
                keyExtractor={(e) => e.id}
                renderItem={({item}) => {
                    return(
                        <Pressable onPress={() => navigation.navigate('ListItem', {
                            id: item.id,
                            competitionName: item.competitionName,
                            rinkNumber: item.rinkNumber,
                            teamNames: item.teamNames,
                            players: item.players,
                            items: item.items,
                            date: new Date(item.date).toUTCString()
                        })}>
                            <View style={styles.itemContainer}>
                                <View style={styles.dateContainer}>
                                    <Text style={styles.dateText}>
                                        {new Date(item.date).toLocaleDateString()}
                                    </Text>
                                    <Text >
                                        {new Date(item.date).toLocaleTimeString()}
                                    </Text>
                                </View>
                                <Text style={styles.titleText}>
                                    {item.competitionName}
                                </Text>
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

const dummyPlayers1 = [
    {
        id: -1,
        firstName: 'Ace', 
        lastName: 'Ary', 
    }, 
    {
        id: -2,
        firstName: 'Bob', 
        lastName: 'Boris', 
    }, 
];
const dummyPlayers2 = [
    {
        id: -1,
        firstName: 'Cacey', 
        lastName: 'Carly', 
    }, 
    {
        id: -2,
        firstName: 'Drake', 
        lastName: 'Drone', 
    }, 
];

const dummyCard1 = [
    {
        id: -1,
        title: 'my first item',
        content: 'my content ...',
        date: new Date()
    }, {
        id: -2,
        title: 'my second item',
        content: '... content ...',
        date: new Date()
    }
];

const dummyCards = [
    {
        id: -1,
        competitionName: 'competition ABC',
        rinkNumber: 1,
        teamNames: {},
        players: dummyPlayers1,        
        items: dummyCard1,
        date: new Date()
    }
];

export default ListCardScreen;