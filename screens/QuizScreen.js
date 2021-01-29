import React, { useState } from 'react'
import { View, Text } from 'react-native'
import QuizCard from '../components/QuizCard'
import RoundedButton from '../components/RoundedButton'
import { colorPrimary, colorSecondary, colorDanger, colorAccent } from '../styles'


const QuizScreen = ({ navigation, route }) => {
    const [score, setScore] = useState(0)
    const [page, setPage] = useState(0)

    const { cards, title } = route.params.deck

    const submit = (correct) => {
        if (correct) {
            setScore(score + 1)
        }
        setPage(page + 1)
    }

    if (cards.length < 3) {
        return <View><Text>You need at least 3 cards to start a quiz</Text></View>
    }

    return (
        (cards.length > page)
            ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <QuizCard cards={cards} page={page} />
                <View style={{ alignSelf: 'center' }}>
                    <RoundedButton onPress={() => submit(true)} color={colorPrimary} value="Correct" />
                    <RoundedButton onPress={() => submit(false)} color={colorDanger} value="Wrong" />
                </View>

            </View>
            : <View>
                <Text>Your score: {score}</Text>
            </View>
    )
}

export default QuizScreen
