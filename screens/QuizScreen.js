import React, { useState } from 'react'
import { View, Text } from 'react-native'



import QuizCard from '../components/QuizCard'
import RoundedButton from '../components/RoundedButton'
import { colors } from '../styles'
import { scheduleNotifications } from '../API'

const QuizScreen = ({ navigation, route }) => {

    const [score, setScore] = useState(0)
    const [page, setPage] = useState(0)
    const [open, setOpen] = useState(false)

    const { cards } = route.params.deck

    const submit = (correct) => {
        setOpen(false)
        if (correct) {
            setScore(score + 1)
        }
        setPage(page + 1)
        if (page === cards.length - 1) {
            //END OFF QUIZ, UPDATING NOTIFICATION
            scheduleNotifications()
        }
    }

    const reset = () => {
        setScore(0)
        setPage(0)
    }

    if (cards.length === 0) {
        return (<View style={{ flex: 1, paddingHorizontal: 10, paddingBottom: 20 }}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize: 32, textAlign: 'center', color: colors.primary }}>You will need at least 1 card to try the quiz</Text>
            </View>
            <RoundedButton onPress={() => navigation.navigate('Deck', { id: route.params.deck.id })} color={colors.primary} value="Return to Deck" />
        </View >)
    }

    return (
        (cards.length > page)
            ? <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 10, paddingBottom: 20 }}>
                <Text style={{ color: colors.dark, fontWeight: 'bold', padding: 8 }}>Question {page + 1} of {cards.length}</Text>
                <QuizCard style={{ flex: 1 }} card={cards[page]} open={open} setOpen={setOpen} />
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
                <RoundedButton onPress={() => navigation.navigate('Deck', { id: route.params.deck.id })} color={colors.primary} value="Return to Deck" />
            </View >
    )
}

export default QuizScreen
