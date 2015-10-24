Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    return [Meteor.subscribe('messages')]
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
    return Messages.find();
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
