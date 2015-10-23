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
  template: 'home',
  data: function() {
    return Messages.find();
  }
});
