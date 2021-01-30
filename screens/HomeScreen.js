import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'

import ListDivider from '../components/ListDivider';
import { getDecks, deleteAllDecks } from '../API'
import Deck from '../components/Deck'
import RoundedButton from '../components/RoundedButton'
import { colors } from '../styles'


const HomeScreen = ({ navigation }) => {
    const [decks, setDecks] = useState({})
    const deckKeys = Object.keys(decks)

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            reloadDecks()
        });

        return unsubscribe;
    }, [navigation]);

    function reloadDecks() {
        getDecks().then(setDecks)
    }

    const ResetDecks = async () => {
        try {
            deleteAllDecks().then(reloadDecks)
        } catch (e) {
            // saving error
        }
    }

    return (
        <View style={style.container}>

            <FlatList style={{ flex: 1 }}
                ListEmptyComponent={() => (<Text style={[style.subtitle, { marginTop: 24, textAlign: 'center' }]}>No decks found. Try adding some first.</Text>)}
                data={deckKeys}
                renderItem={({ item }) => (<Deck deck={decks[item]} navigation={navigation} />)}
                keyExtractor={key => key}
                ItemSeparatorComponent={ListDivider}
            />
            <View style={{ paddingHorizontal: 8, backgroundColor: colors.white }}>
                <RoundedButton value="Add deck" onPress={() => navigation.navigate('NewDeck')} color={colors.primary} />
                <RoundedButton value="Delete decks" onPress={() => ResetDecks()} color={colors.danger} />



                {/* <RoundedButton value="get notifications" onPress={() => getAllNotifications().then((a) => alert(JSON.stringify(a)))} color={colors.danger} /> */}
                {/* <RoundedButton value="delete notifications" onPress={() => cancelAllNotifications().then(alert("Done!"))} color={colors.danger} /> */}
                {/* <RoundedButton value="Shedule notifications" onPress={() => scheduleNotifications().then(alert("Done!"))} color={colors.danger} /> */}
            </View>


        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
    },

    subtitle: {
        fontWeight: '700',
        fontSize: 16
    }
})

export default HomeScreen
