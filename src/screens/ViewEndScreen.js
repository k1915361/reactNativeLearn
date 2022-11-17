import React, { useContext, useState } from "react";
import { StyleSheet, View, Text, FlatList, Pressable, ScrollView, Image, Button } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { jsnstringify, keys } from "../helpers/helper";
import NavButton from "../components/NavButton";

const ViewEndScreen = ({navigation, shots}) => {

    const getNavButton = (screenName, params) => <NavButton screenName={screenName} navigation={navigation} params={params} />;

    const getImageRenderer = (image) => <Image style={styles.thumbnailStyle} resizeMode='repeat' source={{ uri:image }} /> 

    const getEndNumber = (key) => Number(key)+1;

    const getEndImageByKey = (key) => shots[key]?.image || '';
    
    const getTeam = (key) => shots[key].team;
    
    const isTeamA = (key) => getTeam(key) === 'teamA';

    const isTeamB = (key) => getTeam(key) === 'teamB';
    
    const getTeamAScore = (key) => isTeamA(key) ? shots[key].shot : 0;

    const getTeamBScore = (key) => isTeamB(key) ? shots[key].shot : 0;

    return (
         <ScrollView style={styles.viewContainer}>  
            <View style={styles.itemContainer}>
                <Text style={''}>Ends:</Text> 
                {keys(shots)?.map(key => 
                    <Text style={styles.endText} key={key}> 
                        {getEndNumber(key)} <Text style={styles.shotText}>{getTeamAScore(key)}:{getTeamBScore(key)} </Text>
                        {getEndImageByKey(key) && getNavButton('View Image', {image: getEndImageByKey(key)} )}
                    </Text>
                )}
            </View> 
        </ScrollView>
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