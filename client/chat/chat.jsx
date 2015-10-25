class Chat extends React.Component{
  componentDidMount(){
    this.scrollDown();
  }
  scrollDown(){
    let scrollHeight = React.findDOMNode(this.refs.messagesHolder).scrollHeight;
    $(React.findDOMNode(this.refs.messagesHolder)).scrollTop(scrollHeight);
  }

  render(){
    return (
      <div className="messages-page">
        <div className="mainTitle">
          <p className='title'>Candy Chat</p>
        </div>
        <div className="option-bar">
          <i className="mdi mdi-camera"></i>
          <i className="mdi mdi-camcorder"></i>
          <i className="mdi mdi-comment"></i>
          <i className="mdi mdi-emoticon-happy"></i>
        </div>
        <div className="messages" ref="messagesHolder">
          {this.props.messages.map((message, idx) => {
            return (
              <div className='message-holder' key={idx}>
                <i className="mdi mdi-account-box"></i>
                <div className="message-content">
                  <div className='message-bubble'>
                    <p>
                      {message.message}
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

        <form className="messages-form" onSubmit={(e) => {
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
          <input type="text" ref='message' className='form-control' placeholder='message'/>
          <input type="submit" className='btn btn-lg' value='Send'/>
        </form>
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
