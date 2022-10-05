import { View, Text, Button } from 'react-native';

const ScreenOne = ({navigation}) => {
    return (
        <View>
            <Text>This is Screen One</Text>
            <Button title='Go to Home Screen' onPress={() => {
                navigation.navigate('Index');
            }} />
        </View>
    )
}

export default ScreenOne;