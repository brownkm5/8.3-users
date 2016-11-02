var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');

var LoginContainer = require('./components/login.jsx').LoginContainer;

var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index'
  },
  index: function(){
    ReactDOM.render(
      React.createElement(LoginContainer),
      document.getElementById('app')
    )
  }
});

var router = new AppRouter();

module.exports = router;
