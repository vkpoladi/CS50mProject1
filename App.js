import React from 'react';
import { StyleSheet, Text, View, Button, TextInput} from 'react-native';
import {vibrate} from './utils'


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  count: {
    fontSize: 48
  },
  space: {
    width:30,
    height:30
  },
  status: {
    backgroundColor: 'black',
    color: 'white',
    fontSize: 100
  }
})

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      minutes: 25*60,
      seconds: 25*60,
      study: true,
      status: 'WORK',
      timerActive: false,
      studyTime: 25,
      restTime: 5,
      studyText: '',
      restText: ''
    }
  }

  componentDidMount() {
    let interval = setInterval(() => this.decrement(),1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  decrement = () => {
    if (this.state.timerActive) {
      if (this.state.minutes > 0) {
        this.setState(prevState => ({
          minutes: prevState.minutes - 1,
          seconds: prevState.seconds - 1,
        }))
      } else{
        vibrate()
        this.setState(prevState => ({
          study: !prevState.study
        }))
        if (this.state.study) {
          this.setState(prevState => ({
            minutes: 25*60,
            seconds: 25*60,
            timerActive: false
          }))
        } else {
          this.setState(prevState => ({
            minutes: 5*60,
            seconds: 5*60,
            timerActive: false
          }))
        }
      }
    }
    if (this.state.study) {
      this.setState(prevState => ({
        status: 'WORK'
      }))
    } else if (!this.state.study) {
      this.setState(prevState => ({
        status: 'REST'
      }))
    }
  }
  startTimer = () => {
    this.setState(prevState => ({
      timerActive: true
    }))
  }

  stopTimer = () => {
    this.setState(prevState => ({
      timerActive: false
    }))
  }

  resetTimer = () => {
    if (this.state.study) {
      this.setState(prevState => ({
        minutes: 25*60,
        seconds: 25*60,
        timerActive: false
      }))
    } else {
      this.setState(prevState => ({
        minutes: 5*60,
        seconds: 5*60,
        timerActive: false
      }))
    }
  }

  setStudyTime = value => {
    this.setState(prevState => ({
      studyTime: value
    }))
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.status}>{this.state.status}</Text>
        <View style={styles.space}></View>
        <Text style={styles.count}>{Math.floor(this.state.minutes/60)}:{((String)(Math.floor(this.state.seconds%60))).padStart(2,'0')}</Text>
        <View style={styles.space}></View>
        <Button style={styles.button} title="Start" onPress={this.startTimer}></Button>
        <View style={styles.space}></View>
        <Button title="Stop" onPress={this.stopTimer}></Button>
        <View style={styles.space}></View>
        <Button title="Reset" onPress={this.resetTimer}></Button>
        <View style={styles.space}></View>
      </View>
    );
  }
}


