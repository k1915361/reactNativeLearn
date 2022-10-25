import { Text, View } from "react-native";
import { Button } from "react-native-web";

const ViewItemScreen = ({route}) => {
    const {id, title, content, date } = route.params;
    return (
        <View>
            <Text>ID: {id}</Text>
            <Text>Title: {title}</Text>
            <Text>CONTENT: {content}</Text>
            <Text>DATE: {new Date(date).toLocaleDateString()}</Text>
            <Text>TIME: {new Date(date).toLocaleTimeString()}</Text>
            <Button title="Edit Item" onPress={() => {
                navigation.navigate('EditItem', {id:id});
            }}/>
        </View>
    );
};

export default ViewItemScreen;