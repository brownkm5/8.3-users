var React = require('react');

var MessageCollection = require('../models/messages.js').MessageCollection;

var MessageForm = React.createClass({
  handleMessage: function(e){
    var message = e.target.value;
    this.props.handleMessage(message);
  },
  handleSubmit: function(e){
    e.preventDefault();
    this.props.handleSubmit();
  },
  render: function(){
    var self = this;
    var userData = JSON.parse(localStorage.getItem('user'));
    var username = userData.email;
      return(

          <div>
            <div className='username'>Hello {username}</div>
            <form onSubmit={self.handleSubmit}>
              <div className="form-group">
                <label htmlFor="messages">Messages</label>
                <input onChange={self.handleMessage} className="form-control" name="email" id="messages" type="text" placeholder="Message" />
                <button className='btn btn-success' type="submit" name="button">Send Message</button>
              </div>
            </form>
          </div>

    )
  }
});


var MessageList = React.createClass({
render: function(){
    var messageCollection = this.props.messages;
    console.log(messageCollection);
    var messageList = messageCollection.map(function(messageData){
      return <li key={messageData.get('_id')}>{messageData.get('username')} : {messageData.get('message')}</li>
    });
    return(
    <ul>{messageList}</ul>
    )
  }
});

var MessageContainer = React.createClass({
  getInitialState: function(){
    var messageCollection = new MessageCollection();

    return {
      messageCollection: messageCollection,
      message: ''
    }
  },
  handleMessage: function(message){
    console.log(message);
    this.setState({message: message});
  },
  handleSubmit: function(){
    var userData = JSON.parse(localStorage.getItem('user'));
    var username = userData.email;

    console.log(this.state.messageCollection);

    var messageCollection = this.state.messageCollection;
    var message = this.state.message;
    messageCollection.create({message: message, username:username});

    var self = this;
    messageCollection.fetch().then(function(){
      self.setState({messageCollection: messageCollection});
    });

    console.log(this.state.messageCollection);

    this.setState({message: ''});
  },
  render: function(){
    return(
      <div className="container">
        <div className="col-sm-10 col-sm-offset-1">
          <div className="col-sm-offset-2">
            <MessageList messages={this.state.messageCollection}/>
          </div>
          <MessageForm handleMessage={this.handleMessage} handleSubmit={this.handleSubmit}/>
        </div>
      </div>
    )
  }
});

module.exports = {
  MessageContainer: MessageContainer
}
