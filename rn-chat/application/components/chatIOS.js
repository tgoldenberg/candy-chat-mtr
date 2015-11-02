var React = require('react-native');
let Icon = require('react-native-vector-icons/MaterialIcons');
let Message = require('./messages/message');
let Emoji = require('./messages/emoji');
let Photo = require('./messages/photo');
let MessageForm = require('./forms/messageForm');
let PhotoForm = require('./forms/photoForm');
let EmojiForm = require('./forms/emojiForm');
let Colors = require('../styles/Colors');
let {
  AppRegistry,
  StyleSheet,
  CameraRoll,
  Text,
  ActivityIndicatorIOS,
  View,
  Image,
  ScrollView,
  TouchableHighlight,
  Navigator
} = React;


class Chat extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      type: 'MESSAGE',
      emojis: [],
      images: [],
      animating: true,
    };
  }
  //
  // selectForm(type) {
  //   switch(this.state.type) {
  //     case 'MESSAGE':
  //       return <MessageForm />
  //       break;
  //     case 'EMOJI':
  //       return <EmojiForm emojis={this.state.emojis} addEmoji={(emoji) => {
  //           let {emojis} = this.state;
  //           emojis.push(emoji);
  //           this.setState({emojis: emojis});
  //         }}/>
  //       break;
  //     case 'PHOTO':
  //       return <PhotoForm />
  //       break;
  //   }
  // }
  //
  sortData() {
    if (this.props.messages) {
      let {messages, photos, emojis} = this.props;
      console.log('PROPS', messages, photos, emojis);
      let content = [];
      messages.forEach((msg) => { content.push(msg); })
      emojis.forEach((msg) => { content.push(msg); })
      photos.forEach((msg) => { content.push(msg); })
      console.log(content.length);
      return content.sort((a,b) => { return a.fields.createdAt > b.fields.createdAt; });
    }
  }

  selectDataType(row, idx) {
    console.log('ROW', row)
    switch(row.fields.type) {
      case 'MESSAGE':
        return <Message message={row} key={idx} />
        break;
      case 'EMOJI':
        return <View></View>
        break;
      case 'PHOTO':
        return <Photo photo={row} key={idx} />
        break;
    }
  }
  storeImages(data){
    const assets = data.edges;
    const images = assets.map( asset => asset.node.image );
    this.setState({
        images: images,
    });
  }
  logImageError(err){
    console.log('ERR', err);
  }
  render() {
    console.log('IMAGES', this.state.images, CameraRoll);
    // let form = this.selectForm(this.state.type);
    let content = this.sortData().map((row, idx) => {
      return this.selectDataType(row, idx);
    });

    let indicator = <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center',}}>
                      <Text style={styles.fetching}>Fetching messages...</Text>
                      <ActivityIndicatorIOS
                      animating={this.state.animating}
                      style={[styles.centering, {height: 150}]}
                      size="large"
                      />
                    </View>;

    return (
      <View style={{backgroundColor: '#f7f7f7'}}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>CandyChat</Text>
        </View>
        <View style={styles.tabBarContainer}>
          <TouchableHighlight

            underlayColor='transparent'
            style={styles.tabBarButton}>
            <Icon name='insert-photo' size={75} style={styles.tabBarIcon}/>
          </TouchableHighlight>
          <TouchableHighlight underlayColor='transparent'>
            <Icon name='insert-emoticon' size={75} style={styles.tabBarIcon}/>
          </TouchableHighlight>
          <TouchableHighlight underlayColor='transparent'>
            <Icon name='comment' size={75} style={styles.tabBarIcon}/>
          </TouchableHighlight>
        </View>
        <ScrollView style={{flex: 1}}
          ref="scrollView"
          style={styles.scrollView}
          contentInset={{bottom:99}}
          keyboardShouldPersistTaps={false}
          automaticallyAdjustContentInsets={false}>
          {content.length > 0  ? content : indicator}
        </ScrollView>
      </View>
    )
  }
}

let styles = StyleSheet.create({
  titleContainer:{
    flex: 1,
    height: 70,
    backgroundColor: Colors.darkPurple,
    justifyContent: 'center',
  },
  title:{
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  tabBarContainer:{
    backgroundColor: Colors.red,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  scrollView: {
    backgroundColor: '#f7f7f7',
    height: 600,
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 0,
    paddingTop: 0
  },
  tabBarButton:{

  },
  tabBarIcon:{
    color: '#f7f7f7',
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
  fetching: {
    fontSize: 18,
    fontWeight: '300',
    color: '#777',
    marginTop: 20,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})
module.exports = Chat;
