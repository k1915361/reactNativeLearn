import { Button, Pressable, Text, View } from "react-native";

const ViewItemScreen = ({navigation, route}) => {
    const {id, title, content, date } = route.params;
    return (
        <View>
            <Text>ID: {id}</Text>
            <Text>Title: {title}</Text>
            <Text>CONTENT: {content}</Text>
            {/* <Text>DATE: {new Date(date).toLocaleDateString()}</Text>
            <Text>TIME: {new Date(date).toLocaleTimeString()}</Text> */}
            <Button title='Edit Item' onPress={() => 
                navigation.navigate('EditItem', {
                    id: id, itemTitle: title, itemContent: content
            })}/>
        </View>
    );
};

export default ViewItemScreen;