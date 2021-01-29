import React, { useState } from 'react'
import { View, Text } from 'react-native'



import QuizCard from '../components/QuizCard'
import RoundedButton from '../components/RoundedButton'
import { colors } from '../styles'

const QuizScreen = ({ route }) => {

    const [score, setScore] = useState(0)
    const [page, setPage] = useState(0)

    const { cards } = route.params.deck

    const submit = (correct) => {
        if (correct) {
            setScore(score + 1)
        }
        setPage(page + 1)
    }

    const reset = () => {
        setScore(0)
        setPage(0)
    }

    return (
        (cards.length > page)
            ? <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 10, paddingBottom: 20 }}>
                <Text style={{ color: colors.dark, fontWeight: 'bold', padding: 8 }}>Question {page + 1} of {cards.length}</Text>
                <QuizCard style={{ flex: 1 }} card={cards[page]} />
                <View>
                    <RoundedButton onPress={() => submit(true)} color={colors.primary} value="Correct" />
                    <RoundedButton onPress={() => submit(false)} color={colors.danger} value="Wrong" />
                </View>
            </View>
            : <View style={{ flex: 1, paddingHorizontal: 10, paddingBottom: 20 }}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize: 32, textAlign: 'center', color: colors.primary }}>Your score: {score}</Text>
                    <Text style={{ fontSize: 24, textAlign: 'center', color: colors.medium }}>({(100.0 / cards.length * score).toFixed(2)}%)</Text>
                </View>
                <RoundedButton onPress={() => reset()} color={colors.secondary} value="Retry?" />
            </View >
    )
}

export default QuizScreen
