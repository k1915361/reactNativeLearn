import { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, Pressable } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

const ListCardScreen = ({navigation}) => {
    const [cards, setCards] = useState(dummyCards);
    
    const addNewCard = (card) => {
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

    useEffect(() => {
        navigation.setOptions({
            headerLeft: ()=> 
                <Pressable onPress={() => navigation.navigate('AddCard', {callback: addNewCard})} >
                    <Text> Add Card
                        <MaterialIcons name='add' size={24} color='black' />
                    </Text>
                </Pressable>
        });
    }, [cards]);


    return (
        <View>
            <FlatList
                data={cards}
                keyExtractor={(e) => e.id.toString()}
                renderItem={({item}) => {
                    return(
                        <Pressable onPress={() => navigation.navigate('ListItem', {
                            id: item.id,
                            competitionName: item.competitionName,
                            rinkNumber: item.rinkNumber,
                            teamNames: item.teamNames,
                            players: item.players,
                            items: item.items,
                            date: item.date.toUTCString()
                        })}>
                            <View style={styles.itemContainer}>
                                <View style={styles.dateContainer}>
                                    <Text style={styles.dateText}>
                                        {item.date.toLocaleDateString()}
                                    </Text>
                                    <Text >
                                        {item.date.toLocaleTimeString()}
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
});

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
        competitionName: 'my competition',
        rinkNumber: 'my rinkNumber',
        teamNames: {},
        players: {},        
        items: {},
        date: new Date()
    }
];

export default ListCardScreen;