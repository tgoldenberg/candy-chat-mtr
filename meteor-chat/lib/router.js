Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    return [Meteor.subscribe('messages'), Meteor.subscribe('emojis'), Meteor.subscribe('photos')]
  }
});

Router.route('/', {
  name: 'home',
  data: function() {
    return Messages.find();
  }
});

Router.route('/chat', {
  name: 'chat',
  data: function() {
    return [Messages.find(), Emojis.find(), Photos.find()];
  }
});

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.redirect('/');
    }
  } else {
    this.next();
  }
}
Router.onBeforeAction(requireLogin, {only: 'chat'});
