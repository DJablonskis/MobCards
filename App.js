import React, { useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import HomeScreen from "./screens/HomeScreen";
import NewDeckScreen from './screens/NewDeckScreen'
import DeckScreen from "./screens/DeckScreen";
import NewCardScreen from "./screens/NewCardScreen";
import QuizScreen from "./screens/QuizScreen";

import { colors } from './styles'
import { notificationsInitialised, scheduleNotifications } from './API'

const Stack = createStackNavigator();


export default function App() {


  //Checks for set notifications on startup
  useEffect(() => {
    notificationsInitialised().then((set) => {
      console.log("Identifier found?", set)
      if (!set) {
        scheduleNotifications()
      }
    })

  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen}
          options={{
            headerStyle: { backgroundColor: colors.accent, },
            title: "Available decks"
          }}
        />
        <Stack.Screen name="NewDeck" component={NewDeckScreen}
          options={{
            headerStyle: { backgroundColor: colors.accent, },
            title: "Add new deck"
          }} />
        <Stack.Screen name="Deck" component={DeckScreen}
          options={{
            headerStyle: { backgroundColor: colors.accent, },
            title: "Deck review"
          }} />
        <Stack.Screen name="NewCard" component={NewCardScreen}
          options={{
            title: "New card",
            headerStyle: { backgroundColor: colors.accent }
          }} />
        <Stack.Screen name="Quiz" component={QuizScreen}
          options={({ route }) => ({
            title: "Quiz: " + route.params.deck.title,
            headerStyle: { backgroundColor: colors.accent, }
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>)
}


