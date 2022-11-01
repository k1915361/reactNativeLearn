import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, Pressable, Button } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import ItemContext  from '../contexts/ItemContext'; 

const ListViewScreen = ({navigation, route}) => {
    const { state, remove } = useContext(ItemContext);
    const { id, competitionName, rinkNumber, teamA, teamB, date, handleUpdate, shots: shotss } = route.params;
    const [shots, setShots] = useState(shotss || {});

    const handleAddShot = (team, shots) => {
        setShots({...shots, [Object.keys(shots).length+1]: {team, shots}});
        handleUpdate(id, competitionName, shots, date);            
    }

    return (
        <View>
        {teamA && 
         <View style={styles.viewContainer}>  
            <View style={styles.itemContainer}>
                <Text style={styles.titleText}>Competition: {competitionName} </Text>
                <Text style={styles.dateText}>
                    Date: {new Date(date).toLocaleDateString()}      Rink No: {rinkNumber} 
                </Text>
                <Text style={styles.text}>
                    {teamA && teamA.name} vs {teamB && teamB.name}</Text>
                <Text>
                    {teamA.player1.name} 1 {teamB.player1.name}   
                </Text>
                <Text>
                    {teamA.player2.name} 2 {teamB.player2.name}   
                </Text>
                <Text>
                    {teamA.player3.name} 3 {teamB.player3.name}   
                </Text>
                <Text>
                    {teamA.player4.name} 4 {teamB.player4.name}   
                </Text>
                <Text>Shots | Total | Ends | Shots | Total</Text>     
                <Text>{Object.keys(shots).length}</Text>
                <Text>{JSON.stringify(shots)}</Text>
                <Pressable onPress={() => navigation.navigate('AddShot', {
                    teamAname: teamA && teamA.name,
                    teamBname: teamB && teamB.name,
                    onChangeShot: (team, obj) => handleAddShot(team, obj),
                })}>
                    <Text>
                        <Text>Add Shot</Text>
                        <MaterialIcons name='add' size={24} color='black' />  
                    </Text>
                </Pressable>                               
            </View>
            <Pressable onPress={() => navigation.navigate('ViewItem', {
                id: item.id,
                title: item.title,
                content: item.content,
                date: item.date.toUTCString()
            })}>
            </Pressable>
            <View style={styles.listContainer} >
                <FlatList
                    data={{}}
                    keyExtractor={(e) => e.id.toString()}
                    renderItem={({item}) => {
                        return('');
                    }}
                />
            </View>
    </View>
    }
    </View>
    );
};

const styles = StyleSheet.create({
    viewContainer: {
        bottom: 0,
    },
    listContainer: {
    },
    itemContainer: {
        fontSize: 50,
        marginTop: 15,
        padding: 15,
        borderBottomWidth: 1,
        alignItems: 'center',
        maxWidth: '100%',
    },
    dateContainer: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    dateText: {
        fontSize: 16,
    },
    titleText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#3399ff',
        borderRadius: 5,
    },
    addItemText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ListViewScreen;

const goBackCardsScreen = () => {
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
};