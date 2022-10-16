import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddCardScreen from './src/screens/AddCardScreen';
import AddItemScreen from './src/screens/AddItemScreen';
import AddPlayerScreen from './src/screens/AddPlayerScreen';
import ListCardScreen from './src/screens/ListCardScreen';
import ListItemScreen from './src/screens/ListItemScreen';
import ListPlayerScreen from './src/screens/ListPlayerScreen';
import ViewItemScreen from './src/screens/ViewItemScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer >
        <Stack.Navigator initiaRouteName='ListCard' >
            <Stack.Screen 
                name="ListCard"
                component={ListCardScreen}
                options={{ title: 'My Cards' }}
            />
            <Stack.Screen 
                name="ListItem"
                component={ListItemScreen}
                options={{ title: 'My Card' }}
            />
            <Stack.Screen 
                name="ViewItem"
                component={ViewItemScreen}
                options={{ title: 'My Item' }}
            />
            <Stack.Screen 
                name="AddItem"
                component={AddItemScreen}
                options={{ title: 'Add Item' }}
            />
            <Stack.Screen 
                name="AddCard"
                component={AddCardScreen}
                options={{ title: 'Add Card' }}
            />
            <Stack.Screen 
                name="ListPlayer"
                component={ListPlayerScreen}
                options={{ title: 'Players' }}
            />
            <Stack.Screen 
                name="AddPlayer"
                component={AddPlayerScreen}
                options={{ title: 'Add Player' }}
            />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;