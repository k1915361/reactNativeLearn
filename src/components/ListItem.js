import { StyleSheet, View,Text, Image } from "react-native";

const ListItem = ({image, name, key}) => {    
    return (
        <View style={styles.itemContainer} key={key}>
            <Text style={styles.nameText}>{name} </Text>
            <Image source={{uri: image}} style={styles.img}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginInTop: 59,
    },
    heading: {
        fontSize: 30,
        fontWeight: 30,
        color: 'green'
    },
    nameText: {
        fontSize: 20,
        color: 'blue',
        marginTop: 10
    },
    img: {
        width: 250,
        height: 250
    },
    itemContainer: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 4,
        padding: 5,
      marginVertical: 5,
    },
});

export default ListItem;