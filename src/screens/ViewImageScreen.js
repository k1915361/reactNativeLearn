import { StyleSheet, View, Text, Image } from "react-native";

const ViewImageScreen = ({navigation, route }) => {
    const { image } = route.params;
    const func = () => {    };
    
    return (
        <View>
            <Text style={styles.viewContainer}>{image}</Text>
            <Image style={styles.imageStyle} source={{ uri: image }} resizeMode='contain'  />
        </View>     
    );
};

const styles = StyleSheet.create({
    viewContainer: {
        // alignItems: 'center',
        // alignContent: 'center',
    },
    imageStyle: {
        alignSelf: 'center',
        width: 380,
        // maxWidth: '99%',
        // minHeight: 200,
        height: 500,
        scale: 0.1,
        // maxHeight: '100%',
    },
});

export default ViewImageScreen;
