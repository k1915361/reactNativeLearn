import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import TextInput from '../components/TextInput'; 

const AddCardScreen = ({navigation, route}) => {
    const {callback} = route.params;
    const [card, setCard] = useState({competitionName: '', rinkNumber: '', teamName: '', playerName: '', date: new Date()});
    const [team1, setTeam1] = useState('');
    const [team2, setTeam2] = useState('');
    const [players1, setPlayers1] = useState([]);
    const [players2, setPlayers2] = useState([]);

    return (
        <View>
            <Text>Enter your:</Text>
            <TextInput
                title='Competition'
                value={card.competitionName}
                onChangeText={(text) => setCard({...card,  competitionName: text})}
            />
            <TextInput
                title='Rink No'
                value={card.rinkNumber}
                onChangeText={(text) => setCard({...card, rinkNumber: text })}
            />
            <Text>1st Team</Text>
            <TextInput
                title='Team Name'
                value={team1}
                onChangeText={(text) => setTeam1(text)}
            />
            <Text>Players</Text>
            <TextInput
                title='Firstname'
                value={team1}
                style={styles}
                onChangeText={(text) => setTeam1(text)}
            />
            <TextInput
                title='LastName'
                value={team1}
                onChangeText={(text) => setTeam1(text)}
            />
            <Text>2nd Team</Text> 
            <TextInput
                title='Team Name'
                value={team2}
                onChangeText={(text) => setTeam2(text)}
            />
            <Text>{JSON.stringify(card)} </Text>
            
            <Button title='Create Card' onPress={() => {
                setCard({...card, teamName: [team1, team2]})
                callback(card);
                navigation.pop();
            }} />
        </View>
    )
}

const styles = StyleSheet.create({
    textLabel: {
        padding: 0,
        paddingBottom: 10,
    },
    textLabel: {
        width: '50%',
    },
});

export default AddCardScreen;