import React, { useState } from 'react'
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'

import { addNewDeck } from '../API'
import { colors } from '../styles'
import RoundedButton from '../components/RoundedButton'
import StyledInput from '../components/StyledInput'


const NewDeckScreen = ({ navigation }) => {
    const [value, setValue] = useState("")

    const onSubmit = () => {
        if (value.trim() !== "") {
            addNewDeck(value).then(id => {
                navigation.replace("Deck", { id })
            })
        }
        else {
            alert("The deck name can not be empty!")
        }
    }

    return (
        <View style={{ flex: 1, paddingHorizontal: 10, justifyContent: 'center' }}>
            <Text style={styles.title}>Give your new deck a name</Text>
            <StyledInput placeHolder="Deck name" onChange={setValue}
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
