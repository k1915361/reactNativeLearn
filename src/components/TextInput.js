import { StyleSheet, TextInput as TextInputt } from 'react-native';

const TextInput = ({value, onChangeText, style = styles.textInput, placeholder = 'Type Here'}) => {
    return (
        <TextInputt 
            style={style} placeholder={placeholder} 
            value={value} onChangeText={onChangeText}
        />
    )
}

const styles = StyleSheet.create({
    textInput: {
        alignSelf:"center",
        borderColor: 'grey',
        borderWidth: 0.4,
        paddingHorizontal: 0,
        paddingHorizontal: 0,
        paddingVertical: 0,
        marginVertical: 0, 
        marginBottom: -1, 
        borderRadius: 0, 
        textAlign: "center",
        paddingHorizontal: 0,
        maxWidth: 100, 
        width: 100, 
        height: 40, 
        fontSize: 20, 
        padding: 0,
        margin: 4,
    },
});

export  default TextInput;