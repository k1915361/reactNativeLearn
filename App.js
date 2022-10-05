import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IndexScreen from './src/screens/IndexScreen';
import ScreenOne from './src/screens/ScreenOne';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator initiaRouteName='Index' >
            <Stack.Screen 
                name="Index"
                component={IndexScreen}
                options={{ title: 'reactNativeLearning' }}
            />
            <Stack.Screen 
                name="S1"
                component={ScreenOne}
                options={{ title: 'Screen One Screen' }}
            />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;