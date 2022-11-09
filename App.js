import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddCardScreen from './src/screens/AddCardScreen';
import ListCardScreen from './src/screens/ListCardScreen';
import AddItemScreen from './src/screens/AddItemScreen';
import AddShotScreen from './src/screens/AddShotScreen';
import ListItemScreen from './src/screens/ListItemScreen';
import ViewItemScreen from './src/screens/ViewItemScreen';
import EditItemScreen from './src/screens/EditItemScreen';
import AddPlayerScreen from './src/screens/AddPlayerScreen';
import ListPlayerScreen from './src/screens/ListPlayerScreen';
import { ItemProvider } from './src/contexts/ItemContext';
import CameraScreen from './src/screens/CameraScreen';
import CameraPhotoScreen from './src/screens/CameraPhotoScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <ItemProvider>
        <NavigationContainer >
            <Stack.Navigator initialRouteName='Camera' >
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
    </ItemProvider>
  );
}

export default App;