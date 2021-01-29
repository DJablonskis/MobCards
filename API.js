import AsyncStorage from '@react-native-async-storage/async-storage';
const STORAGE_KEY = '@decks'

const ID = () => {
    let str = Date.now().toString(36)
    return str.substr(2, str.length) + "_" + Math.random().toString(36).substr(2, 9)
}


export const getDecks = async () => {
    try {
        const decks = await AsyncStorage.getItem(STORAGE_KEY)
        let parsedDecks = decks != null ? JSON.parse(decks) : {};
        return parsedDecks
    } catch (e) {
        // error reading value
        return {}
    }
}

export const getDeck = async (id) => {
    try {
        const decks = await AsyncStorage.getItem(STORAGE_KEY)
        let parsedDecks = decks != null ? JSON.parse(decks) : null;
        if (parsedDecks && parsedDecks[id]) {
            return parsedDecks[id]
        }
        else return null
    } catch (e) {
        return null
    }
}

export const deleteDeck = async (id) => {
    try {
        const decks = await AsyncStorage.getItem(STORAGE_KEY)
        const parsedDecks = decks != null ? JSON.parse(decks) : null;
        if (parsedDecks !== null && parsedDecks[id]) {
            delete parsedDecks[id]
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(parsedDecks))
        }

    } catch (e) {
        console.error(e)
    }
}
export const addNewDeck = async (title) => {
    const id = ID()
    const newDeck = {
        id,
        title,
        cards: []
    }
    try {
        const decks = await AsyncStorage.getItem(STORAGE_KEY)
        let parsedDecks = decks != null ? JSON.parse(decks) : {};
        parsedDecks[id] = newDeck;
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(parsedDecks))

        return parsedDecks
    } catch (e) {
        console.error(e)
        return null
    }
}

export const addNewCard = async (id, card) => {
    try {
        const decks = await AsyncStorage.getItem(STORAGE_KEY)
        const parsedDecks = decks != null ? JSON.parse(decks) : null;

        if (parsedDecks !== null && parsedDecks[id]) {
            parsedDecks[id].cards.push(card)
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(parsedDecks))
        }

    } catch (e) {
        console.error(e)
    }
}




