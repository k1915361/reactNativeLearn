import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import TextInput from './components/TextInput'; 

const AddCardScreen = ({navigation, route}) => {
    const {callback} = route.params;
    const [card, setCard] = useState({competitionName: '', date: '', rinkNo: '', teamName: '', playerName: ''});
    const { competitionName, date, rinkNo, teamName, playerName } = card;
    // competition name, date, rink number, team names and player names
    
    return (
        <View>
            {Object.entries(card).map((key, value) => {
                console.log(key, value);
                return <TextInput
                    title={key}
                    key={key}
                    value={value}
                    onChangeText={(card) => setCard(card)}
                />          
            })}
            <TextInput
                title='competition name'
                value={competitionName}
                onChangeText={(card) => setCard(card)}
            />
            
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