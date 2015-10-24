Meteor.publish('messages', function(options) {
  return Messages.find({}, {limit: 100});
});
