import { StyleSheet, Text, TextInput as TextInputt, View } from "react-native";

const TextInput = ({ onChangeText, title, value}) => {    
    return (
        <View>
            <Text style={styles.textLabel}>Enter your {title}:</Text>
            <TextInputt style={styles.textInput}
                placeholder={`Type ${title} here`} value={value}
                onChangeText={(text) => { onChangeText(text); }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    textLabel: {
        padding: 0,
    },
});

export default TextInput;