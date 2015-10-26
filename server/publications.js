Meteor.publish('messages', function(options) {
  return Messages.find({}, {limit: 100});
});
Meteor.publish('emojis', function(options) {
  return Emojis.find({}, {limit: 100});
});
Meteor.publish('photos', function(options) {
  return Photos.find({}, {limit: 100});
});
