import { Button, StyleSheet } from 'react-native';

const NavButton = ({ screenName, navigation, params }) => {
    return (
        <Button 
            title={`${screenName}`} 
            onPress={() => {
                navigation.navigate(screenName.replace(' ', ''), {
                    ...params
                });
            }}    
        />
    )
}

const styles = StyleSheet.create({});

export default NavButton;