import { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, Pressable, Button } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import ListPlayerScreen from './ListPlayerScreen';

const ListViewScreen = ({navigation, route}) => {
    const {competitionName, rinkNumber, teamNames, players: playerss, items: itemss, date: cardDate } = route.params;
    const [items, setItems] = useState(itemss);
    const [players, setPlayers] = useState(playerss);
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

    const addNewPlayer = (firstName, lastName) => {
        console.log(firstName, lastName)
        setPlayers([
            ...players,
            {
                id: Math.floor(Math.random() * 99999),
                firstName: firstName, 
                lastName: lastName, 
            }
        ]);
    };

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => 
                <Pressable onPress={() => navigation.navigate('AddItem', {callback: addNewItem})} >
                    <Text style={styles.addItemText}> Add Item
                        <MaterialIcons name='add' size={24} color='black' />
                    </Text>
                </Pressable>                
        })
    }, [items]);

    navigation.setOptions({
        headerLeft: ()=> 
            <Pressable onPress={() => navigation.navigate('ListCard', {callback: null})} 
                style={styles.viewAllCardsButton} >
                <Text style={styles.viewAllCardsText}> 
                    <MaterialIcons name='arrow-back' size={24} color='black' /> 
                    go back 
                </Text>
            </Pressable>
    });

    return (
        <View>
            <Text style={''}>Competition Name: {competitionName}</Text>
            <Text style={''}>Rink No: {rinkNumber}</Text>
            <Text style={''}>Players:</Text>  
            <ListPlayerScreen 
                navigation={navigation}
                players={players} 
                addNewPlayer={(firstname, lastname) => addNewPlayer(firstname, lastname)}
            />
            <Text style={''}>Items:</Text>  
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

export default ListViewScreen;