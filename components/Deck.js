import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import { colors } from '../styles'

const Deck = ({ deck, navigation }) => {

    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Deck', { id: deck.id })}>
            <View style={styles.info}>
                <Text style={styles.title} numberOfLines={1}>{deck.title}</Text>
                <Text style={styles.subtitle}>{deck.cards.length} cards</Text>
            </View>
            <Entypo name="chevron-right" size={20} color={colors.medium} />

        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10
    },
    info: {
        flex: 1,
        marginLeft: 14
    },
    subtitle: {
        fontWeight: 'normal',
        color: colors.medium
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.dark
    }

})



export default Deck
