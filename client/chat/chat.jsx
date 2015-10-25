class Chat extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      type: 'MESSAGE',
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
                    })
                  }
                }}>
                <input type="text" ref='message' className='form-control' placeholder='VIDEO'/>
                <input type="submit" className='btn btn-lg' value='SEND'/>
              </form>
      break;
      case 'PHOTO':
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
                  })
                }
              }}>
              <input type="text" ref='message' className='form-control' placeholder='PHOTO'/>
              <input type="submit" className='btn btn-lg' value='SEND'/>
            </form>
      break;
      case 'EMOJI':
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
                <div className="emoji-container">
                  <div className="emoji-wrapper">
                    <i className="mdi mdi-emoticon"></i>
                    <i className="mdi mdi-emoticon-cool"></i>
                    <i className="mdi mdi-emoticon-devil"></i>
                    <i className="mdi mdi-emoticon-happy"></i>
                    <i className="mdi mdi-emoticon-neutral"></i>
                    <i className="mdi mdi-emoticon-poop"></i>
                    <i className="mdi mdi-emoticon-sad"></i>
                    <i className="mdi mdi-emoticon-tongue"></i>
                  </div>
                  <input type="text" ref='message' className='form-control emoji-input' placeholder='EMOJI'/>
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
    return (
      <div className="messages-page">
        <div className="mainTitle">
          <p className='title'>Candy Chat</p>
        </div>
        <div className="option-bar">
          <i className="mdi mdi-camera" onClick={() => {
              this.setState({type: 'PHOTO'});
            }}></i>
          <i className="mdi mdi-camcorder" onClick={() => {
              this.setState({type: 'VIDEO'});
            }}></i>
          <i className="mdi mdi-comment-text" onClick={() => {
              this.setState({type: 'MESSAGE'});
            }}></i>
          <i className="mdi mdi-emoticon-happy" onClick={() => {
              this.setState({type: 'EMOJI'});
            }}></i>
        </div>
        <div className="messages" ref="messagesHolder">
          {this.props.messages.map((message, idx) => {
            return (
              <div className='message-holder' key={idx}>
                <i className="mdi mdi-account-box"></i>
                <div className="message-content">
                  <div className='message-bubble'>
                    <p>
                      <span dangerouslySetInnerHTML={this.rawMarkup(message.message)} />
                    </p>
                  </div>
                  <br/>
                  <p className="message-details">by {message.author}</p>
                  <p className="message-details">sent on {message.createdAt.toLocaleDateString()}</p>
                </div>
              </div>
            )
          })}
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
  }
})
