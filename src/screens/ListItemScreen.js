import React, { useContext, useState } from "react";
import { StyleSheet, View, Text, FlatList, Pressable } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import ItemContext  from '../contexts/ItemContext'; 

const ListViewScreen = ({navigation, route}) => {
    const { id, competitionName, rinkNumber, teamA, teamB, date, handleUpdate, shots: shotss } = route.params;
    const [shots, setShots] = useState(shotss || {});

    const getName = (team, player) => team?.[player]?.name;
    
    const getValue = (obj, key, key2) => obj?.[key]?.[key2];

    const handleAddShot = (team, shot) => {
        setShots({...shots, [Object.keys(shots).length]: {team, shot}});
        handleUpdate({...route.params, shots});            
    }

    const playerRowRenderer = (id) => <Text>
        {getName(teamA, (`player${id}`))} {id} {getName(teamB, (`player${id}`))}
    </Text>; 

    return (
         <View style={styles.viewContainer}>  
            <Text>{JSON.stringify({...route.params, shots})} </Text>
            <View style={styles.itemContainer}>
                <Text style={styles.titleText}>Competition: {competitionName} </Text>
                <Text style={styles.dateText}>
                    Date: {new Date(date).toLocaleDateString()}      Rink No: {rinkNumber} 
                </Text>
                <Text style={styles.text}>
                    {teamA && teamA.name} vs {teamB && teamB.name}</Text>
                {playerRowRenderer(1)}
                {playerRowRenderer(2)}
                {playerRowRenderer(3)}
                {playerRowRenderer(4)}
                <Text>Shots | Total | Ends | Shots | Total</Text>     
                <Text>{Object.keys(shots).length}</Text>
                <Text>{JSON.stringify(shots)}</Text>
                <Pressable onPress={() => navigation.navigate('AddShot', {
                    teamAname: teamA && teamA.name,
                    teamBname: teamB && teamB.name,
                    onChangeShot: (team, val) => handleAddShot(team, val),
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