import { StyleSheet, Text, TextInput as TextInputt, View } from "react-native";

const TextInput = ({ onChangeText, title, value, style}) => {    
    return (
        <View>
            <Text style={styles.textLabel}>{title}:</Text>
            <TextInputt style={styles.textInput}
                // placeholder={`Type ${title} here`} 
                value={value}
                onChangeText={(text) => { onChangeText(text); }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    textInput: {
        borderColor: 'black',
        borderWidth: 0.1,
        padding: 0,
        marginBottom: 5,
        borderRadius: 3,
        width: '100%',
    },
});

export default TextInput;