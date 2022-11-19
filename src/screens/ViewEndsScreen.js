import { StyleSheet, View, Text,  ScrollView } from "react-native";
import { jsnstringify, keys } from "../helpers/helper";
import ViewEndScreen from "./ViewEndScreen";

const ViewEndsScreen = ({navigation, shots}) => {

    return (
         <ScrollView style={styles.viewContainer}>  
            <View style={styles.itemContainer}>
                <Text style={''}>Ends:</Text> 
                {keys(shots)?.map(key => 
                    <View key={key}>
                        <ViewEndScreen 
                            navigation={navigation}
                            end={shots[key]}
                            endNumber={parseInt(key)+1}
                        />
                    </View>
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
});

export default ViewEndsScreen;