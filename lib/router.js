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
