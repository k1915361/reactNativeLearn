import { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, Pressable } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

const ListViewScreen = ({navigation}) => {
    const [items, setItems] = useState(dummyCard1);
    const [cards, setCards] = useState(dummyCards);
    const [clubName,setClubName] = useState('');
    const [date, setDate] = useState('');
    const [competition, setCompetition] = useState('');
    const [rinkNo, setRinkNo] = useState('');
    const [teams, setTeams] = useState('');
    const [players, setPlayers] = useState('');
    const [shots, setShots] = useState(0);
    const [total, setTotal] = useState(0);

    const addNewItem = (title, content) => {
        setItems([
            ...items,
            {
                id: Math.floor(Math.random() * 99999),
                title: title,
                content: content,
                date: new Date()
            }
        ]);
    }

    const addNewCard = (card) => {
        const {competitionName, date, rinkNo, teamNames, players } = card; 
        setCards([
            ...cards,
            {
                id: Math.floor(Math.random() * 99999),
                competitionName: competitionName,
                date: date,
                rinkNo: rinkNo,
                teamNames: teamNames,
                players: players,
                date: new Date(),
            }
        ])
    }

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => 
                <Pressable onPress={() => navigation.navigate('AddItem', {callback: addNewItem})} >
                    <Text> Add Item
                        <MaterialIcons name='add' size={24} color='black' />
                    </Text>
                </Pressable>                
        })
    }, [items]);

    navigation.setOptions({
        headerLeft: ()=> 
            <Pressable onPress={() => navigation.navigate('AddCard', {callback: addNewCard})} >
                <Text> Add Card
                    <MaterialIcons name='add' size={24} color='black' />
                </Text>
            </Pressable>
    });

    return (
        <View>
            <FlatList
                data={items}
                keyExtractor={(e) => e.id.toString()}
                renderItem={({item}) => {
                    return(
                        <Pressable onPress={() => navigation.navigate('View', {
                            id: item.id,
                            title: item.title,
                            content: item.content,
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
                                <Text style={styles.titleText}>{item.title}</Text>
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
        title: 'This is my first item',
        content: '... content ...',
        date: new Date()
    }, {
        id: -2,
        title: 'This is my second item',
        content: '... content ...',
        date: new Date()
    }
];

const dummyCards = [
    dummyCard1
];

export default ListViewScreen;