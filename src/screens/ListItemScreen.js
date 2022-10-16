import { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, Pressable } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

const ListViewScreen = ({navigation, route}) => {
    const [items, setItems] = useState(dummyCard1);
    const {competitionName, rinkNumber, teamNames, players, date: cardDate } = route.params;
    // const [clubName,setClubName] = useState('');
    // const [date, setDate] = useState('');
    // const [competition, setCompetition] = useState('');
    // const [rinkNumber, setRinkNumber] = useState('');
    // const [teams, setTeams] = useState('');
    // const [players, setPlayers] = useState('');
    // const [shots, setShots] = useState(0);
    // const [total, setTotal] = useState(0);

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
            <Pressable onPress={() => navigation.navigate('ListCard', {callback: null})} >
                <Text> View all Cards 
                </Text>
            </Pressable>
    });

    return (
        <View>
            <Text style={''}>{competitionName}</Text>
            <Text style={''}>{rinkNumber}</Text>
            <Text style={''}>{cardDate}</Text>
            <FlatList
                data={items}
                keyExtractor={(e) => e.id.toString()}
                renderItem={({item}) => {
                    return(
                        <Pressable onPress={() => navigation.navigate('ViewItem', {
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

export default ListViewScreen;