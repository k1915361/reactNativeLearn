import { Pressable, StyleSheet } from 'react-native';

const NavPressable = ({ screenName, navigation, params },children) => {
    return (
        <Pressable 
            onPress={() => {
                navigation.navigate(screenName.replace(' ', ''), {
                    ...params
                });
            }}    
        >
            <Text>{screenName}</Text>
            {children}
        </Pressable>
    )
}

const styles = StyleSheet.create({});

export default NavPressable;