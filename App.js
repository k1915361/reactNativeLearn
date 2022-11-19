import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddCardScreen from './src/screens/AddCardScreen';
import ListCardScreen from './src/screens/ListCardScreen';
import AddItemScreen from './src/screens/AddItemScreen';
import AddShotScreen from './src/screens/AddEndScreen';
import ListItemScreen from './src/screens/ListItemScreen';
import ViewItemScreen from './src/screens/ViewItemScreen';
import EditItemScreen from './src/screens/EditItemScreen';
import AddPlayerScreen from './src/screens/AddPlayerScreen';
import ViewEndRowPlayersScreen from './src/screens/ViewEndRowPlayersScreen';
import { ItemProvider } from './src/contexts/ItemContext';
import CameraScreen from './src/screens/CameraScreen';
import CameraPhotoScreen from './src/screens/CameraPhotoScreen';
import ViewImageScreen from './src/screens/ViewImageScreen';
import SearchApiScreen from './src/screens/SearchApiScreen';
import SearchApiItemScreen from './src/screens/SearchApiItemScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <ItemProvider>
        <NavigationContainer >
            <Stack.Navigator initialRouteName='ListCard' >
                <Stack.Screen 
                    name="SearchApiItem"
                    component={SearchApiItemScreen}
                    options={{ title: 'Item from API' }}
                />
                <Stack.Screen 
                    name="SearchApi"
                    component={SearchApiScreen}
                    options={{ title: 'Search an API with HTTP' }}
                />
                <Stack.Screen 
                    name="ViewImage"
                    component={ViewImageScreen}
                    options={{ title: 'View Image' }}
                />
                <Stack.Screen 
                    name="Camera"
                    component={CameraScreen}
                    options={{ title: 'Take a snap' }}
                />
                <Stack.Screen 
                    name="Photo"
                    component={CameraPhotoScreen}
                    options={{ title: 'Your Picture' }}
                />
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
                    name="AddShot"
                    component={AddShotScreen}
                    options={{ title: 'Add Shot' }}
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
                <Stack.Screen 
                    name="AddCard"
                    component={AddCardScreen}
                    options={{ title: 'Add Card' }}
                />
                <Stack.Screen 
                    name="ListPlayer"
                    component={ViewEndRowPlayersScreen}
                    options={{ title: 'Players' }}
                />
                <Stack.Screen 
                    name="AddPlayer"
                    component={AddPlayerScreen}
                    options={{ title: 'Add Player' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    </ItemProvider>
  );
}

export default App;