var Backbone = require('backbone');

var Message = Backbone.Model.extend({
  idAttribute: '_id'
});

var MessageCollection = Backbone.Collection.extend({
  model: Message,
  url: 'https://tiny-lasagna-server.herokuapp.com/collections/kevinmessage2'
});

module.exports = {
  MessageCollection: MessageCollection
}
