import { StyleSheet, Text, View } from 'react-native';

const Decouverte = () => {
    return(
        <View style={styles.contenair}>
            <Text style={{color: '#fff'}}>decouverte</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    contenair: {
        flex: 1,
        backgroundColor: '#000'
    }
})

export default Decouverte