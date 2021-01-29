import React from 'react'
import { TextInput } from 'react-native'

import { colors } from '../styles'

const StyledInput = ({ onChange, placeHolder }) => {
    return (
        <TextInput placeholder={placeHolder}
            style={{
                borderColor: colors.accent,
                borderWidth: 4,
                borderRadius: 50,
                paddingHorizontal: 16,
                marginBottom: 8
            }}
            onChangeText={text => onChange(text)}
        />
    )
}

export default StyledInput
