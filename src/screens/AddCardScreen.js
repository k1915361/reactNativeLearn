import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import TextInput from '../components/TextInput'; 

const AddCardScreen = ({navigation, route}) => {
    const {callback} = route.params;
    const [card, setCard] = useState({competitionName: '', rinkNumber: '', teamName: '', playerName: '', date: new Date()});
    
    return (
        <View>
            <TextInput
                title='Competition Name'
                value={card.competitionName}
                onChangeText={(text) => setCard({...card,  competitionName: text})}
            />
            <TextInput
                title='Rink Number'
                value={card.rinkNumber}
                onChangeText={(text) => setCard({...card, rinkNumber: text })}
            />
            <TextInput
                title='Team Name'
                value={card.teamName}
                onChangeText={(text) => setCard({...card, teamName: text })}
            />
            <TextInput
                title='Player Name'
                value={card.playerName}
                onChangeText={(text) => setCard({...card, playerName: text })}
            />
            <Text>{JSON.stringify(card)} </Text>
            
            <Button title='Create Card' onPress={() => {
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
});

export default AddCardScreen;