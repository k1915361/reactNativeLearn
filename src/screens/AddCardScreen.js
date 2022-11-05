import { useContext, useState } from "react";
import { Button, StyleSheet, Text, View, TextInput } from "react-native";
import ItemContext from '../contexts/ItemContext';

const testCard = { competitionName: 'aComp', rinkNumber: 11, date: new Date(), teamA: { name: 'US', player1: { name: 'Eugene',},  player2: { name: 'Warren',},  player3: { name: 'Bill',},  player4: { name: 'Will',},  }, teamB: {name: 'China',player1: { name: 'Buffet',},  player2: { name: 'Gates',},  player3: { name: 'Smith',},  player4: { name: 'John',},} }

const AddCardScreen = ({navigation, route}) => {
    const {create} = useContext(ItemContext);
    const [card, setCard] = useState({ date: new Date(),});

    const getPlayerTextInput = (team, player) => 
        <TextInput
            placeholder={player} style={styles.textInput}
            onChangeText={(text) => 
                setCard({...card, [team]: {...card[team], 
                    [player]: {name: text}}})}/>

    return (
        <View style={styles.gridRowContainer}>
            <Text>Competition:</Text>
            <TextInput
                placeholder="type Competition Name" value={card.competitionName}
                style={styles.textInput}
                onChangeText={(text) => setCard({...card,  competitionName: text})}
            />
            <Text>Rink No:</Text>
            <TextInput
                placeholder="type Rink No" value={card.rinkNumber} 
                style={styles.textInput}
                onChangeText={(text) => setCard({...card, rinkNumber: text })}
            />
            <View style={styles.leftPanel}>
                <Text>Team Name</Text>
                <TextInput
                    placeholder="team name" style={styles.textInput}
                    onChangeText={(text) => setCard({...card, teamA: {name: text}})}
                />
                <Text>Players Name</Text>
                {getPlayerTextInput('teamA', 'player1')}
                {getPlayerTextInput('teamA', 'player2')}
                {getPlayerTextInput('teamA', 'player3')}
                {getPlayerTextInput('teamA', 'player4')}
            </View>
            
            <View style={styles.rightPanel}>
                <Text></Text> 
                <TextInput
                    placeholder="team name" style={styles.textInput}
                    onChangeText={(text) => setCard({...card, teamB: {name: text}})}
                />
                <Text></Text>
                {getPlayerTextInput('teamB', 'player1')}
                {getPlayerTextInput('teamB', 'player2')}
                {getPlayerTextInput('teamB', 'player3')}
                {getPlayerTextInput('teamB', 'player4')}
            </View>
            <Text>{JSON.stringify(card)} </Text>
            
            <Button title='Create Card' onPress={() => {
                create(card.competitionName, card, () => navigation.pop());
            }} />
            <Text> {'\n'}</Text>
            <Button title='Create Test Card' onPress={() => {
                create(testCard.competitionName, testCard, () => navigation.pop());
            }} />
        </View>
    )
}

const styles = StyleSheet.create({
    textLabel: {
        // padding: 0,
        // paddingBottom: 10,
    },
    textLabel: {
    },
    gridColumn: {
        width: '100%',
    },
    gridRowContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },  
    leftPanel: {
        width: '45%',
        left: 0,
    },
    rightPanel: {
        width: '45%',
        right: 0,
    },
    textInput: {
        borderColor: 'black',
        borderWidth: 1,
        // padding: 0,
        marginHorizontal: 1,
        paddingHorizontal: 0,
        // right: 1,
        // left: 1,
        marginBottom: -1,
        borderRadius: 1,
    },
});

export default AddCardScreen;