/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

const USER_KEY  = '@CandyChat:username';
var React = require('react-native');
let Chat = require('./application/components/chat');
let Signup = require('./application/components/signup');
// var Meteor = require('meteor-client');
// This implements `Meteor.connect`
// var DDP = require('ddp');
// var Mongo = require('mongo');
// let Messages = new Mongo.Collection('messages');
let ddp = require('./application/config/ddp');
let _ = require('underscore');
var {
  AppRegistry,
  StyleSheet,
  AsyncStorage,
  Text,
  View,
  Navigator
} = React;

global.process = {};
global.process.nextTick = setImmediate;

class CCNative extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      messages: [],
      emojis: [],
      photos: [],
      initialRoute: '',
      connected: false,
    }
  }
  async _loadInitialState() {
    try {
      let user = await AsyncStorage.getItem(USER_KEY);
      let loggedInUser = JSON.parse(user);
      console.log('USER', user);
      if (loggedInUser && loggedInUser.username != undefined ) {
        // TODO: login with Meteor.call to subscribe to data
        console.log('FOUND USER', loggedInUser);
        this.setState({initialRoute: 'Chat'});
      } else {
        console.log('must select a username');
        this.setState({initialRoute: 'Signup'});
      }
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }
  messageSubscribe(){
    ddp.subscribe('messages', [])
      .then(() => {
        let messagesObserver = ddp.collections.observe(() => {
          let messages = [];
          if (ddp.collections.messages) {
            messages = ddp.collections.messages.find();
          }
          return messages;
        });

        this.setState({messagesObserver: messagesObserver});

        messagesObserver.subscribe((results) => {
          this.setState({messages: results});
        });
      });
  }
  componentDidMount(){
    // console.log('Global', global)
    this._loadInitialState();
    ddp.initialize()
      .then(() => {
        let state = { connected: true };
        this.setState(state);
        this.messageSubscribe();
        console.log('STATE', this.state);
      });
    // },

  //   let self = this;
  //   let p1 = new Promise((resolve, reject) => {
  //     Meteor.connect('ws://192.168.1.3:3000/websocket')
  //     Meteor.subscribe('messages');
  //     Meteor.subscribe('emojis');
  //     Meteor.subscribe('photos');
  //     console.log('CONNECTION', Meteor.connection);
  //     resolve(Meteor.connection);
  //   })
  //   .then((connection) => {
  //
  //     function changeState(){
  //       self.setState({
  //         messages: connection._updatesForUnknownStores.messages,
  //         emojis: connection._updatesForUnknownStores.emojis,
  //         photos: connection._updatesForUnknownStores.photos,
  //       });
  //     }
  //     setInterval(changeState, 1000);
  //   });
  }
  render() {
    console.log('ROUTE', this.state.initialRoute, this.state.connected);
    if (this.state.connected) {

      return (
        <Navigator
          style={{flex: 1}}
          initialRoute={{name: this.state.initialRoute}}
          renderScene={(route, navigator) => {
            if (this.state.initialRoute == '') {
              return <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}><Text>Loading...</Text></View>
            } else if (route.name == 'Chat') {
              console.log('ROUTE', route.name)
              return (
                <Chat
                  emojis={this.state.emojis}
                  photos={this.state.photos}
                  messages={this.state.messages}
                  nav={navigator} />
              );
            } else if(route.name == 'Signup') {
              console.log('ROUTE', route.name)
              return <Signup nav={navigator}/>
            } else if (this.state.initialRoute == 'Chat') {
              return (
                <Chat
                  emojis={this.state.emojis}
                  photos={this.state.photos}
                  messages={this.state.messages}
                  nav={navigator} />
              )
            }
          }}
          />
        )
    } else {
      return <View><Text>Waiting...</Text></View>
    }
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('CCNative', () => CCNative);
