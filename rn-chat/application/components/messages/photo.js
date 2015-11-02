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

class Photo extends React.Component{
  render(){
    let photo = this.props.photo.fields;
    console.log('PHOTO', photo);
    return (
      <View style={styles.messageContainer}>
        <Icon name='account-box' size={50} style={styles.accountIcon}/>
        <View style={styles.messageContent}>
          <View style={styles.messageBubble}>
            <Image source={{uri: photo.imageUrl}} style={styles.image}/>
          </View>
          <Text style={styles.messageInfo}>by {photo.author}</Text>
          <Text style={styles.messageInfo}>sent on {photo.createdAt.toLocaleDateString()}</Text>
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
  image: {
    width: 70,
    height: 70,
    borderRadius: 4,
  },
  accountIcon:{
    color: Colors.darkBlue,
  },
  messageContent:{},
  messageBubble:{
    padding: 10,
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

module.exports = Photo;
