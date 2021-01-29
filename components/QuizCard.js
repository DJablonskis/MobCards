import React, { useState } from 'react'
import { Text, TouchableOpacity } from 'react-native'

const QuizCard = (props) => {
    const { cards, page } = props
    const [open, setOpen] = useState(false)
    const c = cards[page]
    return (
        <TouchableOpacity onPress={() => setOpen(!open)}>
            <Text>{open ? c.question : c.answer}</Text>
        </TouchableOpacity>
    )
}

export default QuizCard
