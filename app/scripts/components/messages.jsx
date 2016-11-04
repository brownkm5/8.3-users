var React = require('react');
var $ = require('jquery');

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
    var username = localStorage.getItem('username');
    console.log('username', username);
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
  getInitialState: function(){
    return {
      message: []
    }
  },
  componentWillMount: function(){
    var self = this;
    $.ajax('https://kevinbrowntown.herokuapp.com/classes/Messages').then(messageList);
    function messageList(data){
      self.setState({message: data.results});
    }
  },
  render: function(){
    var messages = this.state.message;
    console.log(messages);
    var messageList = messages.map(function(messageData){
      return (
        <li key={messageData.objectId || messageData.createdAt}>{messageData.username}: {messageData.message}</li>
      )
    })
    return(
      <ul>{messageList}</ul>
    )
  }
});

var MessageContainer = React.createClass({
  getInitialState: function(){
    return {
      message: ''
    }
  },
  componentWillMount: function(){
    var self = this;
    var token = localStorage.getItem('token');
    $.ajaxSetup({
      beforeSend: function(xhr){
        xhr.setRequestHeader('X-Parse-Application-Id', 'kmbparse');
        xhr.setRequestHeader('X-Parse-REST-API-Key', 'kylesb');
        if(token){
          xhr.setRequestHeader('X-Parse-Session-Token', token);
        }
        else {
          self.props.router.navigate('chat/', {trigger: true});
        }
      }
    });
  },
  handleMessage: function(message){
    // console.log('message', message);
    this.setState({message: message});
  },
  handleSubmit: function(){
    var messageData = {
      username: localStorage.getItem('username'),
      message: this.state.message
    }
    console.log(messageData);
    $.post('https://kevinbrowntown.herokuapp.com/classes/Messages', messageData).then(function(response){
      console.log(response);
    });

  },
  render: function(){
    return(
      <div className="container">
        <div className="col-sm-10 col-sm-offset-1">
          <div className="col-sm-offset-2">
            <MessageList />
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
