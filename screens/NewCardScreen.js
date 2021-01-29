import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { addNewCard } from '../API'
import RoundedButton from '../components/RoundedButton'
import StyledInput from '../components/StyledInput'
import { colors } from '../styles'

const NewCardScreen = ({ navigation, route }) => {
    const [question, setQuestion] = useState("")
    const [answer, setAnswer] = useState("")
    const deckName = route.params.name

    const onSubmit = () => {
        if (question.trim() !== "" && answer.trim() !== "") {
            addNewCard(route.params.id, { question, answer }).then(navigation.goBack())
        } else {
            alert("Question and answer can not be empty!")
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 10 }}>
            <Text style={styles.title}>Adding new question card to '{deckName}' deck</Text>
            <StyledInput placeHolder="Question" onChange={setQuestion} />
            <StyledInput placeHolder="Answer" onChange={setAnswer} />
            <RoundedButton value="Add new card" color={colors.primary} onPress={() => onSubmit()} />
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        color: colors.primary,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 32,
        marginBottom: 16
    },
})

export default NewCardScreen
