import React, { useState, useEffect } from 'react'
import { Text, TouchableOpacity } from 'react-native'

import { colors } from '../styles'

const QuizCard = (props) => {
    const { card, open, setOpen } = props

    return (
        <TouchableOpacity style={[{ justifyContent: 'center' }, props.style]} onPress={() => setOpen(!open)}>
            <Text style={{ margin: 16, color: colors.primary, textTransform: 'uppercase', fontWeight: 'bold', textAlign: 'center', fontSize: 30 }}>{open ? card.answer : card.question}</Text>
            <Text style={{ textAlign: 'center', color: colors.medium }}>({open ? "Tap to see the question" : "Tap to see the answer"})</Text>
        </TouchableOpacity>
    )
}

export default QuizCard
