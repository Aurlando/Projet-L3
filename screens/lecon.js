import {View, Text, StyleSheet} from 'react-native';

const Lecon = () => {
    return(
        <View style={styles.contenair}>
            <Text style={{color: '#fff'}}>Lecon</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    contenair: {
        flex: 1,
        backgroundColor: '#000'
    }
});
export default Lecon