Messages = new Mongo.Collection('messages');

Messages.allow({
  update: function(userId, message) { return true; },
  remove: function(userId, message) { return true; },
  create: function(userId) { return true; }
});

Meteor.methods({
  messageCreate: function(messageAttributes) {
    check(this.userId, String);
    check(messageAttributes, {
      message: String,
      avatar: String
    });
    var message = Messages.insert(messageAttributes);
    return message;
  },
  messageUpdate: function(messageId, messageAttributes) {
    var message = Messages.update({_id: messageId}, {$set: {messageAttributes}});
    return message;
  },
  messageDelete: function(messageId) {
    Messages.remove({_id: messageId});
  }
})
