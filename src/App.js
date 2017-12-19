import React, { Component } from 'react'
import { View } from 'react-native'
import firebase from 'firebase'
import { Card, CardSection, Header, Button, Spinner } from './components/common'
import LoginForm from './components/LoginForm'

class App extends Component {
  state = { loggedIn: null }

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCaNDWdU_0mckYW84zFnJzmo9wGb7_lyp0',
      authDomain: 'auth-30392.firebaseapp.com',
      databaseURL: 'https://auth-30392.firebaseio.com',
      projectId: 'auth-30392',
      storageBucket: 'auth-30392.appspot.com',
      messagingSenderId: '405376283935'
    })

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user)
        this.setState({loggedIn: true})
      } else {
        this.setState({loggedIn: false})
      }
    })
  }

  renderContent() {
    switch(this.state.loggedIn) {
      case true:
        return (
          <View style={{flexDirection: 'row'}}>
            <Button onPress={() => firebase.auth().signOut()}>
              Log Out
            </Button>
          </View>
        )
      case false:
        return <LoginForm />
      default:
        return (
          <View style={styles.spinnerStyle}>
            <Spinner size="large" />
          </View>
        )
    }
  }

  render() {
    return (
      <View>
        <Header headerText='Authentication' />
        {this.renderContent()}
      </View>
    )
  }
}

const styles = {
  spinnerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  }
}


export default App