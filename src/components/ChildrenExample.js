import { StyleSheet, Text, View } from 'react-native';

const ChildExample = ({title, children}) => {
    return (
        <View>
            <Text>{title}</Text>
                {children}
            <Text>Footer Content</Text>
        </View>
    )
}

const styles = StyleSheet.create({});

export  default ChildExample;