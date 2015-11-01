// Meteor.methods({
//   photoCreate: function(photoAttributes) {
//     check(this.userId, String);
//     check(photoAttributes, {
//       imageUrl: String,
//       author: String,
//       type: String,
//       createdAt: Date
//     });
//     var photo = Photos.insert(photoAttributes);
//     return photo;
//   },
//   uploadToAWS: function(options) {
//     check(options, Object);
//     var file = options.file;
//     console.log('FILE', options);
//     AWS.config.update({accessKeyId: Meteor.settings.private.AWS_ACCESS_TOKEN, secretAccessKey: Meteor.settings.private.AWS_SECRET_KEY});
//     AWS.config.region = 'us-east-1';
//     var s3 = new AWS.S3({params: {Bucket: 'speakitlanguages'}});
//     let params = { Key: file.name, ContentType: file.type, Body: file };
//     s3.upload(params, function(err, data) {
//       console.log('DATA', data, err);
//       // preview.src = data.Location;
//       // button.innerHTML = file.name;
//       return {name: file.name, source: data.Location}
//     });
//   },
//   emojiCreate: function(emojiAttributes) {
//     check(this.userId, String);
//     check(emojiAttributes, {
//       emojis: [String],
//       type: String,
//       createdAt: Date,
//       author: String
//     });
//     var emoji = Emojis.insert(emojiAttributes);
//     return emoji;
//   },
//   messageCreate: function(messageAttributes) {
//     check(this.userId, String);
//     check(messageAttributes, {
//       message: String,
//       type: String,
//       author: String,
//       createdAt: Date
//     });
//     var message = Messages.insert(messageAttributes);
//     return message;
//   },
//   messageUpdate: function(messageId, messageAttributes) {
//     var message = Messages.update({_id: messageId}, {$set: {messageAttributes}});
//     return message;
//   },
//   messageDelete: function(messageId) {
//     Messages.remove({_id: messageId});
//   }
// })
