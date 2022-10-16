import { Text, View } from "react-native";

const ViewCardScreen = ({route}) => {
    const {id, date, competitionName, rinkNumber, teamNames, players, items } = route.params;
    return (
        <View>
            <Text>ID: {id}</Text>
            {/* <Text>Competition: {competitionName}</Text> */}
            <Text>DATE: {new Date(date).toLocaleDateString()}</Text>
            <Text>TIME: {new Date(date).toLocaleTimeString()}</Text>
        </View>
    );
};

export default ViewCardScreen;