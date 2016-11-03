var Backbone = require('backbone');

var Message = Backbone.Model.extend({
  idAttribute: '_id'
});

var MessageCollection = Backbone.Collection.extend({
  model: Message,
  url: 'https://kevinbrowntown.herokuapp.com/classes/Messages'
});

module.exports = {
  MessageCollection: MessageCollection
}
