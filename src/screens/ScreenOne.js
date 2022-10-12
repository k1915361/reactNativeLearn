import { View, Text, Button } from 'react-native';
import NavButton from '../components/NavButton';
import ChildrenExample from '../components/ChildrenExample';

const ScreenOne = ({ navigation }) => {
    return (
        <View>
            <ChildrenExample title='This is Screen One'>
                <NavButton screenName='Screen Two' navigation={navigation} />
                <NavButton screenName='Index' navigation={navigation} />
            </ChildrenExample>
        </View>
    )
}

export default ScreenOne;