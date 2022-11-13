import React, { useContext, useState } from "react";
import { StyleSheet, View, Text, FlatList, Pressable, ScrollView, Image, Button } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { jsnstringify, keys } from "../helpers/helper";
import ViewImageScreen from "./ViewImageScreen";
import NavButton from "../components/NavButton";

const ListViewScreen = ({navigation, route}) => {
    const { id, competitionName, rinkNumber, teamA, teamB, date, handleUpdate, shots: shotss } = route.params;
    const [shots, setShots] = useState(shotss || {});

    const getName = (team, player) => team?.[player]?.name;
    
    const handleAddShot = (shot) => {
        const newShots = {...shots, [keys(shots).length]: {...shot}};
        setShots(newShots);        
        handleUpdate({...route.params, shots: {...newShots || {}}});            
    }
    
    const handleEditShot = (value) => {
        const newShots = {...shots, value};
        setShots(newShots); 
        handleUpdate({...route.params, shots: {...newShots || {}}});            
    }

    const playerRowRenderer = (id) => <Text>
        {getName(teamA, (`player${id}`))} {id} {getName(teamB, (`player${id}`))}
    </Text>; 

    const getNavButton = (screenName, params) => <NavButton screenName={screenName} navigation={navigation} params={params} />

    const endRowRenderer = (end,shotA,shotB,image) => 
        <Text style={styles.endText}> 
            {end} 
            <Text style={styles.shotText}>
                {shotA}:{shotB}
            </Text>
            {image && getNavButton('View Image', {image: image} )}
            {image && getImageRenderer(image)}
        </Text>;

    const getImageRenderer = (image) => <Image style={styles.thumbnailStyle} source={{ uri:image }} resizeMode='cover' />

    const getShotData = (obj) => {
        const shot = obj.shot;
        const team = obj.team;
        const shotA = team === 'teamA' ? shot : 0;
        const shotB = shotA ? 0 : shot;
        return { shotA, shotB };
    }; 

    const getEndNumber = (key) => Number(key)+1;

    const getEndImageByKey = (key) => shots[key]?.image || '';

    const shotsRenderer = () => {
        return keys(shots)?.map(key => {
            const { shotA, shotB } = getShotData(shots[key]);
            return endRowRenderer(getEndNumber(key), shotA, shotB, getEndImageByKey(key));
        });
    };
    
    const getShotsTotal = () => {
        let totalA = 0;
        let totalB = 0;
        Object.keys(shots).map(key => {
            const shot = shots[key].shot;
            const team = shots[key].team;
            team === 'teamA' ? totalA += parseInt(shot) : totalB += parseInt(shot);
        });
        return {totalA, totalB};
    };

    const {totalA, totalB} = getShotsTotal();

    return (
         <ScrollView style={styles.viewContainer}>  
            <View style={styles.itemContainer}>
                <Text style={''}>{jsnstringify()}</Text>
                <Text style={''}>Competition:  
                    <Text style={styles.titleText}> {competitionName} </Text>
                </Text>
                <Text style={styles.dateText}>
                    Date: {new Date(date).toLocaleDateString()}      Rink No: {rinkNumber} 
                </Text>
                <Text style={styles.text}>
                    {teamA?.name} vs {teamB?.name}</Text>
                {[1,2,3,4].map(i => playerRowRenderer(i))}
                <Text style={''}> Ends: </Text> 
                {shotsRenderer()}    
                <Text style={''}> {jsnstringify()} </Text> 
                <Text style={''}>Total: <Text style={styles.totalText}>{totalA}:{totalB}</Text> </Text>
                <Text style={''}></Text>
                <Pressable 
                    onPress={() => navigation.navigate('AddShot', {
                    teamAname: teamA?.name,
                    teamBname: teamB?.name,
                    onAddShot: (team, val) => handleAddShot(team, val),
                })}>
                    <Text style={styles.button}>
                        <Text style={styles.titleText}> Add Shot </Text>
                        <MaterialIcons name='add' size={24} color='black' />  
                    </Text>
                </Pressable>
                <Pressable 
                    onPress={() => navigation.navigate('EditItem', {
                    items: {...route.params},
                    onEditShot: (val) => handleEditShot(val),
                })}>
                    <Text style={styles.button}>
                        <Text style={styles.editText}> Edit Items </Text>
                        <MaterialIcons name='edit' size={24} color='black' />  
                    </Text>
                </Pressable>
            </View> 
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    viewContainer: {
        bottom: 0,
        left:0,
        right:0,
    },
    listContainer: {
    },
    thumbnailStyle: {
        width: 60,
        height: 60,
        scale: 0.01,
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
    defaultText: {
        fontSize: 14,
    },
    endText: {
        fontSize: 8,
    },
    shotText: {
        fontSize: 20,
    },
    totalText: {
        fontSize: 30,
    },
    editText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    titleText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    button: {
        padding: 30,
        backgroundColor: '#55aaee',
        borderRadius: 100,
        marginVertical: 3,
        color:'black',
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