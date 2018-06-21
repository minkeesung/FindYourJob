import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { Icon } from 'react-native-elements'

import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react'
// import store from './store';
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import SettingsScreen from './screens/SettingsScreen';
import ReviewScreen from './screens/ReviewScreen';


const ReviewStack = createStackNavigator({
  review: ReviewScreen,
  settings: SettingsScreen
},{
  tabBarOptions: {
    showIcon: true }
  }
)

const MainStack = createBottomTabNavigator({
  map: MapScreen,
  deck: DeckScreen,
  review: ReviewStack
},{
  tabBarOptions: {
    labelStyle: { fontSize: 12 },
    tabBarPosition: 'top',
    showIcon: true,
    lazy: false
  },
  navigationOptions: {
    tabBarIcon: ({ tintColor }) => {
      return <Icon name="favorite" size={30} color={tintColor}/>
    }
  }
})

const RootStack =  createBottomTabNavigator({
  welcome: WelcomeScreen,
  auth: AuthScreen,
  main: MainStack
}, {
  navigationOptions: {
    tabBarVisible: false,
    lazy: false,
    initialRouteName: 'welcome'
  }
})

export default class App extends React.Component {
  debugger
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RootStack />
        </PersistGate>
      </Provider>
    )
  }
}
