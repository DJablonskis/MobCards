import React from 'react'
import { View, StyleSheet } from 'react-native'

const ListDivider = () => {
    return (
        <View style={styles.line} />
    )
}

const styles = StyleSheet.create({
    line: {
        width: '100%',
        height: 1,
        backgroundColor: '#696969'
    }
})


export default ListDivider
