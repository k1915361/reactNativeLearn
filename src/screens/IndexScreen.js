import { StyleSheet, Text, View, ScrollView, Image  } from 'react-native';

const IndexScreen = () => {
    const assetsDir = '../../assets/';

    const myArray = [ 15, 1, 25.5, 32 ];
    const myArray2 = [ 
        { id:1, message: ''},
        { id:2, message: 'hello'},
        { id:3, message: ''},
        { id:4, message: ''},
        { id:5, message: ''},
    ];
    let result = 0;
    const myAge = 21;
    let message;
    let isLoggedIn = false;
    const pi = 3.14;

    if (myAge < 18) {
        message = 'Young';
    } else if (myAge === 21) {
        message = 'Your Lying!';
    } else {
        message = 'Adult';
    }

    myArray.forEach(item => result += item);
    const newArray = myArray.map(item => item * pi);
    const filteredArray = myArray.filter(item => item > 16);
    const findArray = myArray2.find(item => item.id === 2);
    let myObject = myArray2.find(e => e.id === 2);

    return (
    // <SafeAreaView style={styles.container}>
    <View style={styles.container}>
    <StatusBar  />
    <ScrollView horizontal={false}>
        <View style={styles.heading}>Flintstones and Rubbles</View> 
        <Button title='Go to Screen One' onPress={() => {
                navigation.navigate('S1');
        }}/>
        <View style={styles.itemContainer} >
            <Text style={styles.nameText}>Fred </Text>
            <Image source={ require(`${assetsDir}Fred.png`) } style={ styles.img }/>
        </View>
        <View style={styles.itemContainer}>
            <Text style={styles.nameText}>Wilma </Text>
            <Image source={ require(`${assetsDir}Fred.png`) } style={ styles.img }/>
        </View>
        <View style={styles.itemContainer}>
            <Text style={styles.nameText}>Pebbles </Text>
            <Image source={ require(`${assetsDir}Fred.png`) } style={ styles.img }/>
        </View>
        <View style={styles.itemContainer}>
            <Text style={styles.nameText}>Barney </Text>
            <Image source={ require(`${assetsDir}Fred.png`) } style={ styles.img }/>
        </View>
        <View style={styles.itemContainer}>
            <Text style={styles.nameText}>Bettie </Text>
            <Image source={ require(`${assetsDir}Fred.png`) } style={ styles.img }/>
        </View>
        <View style={styles.itemContainer}>
            <Text style={styles.nameText}>Bamm-Bamm </Text>
            <Image source={{ uri:'https://th.bing.com/th/id/OIP.aeF5d2TX_y2BFTHjAsRdLAHaNv?pid=ImgDet&rs=1' }} style={ styles.img }/>
        </View>
    </ScrollView>
    </View>
    //   </SafeAreaView>
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

export default IndexScreen;

/*
npm install @react-navigation/native
npx expo install react-native-screens react-native-safe-area-context

npm install @react-navigation/native-stack
npm install @react-navigation/drawer
npm install @react-navigation/bottom-tabs
*/ 