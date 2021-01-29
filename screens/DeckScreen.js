import React, { useState } from 'react'
import { View, Text, } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';

import RoundedButton from '../components/RoundedButton'
import { colors } from '../styles'
import { getDeck, deleteDeck } from '../API'


const DeckScreen = ({ navigation, route }) => {
    const [deck, setDeck] = useState(null)
    const id = route.params?.id
    const cardCount = deck !== null ? deck.cards.length : 0


    useFocusEffect(() => {
        loadDeck()
    })


    function removeDeck() {
        deleteDeck
    }

    function loadDeck() {
        getDeck(id).then(setDeck)
    }

    return (
        deck === null
            ? <Text>Loading</Text>
            : <View style={{ flex: 1 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 40, textAlign: 'center', fontWeight: 'bold', textTransform: 'uppercase', color: colors.primary }}>{deck.title}</Text>
                    <Text style={{ color: colors.medium, fontSize: 18 }}>{cardCount} question cards</Text>
                    {cardCount < 3 && <Text style={{ color: colors.medium }}>(You need at least 3 cards to start the quiz)</Text>}
                </ View>
                <View style={{ paddingHorizontal: 8 }}>
                    {cardCount > 2 && <RoundedButton onPress={() => navigation.navigate('Quiz', { deck: deck })} color={colors.primary} value="Start Quiz" />}
                    <RoundedButton onPress={() => navigation.navigate('NewCard', { id: deck.id })} color={colors.secondary} value="new card" />
                    <RoundedButton onPress={() => { deleteDeck(id).then(() => navigation.navigate('Home')) }} color={colors.danger} value="Delete deck" />
                </View>
            </View>
    )
}

export default DeckScreen
