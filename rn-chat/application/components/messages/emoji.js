var React = require('react-native');
let Icon = require('react-native-vector-icons/MaterialIcons');
let Colors = require('../../styles/Colors');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} = React;

class Emoji extends React.Component{
  render(){
    let emoji = this.props.emoji.fields;
    return (
      <View style={styles.messageContainer}>
        <Icon name='account-box' size={50} style={styles.accountIcon}/>
        <View style={styles.messageContent}>
          <View style={styles.messageBubble}>
            {emoji.emojis.map((emoji, index) => {
              let klass = `${emoji}`;
            })}
          </View>
          <Text style={styles.messageInfo}>by {emoji.author}</Text>
          <Text style={styles.messageInfo}>sent on {emoji.createdAt.toLocaleDateString()}</Text>
        </View>
      </View>

    );
  }
};

let styles = StyleSheet.create({
  messageContainer:{
    flex: 1,
    flexDirection: 'row',
    padding: 6,
  },
  accountIcon:{
    color: Colors.darkBlue,
  },
  messageContent:{},
  messageBubble:{
    backgroundColor: 'white',
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  messageText:{
    fontSize: 18,
    fontWeight: 'bold',
  },
  messageInfo:{
    fontSize: 14,
    fontWeight: '300',
  },
})


module.exports = Emoji;
