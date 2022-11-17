import { StyleSheet, View, Text, Image } from "react-native";

const ViewImageScreen = ({ route }) => {
    const { image } = route.params;
    
    return (
        <View>
            <Text style={styles.viewContainer}>{}</Text>
            <Image style={styles.imageStyle} source={{ uri: image }} resizeMode='contain'  />
        </View>     
    );
};

const styles = StyleSheet.create({
    viewContainer: {
    },
    imageStyle: {
        alignSelf: 'center',
        width: 380,
        height: 500,
        scale: 0.1,
    },
});

export default ViewImageScreen;
