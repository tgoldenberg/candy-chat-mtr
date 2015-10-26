class Chat extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      type: 'MESSAGE',
      emojis: [],
    }
  }
  componentDidMount(){
    this.scrollDown();
  }
  scrollDown(){
    let scrollHeight = React.findDOMNode(this.refs.messagesHolder).scrollHeight;
    $(React.findDOMNode(this.refs.messagesHolder)).scrollTop(scrollHeight);
  }
  rawMarkup(message) {

    var rawMarkup = Marked(message, {sanitize: true});
    return { __html: rawMarkup };
  }
  render(){
    let form;
    switch(this.state.type) {

      case 'VIDEO':
        form = <form className="messages-form" onSubmit={(e) => {
                  e.preventDefault();
                  let username = Meteor.user().username;
                  let message = React.findDOMNode(this.refs.message).value;
                  React.findDOMNode(this.refs.message).value = '';
                  let options = {
                    author: username,
                    message: message,
                    createdAt: new Date()
                  }
                  if (message.length) {
                    let p1 = new Promise((resolve, reject) => {
                      Meteor.call('messageCreate', options, function(msg) {
                        resolve(msg)
                      });
                    })
                    .then((msg) => {
                      console.log('msg', message);
                      this.scrollDown();
                    });
                  }
                }}>
                <input type="text" ref='message' className='form-control' placeholder='VIDEO'/>
                <input type="submit" className='btn btn-lg' value='SEND'/>
              </form>
      break;
      case 'PHOTO':
        form = <form className="messages-form" onSubmit={(e) => {
                e.preventDefault();
                let author = Meteor.user().username;
                let imageSource = React.findDOMNode(this.refs.imageSource);
                let imageUrl = React.findDOMNode(this.refs.imageSource).src;
                if (imageUrl != "") {
                  let options = {
                    imageUrl: imageUrl,
                    author: author,
                    type: 'PHOTO',
                    createdAt: new Date()
                  };
                  let p1 = new Promise((resolve, reject) => {
                    Meteor.call('photoCreate', options, function(msg) {
                      resolve(msg)
                      imageSource.src = '';
                    });
                  })
                  .then((msg) => {
                    this.scrollDown();
                  })
                  .catch((err) => {
                    console.log('ERR', err);
                  })
                }
                }}>

              <input type="file" ref="imageUploader" onChange={() => {
                  let files = React.findDOMNode(this.refs.imageUploader).files;
                  let preview = React.findDOMNode(this.refs.imageSource);
                  let file = files[0];
                  console.log('FILE', file);
                  if ( file == null) {
                    alert('NO file selected');
                  } else {
                    // TODO: upload image to AWS and get URL
                    AWS.config.update({accessKeyId: Meteor.settings.public.AWS_ACCESS_TOKEN, secretAccessKey: Meteor.settings.public.AWS_SECRET_KEY});
                    AWS.config.region = 'us-east-1';
                    var s3 = new AWS.S3({params: {Bucket: 'speakitlanguages'}});
                    let params = { Key: file.name, ContentType: file.type, Body: file };
                    s3.upload(params, function(err, data) {
                      console.log('DATA', data, err);
                      preview.src = data.Location;
                    });
                  }
                }}/>
              <img ref="imageSource" className="image-preview" src=""/>
              <input type="submit" className='btn btn-lg' value='SEND'/>
            </form>
      break;
      case 'EMOJI':
        form = <form className="messages-form" onSubmit={(e) => {
                  e.preventDefault();
                  let {emojis} = this.state;

                  let options = {
                    emojis: emojis,
                    type: 'EMOJI',
                    author: Meteor.user().username,
                    createdAt: new Date()
                  };
                  let p1 = new Promise((resolve, reject) => {
                    Meteor.call('emojiCreate', options, function(msg) {
                      resolve(msg)
                    });
                  })
                  .then((msg) => {
                    this.scrollDown();
                    this.setState({emojis: []});
                  })
                  .catch((err) => {
                    console.log('ERR', err);
                  })
                }}>
                <div className="emoji-container">
                  <div className="emoji-wrapper">
                    <i className="mdi mdi-emoticon" onClick={() => {
                        let {emojis} = this.state;
                        emojis.push('mdi-emoticon');
                        this.setState({emojis: emojis});
                        }}></i>
                    <i className="mdi mdi-emoticon-cool" onClick={() => {
                        let {emojis} = this.state;
                        emojis.push('mdi-emoticon-cool');
                        this.setState({emojis: emojis});
                        }}></i>
                    <i className="mdi mdi-emoticon-devil" onClick={() => {
                        let {emojis} = this.state;
                        emojis.push('mdi-emoticon-devil');
                        this.setState({emojis: emojis});
                        }}></i>
                    <i className="mdi mdi-emoticon-happy" onClick={() => {
                        let {emojis} = this.state;
                        emojis.push('mdi-emoticon-happy');
                        this.setState({emojis: emojis});
                        }}></i>
                    <i className="mdi mdi-emoticon-neutral" onClick={() => {
                        let {emojis} = this.state;
                        emojis.push('mdi-emoticon-neutral');
                        this.setState({emojis: emojis});
                        }}></i>
                    <i className="mdi mdi-emoticon-poop" onClick={() => {
                        let {emojis} = this.state;
                        emojis.push('mdi-emoticon-poop');
                        this.setState({emojis: emojis});
                        }}></i>
                    <i className="mdi mdi-emoticon-sad" onClick={() => {
                        let {emojis} = this.state;
                        emojis.push('mdi-emoticon-sad');
                        this.setState({emojis: emojis});
                        }}></i>
                    <i className="mdi mdi-emoticon-tongue" onClick={() => {
                        let {emojis} = this.state;
                        emojis.push('mdi-emoticon-tongue');
                        this.setState({emojis: emojis});
                        }}></i>
                  </div>
                  <div className='form-control emoji-input'>
                    {this.state.emojis.map((emoji, idx) => {
                      let klass = `mdi ${emoji}`;
                      return <i className={klass} key={idx}></i>;
                    })}
                  </div>
                </div>
                <input type="submit" className='btn btn-lg' value='SEND'/>
              </form>
      break;
      case 'MESSAGE':
        form = <form className="messages-form" onSubmit={(e) => {
                  e.preventDefault();
                  let username = Meteor.user().username;
                  let message = React.findDOMNode(this.refs.message).value;
                  React.findDOMNode(this.refs.message).value = '';
                  let options = {
                    author: username,
                    message: message,
                    type: 'MESSAGE',
                    createdAt: new Date()
                  }
                  if (message.length) {
                    let p1 = new Promise((resolve, reject) => {
                      Meteor.call('messageCreate', options, function(msg) {
                        resolve(msg)
                      });
                    })
                    .then((msg) => {
                      console.log('msg', message);
                      this.scrollDown();
                    })
                  }
                }}>
                <input type="text" ref='message' className='form-control' placeholder='MESSAGE'/>
                <input type="submit" className='btn btn-lg' value='SEND'/>
              </form>
          break;
    }

    let content = [];
    console.log('PHOTOS', this.props.photos);
    this.props.messages.forEach((msg) => { content.push(msg);})
    this.props.emojis.forEach((msg) => { content.push(msg);})
    this.props.photos.forEach((photo) => { content.push(photo);});
    content = content.sort((a, b) => {
      return a.createdAt > b.createdAt;
    });

    console.log('CONTENT', content);
    content = content.map((row, idx) => {
      if (row.type == 'MESSAGE') {
        return (
          <div className='message-holder' key={idx}>
            <i className="mdi mdi-account-box"></i>
            <div className="message-content">
              <div className='message-bubble'>
                <p>
                  <span dangerouslySetInnerHTML={this.rawMarkup(row.message)} />
                </p>
              </div>
              <br/>
              <p className="message-details">by {row.author}</p>
              <p className="message-details">sent on {row.createdAt.toLocaleDateString()}</p>
            </div>
            <br/>
          </div>
        )
      } else if (row.type == 'EMOJI') {
        return (
          <div className='message-holder' key={idx}>
            <i className="mdi mdi-account-box"></i>
            <div className="message-content">
              <div className='message-bubble'>
                <p>
                  {row.emojis.map((emoji, idx) => {
                    let klass = `mdi ${emoji}`;
                    return (
                      <i className={klass}></i>
                    );
                  })}
                </p>
              </div>
              <br/>
              <p className="message-details">by {row.author}</p>
              <p className="message-details">sent on {row.createdAt.toLocaleDateString()}</p>
            </div>
            <br/>
          </div>
        )
      } else if (row.type == 'PHOTO') {
        return (
          <div className='message-holder' key={idx}>
            <i className="mdi mdi-account-box"></i>
            <div className="message-content">
              <img src={row.imageUrl} className="image-preview" />
              <br/>
              <p className="message-details">by {row.author}</p>
              <p className="message-details">sent on {row.createdAt.toLocaleDateString()}</p>
            </div>
            <br/>
          </div>
        )
      }
    })

    return (
      <div className="messages-page">
        <div className="mainTitle">
          <p className='title'>Candy Chat</p>
        </div>
        <div className="option-bar">
          <i className="mdi mdi-camera" onClick={() => {
              this.setState({type: 'PHOTO'});
            }}></i>
          {/*<i className="mdi mdi-camcorder" onClick={() => {
              this.setState({type: 'VIDEO'});
            }}></i>*/}
          <i className="mdi mdi-comment-text" onClick={() => {
              this.setState({type: 'MESSAGE'});
            }}></i>
          <i className="mdi mdi-emoticon-happy" onClick={() => {
              this.setState({type: 'EMOJI'});
            }}></i>
        </div>
        <div className="messages" ref="messagesHolder">
          {content}
        </div>
        {form}
      </div>
    )
  }
}


Template.chat.helpers({
  Chat: function() {
    return Chat;
  },
  messages: function() {
    return Messages.find().fetch();
  },
  emojis: function() {
    return Emojis.find().fetch();
  },
  photos: function() {
    return Photos.find().fetch();
  }
})
