import { useState } from "react";
import { StyleSheet, View, Text, Pressable, Image } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { jsnstringify, keys } from "../helpers/helper";
import ViewEndScreen from "./ViewEndScreen";

const ListViewScreen = ({navigation, route}) => {
    const { id, competitionName, rinkNumber, teamA, teamB, date, handleUpdate, shots: shotss } = route.params;
    const [shots, setShots] = useState(shotss || {});

    const getName = (team, player) => team?.[player]?.name;
    
    const handleAddShot = (shot) => {
        const newShots = {...shots, [keys(shots).length]: {...shot}};
        setShots(newShots);        
        handleUpdate({...route.params, shots: {...newShots || {}}});            
        console.log('test '+shot);
    };
    
    const handleEditShot = (value) => {
        const newShots = {...shots, value};
        setShots(newShots); 
        handleUpdate({...route.params, shots: {...newShots || {}}});            
    };

    const playerRowRenderer = (id) => <Text style={styles.informationText}>
        {getName(teamA, (`player${id}`))} | {id} | {getName(teamB, (`player${id}`))}
    </Text>; 

    const getImageRenderer = (image) => <Image style={styles.thumbnailStyle} resizeMode='repeat' source={{ uri:image }} />

    const getShotsTotal = () => {
        let totalA = 0, totalB = 0;
        keys(shots).map(key => {
            shots[key].team === 'teamA' ? 
                totalA += parseInt(shots[key].shot) : 
                totalB += parseInt(shots[key].shot);
        });
        return {totalA, totalB};
    };

    const getSum = (obj) => obj.reduce((acc, val) => acc + val, 0);

    const {totalA, totalB} = getShotsTotal();

    return (
        <View style={styles.itemContainer}>
            <Text style={''}>Competition:  
                <Text style={styles.informationText}> {competitionName} </Text>
            </Text>
            <Text style={styles.dateText}>
                Date: {new Date(date).toLocaleDateString()} 
            </Text>
            <Text style={''}>
                Rink No: <Text style={styles.informationText}>{rinkNumber} </Text>
            </Text>
            <Text style={styles.informationText}>
                {teamA?.name} vs {teamB?.name}</Text>
            {[1,2,3,4].map(i => playerRowRenderer(i))}
            <ViewEndScreen shots={shots} navigation={navigation}/>
            <Text style={''}>Total: <Text style={styles.totalText}>{totalA}:{totalB}</Text> </Text>
            <Text style={''}></Text>
            <Pressable 
                onPress={() => navigation.navigate('AddShot', {
                    teamAname: teamA?.name,
                    teamBname: teamB?.name,
                    onAddShot: (shot) => handleAddShot(shot),
            })}>
                <Text style={styles.button}>
                    <Text style={styles.titleText}> Add Shot </Text>
                    <MaterialIcons name='add' size={24} color='black' />  
                </Text>
            </Pressable>
            <Pressable 
                onPress={() => navigation.navigate('EditItem', {
                    navigation: navigation,
                    items: {...route.params},
                    onEditShot: (val) => handleEditShot(val),
            })}>
                <Text style={styles.button}>
                    <Text style={styles.editText}> Edit Items </Text>
                    <MaterialIcons name='edit' size={24} color='black' />  
                </Text>
            </Pressable>
        </View> 
    );
};

const styles = StyleSheet.create({
    thumbnailStyle: {
        height: 60,
        width: 60,
        flex: 1,
    },
    itemContainer: {
        flex: 1,
        fontSize: 50,
        top: 0,
        marginTop: 0,
        padding: 15,
        borderBottomWidth: 1,
        alignItems: 'center',
        maxWidth: '100%',
    },
    dateText: {
        fontSize: 16,
    },
    informationText: {
        fontSize: 30,
    },
    totalText: {
        fontSize: 40,
        fontWeight: 'bold',
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
});

export default ListViewScreen;