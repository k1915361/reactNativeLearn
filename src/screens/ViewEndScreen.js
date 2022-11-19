import React, { useContext, useState } from "react";
import { StyleSheet, View, Text, FlatList, Pressable, ScrollView, Image, Button } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { jsnstringify, keys } from "../helpers/helper";
import NavButton from "../components/NavButton";

const ViewEndScreen = ({navigation, end, endNumber}) => {
    const { image, shot, team } = end;
    const getNavButton = (screenName, params) => <NavButton screenName={screenName} navigation={navigation} params={params} />;
    
    const getTeamAScore = () => team === 'teamA' ? shot : 0;

    const getTeamBScore = () => getTeamAScore() === 0 ? shot : 0;

    return (
         <View style={styles.viewContainer}>  
            <Text style={styles.endText} > 
                {endNumber} <Text style={styles.shotText}>{getTeamAScore()}:{getTeamBScore()} </Text>
                {image && getNavButton('View Image', {image: image} )}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    viewContainer: {
        left:0,
        right:0,
        width:'100%',
    },
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
    endText: {
        fontSize: 14,
    },
    shotText: {
        fontSize: 30,
    },
    titleText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ViewEndScreen;