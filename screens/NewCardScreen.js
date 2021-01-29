import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { addNewCard } from '../API'
import RoundedButton from '../components/RoundedButton'
import { colorPrimary, colorSecondary, colorDanger, colorAccent } from '../styles'

const NewCardScreen = ({ navigation, route }) => {
    const [question, setQuestion] = useState("")
    const [answer, setAnswer] = useState("")

    const onSubmit = () => {
        addNewCard(route.params.id, { question, answer }).then(navigation.goBack())
    }

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={styles.title}>Question:</Text>
            <TextInput
                style={styles.input}
                onChangeText={text => setQuestion(text)}
                value={question}
            />
            <Text style={styles.title}>Answer:</Text>
            <TextInput
                style={styles.input}
                onChangeText={text => setAnswer(text)}
                value={answer}
            />
            <RoundedButton value="Add new card" color={colorPrimary} onPress={() => onSubmit()} />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        width: '90%',
        borderColor: colorAccent,
        borderWidth: 4,
        borderRadius: 50,
        margin: 4,
        paddingHorizontal: 16
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        margin: 6
    }
})

export default NewCardScreen
