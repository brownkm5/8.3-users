var React = require('react');

var UserCollection = require('../models/user.js').UserCollection;

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

    var user = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.handleSubmit(user);
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
  render: function(){
    return(
      <div className="col-md-6">
        <h2>Need an Account? Sign Up!</h2>
        <htmlForm id="signup">

          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input className="form-control" name="email" id="email" type="email" placeholder="email" />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input className="form-control" name="password" id="password" type="password" placeholder="Password Please" />
          </div>

          <input className="btn btn-primary" type="submit" value="Sign Me Up!" />
        </htmlForm>

      </div>
    )
  }
});

var LoginContainer = React.createClass({
  handleSubmit: function(user){
    var userData = JSON.stringify(user);
    // console.log(userData);
    localStorage.setItem('user', userData);
    var router = this.props.router;
    router.navigate('chat/', {trigger: true});
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
              <SignUpComponent />
            </div>
          </div>
    )
  }
});

module.exports = {
  LoginContainer: LoginContainer
}
