import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

const STORAGE_KEY = '@decks'
const NOTIFICATION_KEY = '@notifications'

const HOUR = 16
const MINUTE = 0

const ID = () => {
    let str = Date.now().toString(36)
    return str.substr(2, str.length) + "_" + Math.random().toString(36).substr(2, 9)
}

export const cancelAllNotifications = async () => {
    try {
        await Notifications.cancelAllScheduledNotificationsAsync()
    }
    catch (e) {
        console.error(e)
    }
}

export const getAllNotifications = async () => {
    try {
        return await Notifications.getAllScheduledNotificationsAsync()
    }
    catch (e) {
        console.error(e)
    }
}

export const sheduleNotifications = async () => {

    Notifications.setNotificationHandler({
        handleNotification: async () => {
            return {
                shouldShowAlert: true,
                shouldPlaySound: true,
                shouldSetBadge: false,
            };
        },
    });

    try {
        const identifier = Notifications.scheduleNotificationAsync({
            content: {
                title: 'Time to refresh your memory?',
                body: "👋 You have not taken a quiz today! You should test yourself daily!"
            },
            trigger: {

                repeats: true,
                hour: HOUR,
                minute: MINUTE
            }
        });
        await AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(identifier))
        return identifier
    }
    catch (e) {
        console.error(e)
    }
}

export const getNextTriggerDate = async () => {
    try {
        const nextTriggerDate = await Notifications.getNextTriggerDateAsync({
            repeats: true,
            hour: HOUR,
            minute: MINUTE
        });
        console.log(nextTriggerDate)
        return nextTriggerDate === null ? 'No next trigger date' : new Date(nextTriggerDate).toDateString()
    } catch (e) {
        console.warn(`Couldn't have calculated next trigger date: ${e}`);
    }
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

        return id
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




