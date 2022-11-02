import React, { useContext, useState } from "react";
import { StyleSheet, View, Text, FlatList, Pressable } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

const ListViewScreen = ({navigation, route}) => {
    const { id, competitionName, rinkNumber, teamA, teamB, date, handleUpdate, shots: shotss } = route.params;
    const [shots, setShots] = useState(shotss || {});

    const getName = (team, player) => team?.[player]?.name;
    
    const getValue = (obj, key, key2) => obj?.[key]?.[key2];

    const handleAddShot = (team, shot) => {
        setShots({...shots, [Object.keys(shots).length]: {team, shot}});        
        const newShots = {...shots, [Object.keys(shots).length]: {team, shot}};
        handleUpdate({...route.params, shots: {...newShots}});            
    }

    const playerRowRenderer = (id) => <Text>
        {getName(teamA, (`player${id}`))} {id} {getName(teamB, (`player${id}`))}
    </Text>; 

    const shotsRenderer = () => {
        let totalA = 0;
        let totalB = 0;
        return Object.keys(shots).map(key => {
            const obj = shots[key];
            const shot = obj.shot;
            const team = obj.team;
            const end = Number.parseInt(key)+1;
            const shotA = team === 'teamA' ? shot : 0;
            const shotB = team === 'teamB' ? shot : 0;
            team === 'teamA' ? totalA += shot : totalB += shot;
            return <Text> 
                {shotA}   |    {totalA}     |     {end}    |     {shotB}     |   {totalB}
            </Text>;
        })
    };
    
    const getShotsTotal = () => {
        let totalA = 0;
        let totalB = 0;
        Object.keys(shots).map(key => {
            const shot = shots[key].shot;
            const team = shots[key].team;
            team === 'teamA' ? totalA += shot : totalB += shot;
        });
        return {totalA, totalB};
    };

    const {totalA, totalB} = getShotsTotal();

    return (
         <View style={styles.viewContainer}>  
            <Text>{JSON.stringify({...route.params, shots})} </Text>
            <View style={styles.itemContainer}>
                <Text style={styles.titleText}>Competition: {competitionName} </Text>
                <Text style={styles.dateText}>
                    Date: {new Date(date).toLocaleDateString()}      Rink No: {rinkNumber} 
                </Text>
                <Text style={styles.text}>
                    {teamA?.name} vs {teamB?.name}</Text>
                {playerRowRenderer(1)}
                {playerRowRenderer(2)}
                {playerRowRenderer(3)}
                {playerRowRenderer(4)}
                <Text>Shots | Total | Ends | Shots | Total</Text> 
                {shotsRenderer()}    
                <Text>Total: {totalA} | {totalB}            </Text>
                <Pressable 
                    onPress={() => navigation.navigate('AddShot', {
                    teamAname: teamA?.name,
                    teamBname: teamB?.name,
                    onAddShot: (team, val) => handleAddShot(team, val),
                })}>
                    <Text>
                        <Text style={styles.titleText}>Add Shot</Text>
                        <MaterialIcons name='add' size={24} color='black' />  
                    </Text>
                </Pressable>
                <Pressable 
                    onPress={() => navigation.navigate('EditShot', {
                    onEditShot: (team, val) => handleAddShot(team, val),
                })}>
                    <Text>
                        <Text style={styles.titleText}>Edit Shot</Text>
                        <MaterialIcons name='edit' size={24} color='black' />  
                    </Text>
                </Pressable>
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

let unused = () => <Pressable onPress={() => navigation.navigate('ViewItem', {
    id: item.id,
    title: item.title,
    content: item.content,
    date: item.date.toUTCString()
})}>
</Pressable>

unused = () => <View style={styles.listContainer} >
    <FlatList
        data={{}}
        keyExtractor={(e) => e.id.toString()}
        renderItem={({item}) => {
            return('');
        }}
    />
</View>