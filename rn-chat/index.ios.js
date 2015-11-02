'use strict';

const USER_KEY  = '@CandyChat:username';
var React = require('react-native');
let Chat = require('./application/components/chatIOS');
let Signup = require('./application/components/signup');
var Meteor = require('meteor-client');
let Colors = require('./application/styles/Colors');
// This implements `Meteor.connect`
var DDP = require('ddp');
var Mongo = require('mongo');
let Messages = new Mongo.Collection('messages');

var {
  AppRegistry,
  StyleSheet,
  AsyncStorage,
  Text,
  ActivityIndicatorIOS,
  View,
  Navigator
} = React;

class CCNative extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      messages: [],
      emojis: [],
      photos: [],
      initialRoute: '',
      animating: true,
    }
  }
  async _loadInitialState() {
    try {
      let user = await AsyncStorage.getItem(USER_KEY);
      let loggedInUser = JSON.parse(user);
      console.log('USER', user);
      if (loggedInUser && loggedInUser.username ) {
        // TODO: login with Meteor.call to subscribe to data
        console.log('FOUND USER');
        this.setState({initialRoute: 'Chat'});
      } else {
        console.log('must select a username');
        this.setState({initialRoute: 'Signup'});
        Navigator.push({
          name: 'Signup'
        })
      }
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }
  componentDidMount(){
    this._loadInitialState();
    let self = this;
    let p1 = new Promise((resolve, reject) => {
      Meteor.connect('ws://192.168.1.3:3000/websocket')
      Meteor.subscribe('messages');
      Meteor.subscribe('emojis');
      Meteor.subscribe('photos');
      console.log('CONNECTION', Meteor.connection);
      resolve(Meteor.connection);
    })
    .then((connection) => {

      function changeState(){
        self.setState({
          messages: connection._updatesForUnknownStores.messages,
          emojis: connection._updatesForUnknownStores.emojis,
          photos: connection._updatesForUnknownStores.photos,
        });
      }
      setInterval(changeState, 1000);
    });
  }
  render() {
    let indicator = <ActivityIndicatorIOS
                      animating={this.state.animating}
                      style={[styles.centering, {height: 150}]}
                      size="large"
                    />;
    return (
      <Navigator
        style={{flex: 1}}
        initialRoute={{name: this.state.initialRoute}}
        renderScene={(route, navigator) => {
          if (this.state.initialRoute == '') {
            return <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.blue}}>{indicator}</View>
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
    );
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
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  gray: {
    backgroundColor: '#cccccc',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('CCNative', () => CCNative);
