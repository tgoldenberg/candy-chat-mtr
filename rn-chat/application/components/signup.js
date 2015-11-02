let React = require('react-native');
let Colors = require('../styles/Colors');
const USER_KEY  = '@CandyChat:username';
let {
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  AsyncStorage,
  TextInput,
  Text,
  ActivityIndicatorIOS,
  View,
} = React;

class Signup extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      code: '',
    }
  }

  handleChange(e) {
    this.setState({username: e.nativeEvent.text});
  }
  handlePress() {
    AsyncStorage.setItem(USER_KEY, JSON.stringify({username: this.state.username, code: this.state.code, password: this.state.password}));
    if (this.state.username != "") {
      // TODO: create user with Meteor call
      this.props.nav.push({
        name: 'Chat'
      });
    }
  }
  render() {
    console.log('PROPS', this.props);
    return (
      <ScrollView
        contentContainerStyle={styles.scrollView}
        contentInset={{bottom:49}}
        keyboardShouldPersistTaps={false}
        automaticallyAdjustContentInsets={false}
        >
        <Text style={styles.mainTitle}>CandyChat</Text>
        <TextInput
          style={styles.searchInput}
          placeholder={"Your name"}
          value={this.state.username}
          onChange={(e) => {
            this.setState({username: e.nativeEvent.text})
          }}
         />
        <TextInput
          style={styles.searchInput}
          secureTextEntry={true}
          placeholder={"Code"}
          value={this.state.code}
          onChange={(e) => {
            this.setState({code: e.nativeEvent.text})
          }}
         />
        <TextInput
          style={styles.searchInput}
          secureTextEntry={true}
          placeholder={"Password"}
          value={this.state.password}
          onChange={(e) => {
            this.setState({password: e.nativeEvent.text})
          }}
         />
        <TouchableHighlight
          style={styles.button}
          underlayColor={Colors.lightBlue}
          onPress={this.handlePress.bind(this)}>
          <Text style={styles.buttonText}> REGISTER </Text>
        </TouchableHighlight>
        <Text style={styles.buttonText}>Username: {this.state.username}</Text>
      </ScrollView>
    )
  }
};

let styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.darkBlue,
    height: 600,
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 0,
    paddingTop: 0,
    flex: 1,
  },
  button: {
    height: 70,
    flexDirection: 'row',
    backgroundColor: Colors.blue,
    borderColor: Colors.lightBlue,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },

  buttonText: {
    fontSize: 23,
    color: 'white',
    alignSelf: 'center'
  },
  searchInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#b4b4b4',
    borderRadius: 8,
    color: 'white',
    backgroundColor: Colors.lightBlue,
  },
  mainTitle: {
   fontSize: 25,
   textAlign: 'center',
   color: '#fff',
   marginBottom: 10,
   fontWeight: 'bold',
   letterSpacing: 1,
   marginTop: 30,
 },
 searchButtonText: {
   fontSize: 25,
   color: 'white',
   alignSelf: 'center',
   fontWeight: 'bold'
 },
})

module.exports = Signup;
