import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddCardScreen from './src/screens/AddCardScreen';
import ListCardScreen from './src/screens/ListCardScreen';
import AddItemScreen from './src/screens/AddItemScreen';
import ListItemScreen from './src/screens/ListItemScreen';
import ViewItemScreen from './src/screens/ViewItemScreen';
import EditItemScreen from './src/screens/EditItemScreen';
import AddPlayerScreen from './src/screens/AddPlayerScreen';
import ListPlayerScreen from './src/screens/ListPlayerScreen';
import { ItemProvider } from './src/contexts/ItemContext';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <ItemProvider>
        <NavigationContainer >
            <Stack.Navigator initialRouteName='ListItem' >
                {/* <Stack.Screen 
                    name="ListCard"
                    component={ListCardScreen}
                    options={{ title: 'My Cards' }}
                /> */}
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
                    name="EditItem"
                    component={EditItemScreen}
                    options={{ title: 'Edit Item' }}
                />
                {/* <Stack.Screen 
                    name="AddCard"
                    component={AddCardScreen}
                    options={{ title: 'Add Card' }}
                /> */}
                {/* <Stack.Screen 
                    name="ListPlayer"
                    component={ListPlayerScreen}
                    options={{ title: 'Players' }}
                />
                <Stack.Screen 
                    name="AddPlayer"
                    component={AddPlayerScreen}
                    options={{ title: 'Add Player' }}
                /> */}
            </Stack.Navigator>
        </NavigationContainer>
    </ItemProvider>
  );
}

export default App;