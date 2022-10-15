import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddCardScreen from './src/AddCardScreen';
import AddItemScreen from './src/AddItemScreen';
import IndexScreen from './src/screens/IndexScreen';
import ListViewScreen from './src/screens/ListViewScreen';
import ScreenOne from './src/screens/ScreenOne';
import ScreenTwo from './src/screens/ScreenTwo';
import ViewItemScreen from './src/screens/ViewItemScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer >
        <Stack.Navigator initiaRouteName='List' >
            <Stack.Screen 
                name="List"
                component={ListViewScreen}
                options={{ title: 'View all items' }}
            />
            <Stack.Screen 
                name="View"
                component={ViewItemScreen}
                options={{ title: 'View item' }}
            />
            <Stack.Screen 
                name="AddItem"
                component={AddItemScreen}
                options={{ title: 'Add item' }}
            />
            <Stack.Screen 
                name="AddCard"
                component={AddCardScreen}
                options={{ title: 'Add card' }}
            />
            <Stack.Screen 
                name="Index"
                component={IndexScreen}
                options={{ title: 'reactNativeLearning' }}
            />
            <Stack.Screen 
                name="ScreenOne"
                component={ScreenOne}
                options={{ title: 'Screen One' }}
            />
            <Stack.Screen 
                name="ScreenTwo"
                component={ScreenTwo}
                options={{ title: 'Screen Two' }}
            />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;