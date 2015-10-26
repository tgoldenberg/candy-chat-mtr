Messages = new Mongo.Collection('messages');
Emojis = new Mongo.Collection('emojis');
Emojis.allow({
  update: function(userId, emoji) { return true; },
  remove: function(userId, emoji) { return true; },
  insert: function(userId) { return true; }
})
Messages.allow({
  update: function(userId, message) { return true; },
  remove: function(userId, message) { return true; },
  insert: function(userId) { return true; }
});

Meteor.methods({
  emojiCreate: function(emojiAttributes) {
    check(this.userId, String);
    check(emojiAttributes, {
      emojis: [String],
      type: String,
      createdAt: Date,
      author: String
    });
    var emoji = Emojis.insert(emojiAttributes);
    return emoji;
  },
  messageCreate: function(messageAttributes) {
    check(this.userId, String);
    check(messageAttributes, {
      message: String,
      type: String,
      author: String,
      createdAt: Date
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
