var React = require('react');
var $ = require('jquery');

var UserCollection = require('../models/user.js').UserCollection;

// $.ajaxSetup({
//   beforeSend: function(xhr){
//     xhr.setRequestHeader('X-Parse-Application-Id', 'kmbparse');
//     xhr.setRequestHeader('X-Parse-REST-API-Key', 'kylesb');
//   }
// });

var LoginComponent = React.createClass({
  getInitialState: function(){
    var email = '';
    var password = '';
    return {
      email: email,
      password: password
    }
  },
  handleEmail: function(e){
    var userEmail = e.target.value;
    this.setState({email: userEmail});
  },
  handlePassword: function(e){
    var userPassword = e.target.value;
    this.setState({password: userPassword});
  },
  handleSubmit: function(e){
    e.preventDefault();

    var userInfo = {
      username: this.state.email,
      password: this.state.password
    };
    this.props.handleSubmit(userInfo);
  },
  render: function(){
    var self = this;
    return(
      <div className="col-md-6">
        <h2>Please Login</h2>
        <form id="login" onSubmit={self.handleSubmit}>
          <div className="form-group">
            <label htmlFor="email-login">Email address</label>
            <input onChange={self.handleEmail} className="form-control" name="email" id="email-login" type="email" placeholder="email" />
          </div>

          <div className="form-group">
            <label htmlFor="password-login">Password</label>
            <input onChange={self.handlePassword} className="form-control" name="password" id="password-login" type="password" placeholder="Password Please" />
          </div>

          <button className="btn btn-primary" type="submit">Beam Me Up!</button>
        </form>
      </div>
    )
  }
});

var SignUpComponent = React.createClass({
  getInitialState: function(){
    var email = '';
    var password = '';

    return {
      email: email,
      password: password
    }
  },
  handleEmail: function(e){
    var userEmail = e.target.value;
    this.setState({email: userEmail});
    // console.log(userEmail);
  },
  handlePassword: function(e){
    var userPassword = e.target.value;
    this.setState({password: userPassword});
  },
  handleSignUp: function(e){
    e.preventDefault();

    var userData = {
      username: this.state.email,
      password: this.state.password
    };
    // console.log(userData);
    this.props.handleSignUp(userData);

  },
  render: function(){
    var self = this;
    return(
      <div className="col-md-6">
        <h2>Need an Account? Sign Up!</h2>
        <form onSubmit={self.handleSignUp} id="signup">
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input onChange={self.handleEmail} className="form-control" name="email" id="email" type="email" placeholder="email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input onChange={self.handlePassword} className="form-control" name="password" id="password" type="password" placeholder="Password Please" />
          </div>
          <input className="btn btn-primary" type="submit" value="Sign Me Up!" />
        </form>

      </div>
    )
  }
});

var LoginContainer = React.createClass({
  componentWillMount: function(){
    this.ajaxSetup();
  },
  ajaxSetup: function(token){
    $.ajaxSetup({
      beforeSend: function(xhr){
        xhr.setRequestHeader('X-Parse-Application-Id', 'kmbparse');
        xhr.setRequestHeader('X-Parse-REST-API-Key', 'kylesb');
        if(token){
          xhr.setRequestHeader('X-Parse-Session-Token', token);
        }
      }
    });
  },
  handleSubmit: function(userInfo){
    var username = userInfo.username;
    var password = userInfo.password;
    // console.log(userInfo);
    var self = this;
    var url = 'https://kevinbrowntown.herokuapp.com/';

    $.ajax(url + 'login?username=' + username + '&password=' + password).then(function(response){
      localStorage.setItem('username', response.username);
      localStorage.setItem('token', response.sessionToken);
      if (response.sessionToken) {
        self.props.router.navigate('chat/', {trigger: true});
      };
    });
  },
  handleSignUp: function(userData){
    console.log(userData);
    $.post('https://kevinbrowntown.herokuapp.com/users', userData).then(function(response){
      console.log(response);
    });
  },
  render: function(){
    return(
      <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1>Parse Users</h1>
              </div>
            </div>

            <div className="row">
              <LoginComponent handleSubmit={this.handleSubmit}/>
              <SignUpComponent handleSignUp={this.handleSignUp}/>
            </div>
          </div>
    )
  }
});

module.exports = {
  LoginContainer: LoginContainer
}
