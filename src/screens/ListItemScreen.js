import { useState } from "react";
import { StyleSheet, View, Text, Pressable, Image } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { get, int, jsnstringify, keys, typeOfNaN } from "../helpers/helper";
import ViewEndsScreen from "./ViewEndsScreen";
import ViewEndRowPlayersScreen from "./ViewEndRowPlayersScreen";

const ListViewScreen = ({navigation, route}) => {
    const { handleUpdate, navigateListItem} = route.params;
    const [item, setItem] = useState(route.params.item || []);
    const { id, competitionName, rinkNumber, teamA, teamB } = item;
    let { shots } = item;
    shots = shots || [];
    // const [shots, setShots] = useState(item.shots || []);
    const date = new Date(item.date).toUTCString();
    const shotsKeys = keys(shots);
    const lastShotsKey = shotsKeys.length === 0 ? 0 : parseInt(shotsKeys[shotsKeys.length - 1])+1;
    
    const getShotsKeys = () => keys(shots);

    const getLastKey = () => shotsKeys.length === 0 ? 0 : parseInt(shotsKeys[shotsKeys.length - 1])+1; 

    const getLastKeyV2 = () => Number.isNaN(getLastKey()) ? 0 : parseInt(getLastKey()); 

    const handleAddShot = (shot) => {
        const updatedShots = {...shots, [getLastKey()]: {...shot}};
        const updatedItems = {...item, shots: {...updatedShots || {}}};
        handleUpdate({...updatedItems}); 
        // setShots(updatedShots);     
        setItem(updatedItems);
    };
    
    const handleEditShot = (value) => {
        // const updatedShots = {...shots, value};
        // const updatedItems = {...item, shots: {...updatedShots || {}}};
        const updatedItems = value;
        handleUpdate(updatedItems); 
        setItem(updatedItems);
    };

    const teamScores = (team = 'teamA') => keys(shots)?.map(key => shots[key].team === team && shots[key].shot);

    const getTotalScoreTeamA = () => getSum(teamScores('teamA'));
    const getTotalScoreTeamB = () => getSum(teamScores('teamB'));

    const getSum = (obj) => obj?.reduce((acc, val) => acc + val, 0);

    const getTeamAPlayer = (i) => get(teamA, `player${i}`);
    const getTeamBPlayer = (i) => get(teamB, `player${i}`);

    return (
        <View style={styles.itemContainer}>
            <Text style={''}>Card ID: {id} </Text>
            <Text style={''}>Competition:  
                <Text style={styles.informationText}> {competitionName} </Text>
            </Text>
            <Text style={styles.dateText}>Date: 
                <Text style={styles.informationText}> {new Date(date).toLocaleDateString()}</Text>
            </Text>
            <Text style={''}>
                Rink No: <Text style={styles.informationText}>{rinkNumber} </Text>
            </Text>
            <Text style={styles.informationText}>
                {teamA?.name} vs {teamB?.name}</Text>
            {[1,2,3,4].map(i => {
                return <ViewEndRowPlayersScreen 
                    key={i}
                    playerNo={i} 
                    playerA={getTeamAPlayer(i).name} 
                    playerB={getTeamBPlayer(i).name} 
                />
            })}
            <ViewEndsScreen shots={item.shots} navigation={navigation}/>
            <Text style={''}>Total: <Text style={styles.totalText}>{getTotalScoreTeamA()}:{getTotalScoreTeamB()}</Text> </Text>
            <Text style={''}></Text>
            <Pressable 
                onPress={() => navigation.navigate('AddShot', {
                    item: item,
                    onAddShot: (shot) => handleAddShot(shot),
                    navigateListItem: navigateListItem, 
            })}>
                <Text style={styles.button}>
                    <Text style={styles.titleText}> Add Shot </Text>
                    <MaterialIcons name='add' size={24} color='black' />  
                </Text>
            </Pressable>
            <Pressable 
                onPress={() => navigation.navigate('EditItem', {
                    navigation: navigation,
                    items: item,
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