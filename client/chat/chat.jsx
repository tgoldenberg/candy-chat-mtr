class Chat extends React.Component{
  render(){
    return (
      <div>
        <p>Candy Chat</p>
        <div className="messages">
          {this.props.messages.map((message, idx) => {
            return (
              <div key={idx}>
                <p>{message.message}</p>
                <p>{message.author}</p>
              </div>
            )
          })}
        </div>

        <form onSubmit={(e) => {
            e.preventDefault();
            let username = Meteor.user().username;
            let message = React.findDOMNode(this.refs.message).value;
            let options = {
              author: username,
              message: message,
              createdAt: new Date()
            }
            Meteor.call('messageCreate', options);
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
