import { useEffect, useState } from "react";
import { Button, FlatList, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import useSearchResults from "../hooks/useSearchResults";

const SearchApiScreen = ({navigation}) => {
    const [ getSearchResults, results, errorMessage] = useSearchResults();
    const [searchTerm, setSearchTerm] = useState('coffee');
    
    useEffect(() => {
        getSearchResults(searchTerm);
    }, []);

    return (
        <View>
            <Text style={styles.textError}>{(errorMessage !== '') ? errorMessage : null }</Text>
            <Text style={styles.textLabel}>Enter Search Term:</Text>
            <Button title="Search" />
            <FlatList
                data={results.businesses}
                keyExtractor={(e) => e.id}
                renderItem={({item})=> {
                    return (
                        <Pressable 
                            onPress={() => {
                                navigation.navigate("SearchApiItem"), {id: item.id}
                            }}
                        >
                            <Text style={styles.textLabel}>{item.name}</Text>
                        </Pressable>
                    )
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    textInput: {
        fontSize: 20,
        padding: 10,
        margin: 5,
        borderWidth: 1,
    },
    textLabel: {
        fontSize: 18,
        paddingLeft: 10,
        marginTop: 10,
    },
    textError: {
        fontSize: 20,
        color: 'red',
    },
});

export default SearchApiScreen;