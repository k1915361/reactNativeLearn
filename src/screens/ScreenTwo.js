import { View, Text, Button } from 'react-native';
import NavButton from '../components/NavButton';
import ChildrenExample from '../components/ChildrenExample';

const ScreenTwo = ({navigation}) => {
    return (
        <View>
            <ChildrenExample title='This is Screen Two'>
                <NavButton screenName='Screen One' navigation={navigation}/>
                <NavButton screenName='Index' navigation={navigation}s/>
            </ChildrenExample>
        </View>
    )
}

export default ScreenTwo;