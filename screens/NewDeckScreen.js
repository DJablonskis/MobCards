import React, { useState } from 'react'
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'

import { addNewDeck } from '../API'
import { colors } from '../styles'
import RoundedButton from '../components/RoundedButton'


const NewDeckScreen = ({ navigation }) => {
    const [value, setValue] = useState("")

    const onSubmit = () => {
        addNewDeck(value).then(() => navigation.goBack())
    }

    return (
        <View style={{ flex: 1, paddingHorizontal: 10, justifyContent: 'center' }}>
            <Text style={styles.title}>Give your new deck a name</Text>
            <TextInput placeholder="Deck name"
                style={styles.input} onChangeText={text => setValue(text)}
                value={value}
            />
            <RoundedButton value="Create" onPress={() => onSubmit()} color={colors.primary} />
        </View>
    )

}

const styles = StyleSheet.create({
    input: {
        borderRadius: 30,
        borderWidth: 4,
        borderColor: colors.accent,
        paddingHorizontal: 16,
        paddingVertical: 4,
        marginBottom: 16

    },
    title: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: 16,
    }
})


export default NewDeckScreen
