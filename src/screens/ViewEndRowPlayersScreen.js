import { useState } from "react";
import { StyleSheet, View, Text, FlatList, Pressable } from "react-native";

const ViewEndRowPlayersScreen = ({ playerA, playerB, playerNo}) => {
    
    return (
        <View>
            <Text style={styles.informationText}>{playerA} | {playerNo} | {playerB}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    informationText: {
        fontSize: 30,
    },
});

export default ViewEndRowPlayersScreen;