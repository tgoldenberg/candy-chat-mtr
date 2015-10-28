Meteor.publish('messages', function() {
  console.log('Publishing Messages', Messages.find().count());
  return Messages.find();
});
Meteor.publish('emojis', function() {
  return Emojis.find({}, {limit: 100});
});
Meteor.publish('photos', function() {
  return Photos.find({}, {limit: 100});
});
