var Backbone= require('backbone');

var User = Backbone.Model.extend({
  idAttribute: '_id'
});

var UserCollection = Backbone.Collection.extend({
  model: User,
  url: 'https://tiny-parse-server.herokuapp.com/classes/Kevin'
});

module.exports = {
  UserCollection : UserCollection
}
