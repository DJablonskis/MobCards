import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

export const STORAGE_KEY = '@decks'
const NOTIFICATION_KEY = '@notifications'

const HOUR = 16
const MINUTE = 0

const ID = () => {
    let str = Date.now().toString(36)
    return str.substr(2, str.length) + "_" + Math.random().toString(36).substr(2, 9)
}

function setHandler() {
    Notifications.setNotificationHandler({
        handleNotification: async () => {
            return {
                shouldShowAlert: true,
                shouldPlaySound: true,
                shouldSetBadge: false,
            };
        },
    });
}

export const notificationsInitialised = async () => {
    try {
        const identifier = await AsyncStorage.getItem(NOTIFICATION_KEY)
        //Checks if any notifications where set already
        return identifier !== null
    } catch (e) {
        console.error(e)
        return false
    }
}



//METHOD FOR DEBUGING, NOT USED IN APPLICATION
export const cancelAllNotifications = async () => {
    try {
        await Notifications.cancelAllScheduledNotificationsAsync()
        await AsyncStorage.removeItem(NOTIFICATION_KEY)
    }
    catch (e) {
        console.error(e)
    }
}

//METHOD FOR DEBUGING, NOT USED IN APPLICATION
export const getAllNotifications = async () => {
    try {
        return await Notifications.getAllScheduledNotificationsAsync()
    }
    catch (e) {
        console.error(e)
    }
}

export const scheduleNotifications = async () => {
    try {
        const settings = await Notifications.getPermissionsAsync()

        // NOTIFICATIONS PERMISSION Missing?
        if (!(settings.granted || settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL)) {

            //ASKING FOR PERMISSION
            const permissionAproved = await Notifications.requestPermissionsAsync({
                ios: {
                    allowAlert: true,
                    allowBadge: true,
                    allowSound: true,
                    allowAnnouncements: true,
                },
                android: {}
            })

            //PERMISSION NOT GRANTED CANCELING
            if (!permissionAproved) {
                return false
            }
        }

        setHandler()

        //CANCEL ALL NOTIFICATIONS JUST IN CASE
        await Notifications.cancelAllScheduledNotificationsAsync()

        // Adding notification for tomorrow
        // Adds it in 24h time or on set hour depending on when the quiz was complete 

        const currentTime = new Date()
        const hours = currentTime.getHours()
        const minutes = currentTime.getMinutes()

        //SETTING TRIGGER FOR 24h if prefered nofification time is more than 24hours. 
        // Otherwise setting it to time set in constants
        const h = hours < HOUR ? hours : HOUR
        const m = hours < HOUR ? minutes : MINUTE

        const identifier = await Notifications.scheduleNotificationAsync({
            content: {
                title: 'Time to refresh your memory?',
                body: "👋 You have not taken a quiz today! You should test yourself daily!"
            },
            trigger: {
                repeats: true,
                hour: h,
                minute: m,
            }
        });
        console.log("Notification set ", identifier)
        console.log(`next notification will happen at ${h}:${m}`)
        //Saving notification identifier
        await AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(identifier))
        return true
    }
    catch (e) {
        console.error(e)
        return false
    }
}


export const getDecks = async () => {
    try {
        const decks = await AsyncStorage.getItem(STORAGE_KEY)
        let parsedDecks = decks !== null ? JSON.parse(decks) : {};
        return parsedDecks
    } catch (e) {
        console.error(e)
        // error reading value
        return {}
    }
}

export const getDeck = async (id) => {
    try {
        const decks = await AsyncStorage.getItem(STORAGE_KEY)
        let parsedDecks = decks !== null ? JSON.parse(decks) : null;
        if (parsedDecks && parsedDecks[id]) {
            return parsedDecks[id]
        }
        else return null
    } catch (e) {
        console.error(e)
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

export const deleteAllDecks = async () => {
    try {
        await AsyncStorage.setItem(STORAGE_KEY, "{}")
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




