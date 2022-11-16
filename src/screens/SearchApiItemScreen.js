import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

const SearchApiItemScreen = ({route}) => {
    const {id} = route.params;
    const [result, setResult] = useState(null);
    const getResultsById = async () => {
        try {
            const response = await yelp.get(`/${id}`);
            setResult (response.data);
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        getResultsById(id)
    }, []);
    if (!result) {
        return null;
    }
    
    return (
        <View style={styles.container}>
            <Image 
                style={styles.imageStyle}
                source={{ uri: result.image_url }}
            />
            <Text>{result.name}</Text>
            <FlatList
                data={result.photos}
                keyExtractor={(e)=> e}
                renderItem={({item}) => {
                    return  <Image 
                        style={styles.imageListStyle}
                        source={{ uri: item }}
                    />
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textStyle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    imageStyle: {
        height: 100,
        alignSelf: 'stretch',
    },
    imageListStyle: {
        marginTop: 10,
        borderRadius: 5,
        height: 300,
        width: 300,
        alignSelf: 'center',
    },
});

export default SearchApiItemScreen;