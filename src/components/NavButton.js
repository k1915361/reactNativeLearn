import { Button, StyleSheet } from 'react-native';

const NavButton = ({ screenName, navigation }) => {
    return (
        <Button 
            title={`Go to ${screenName}`} 
            onPress={() => {
                navigation.navigate(screenName.replace(' ', ''));
            }}    
        />
    )
}

const styles = StyleSheet.create({});

export default NavButton;