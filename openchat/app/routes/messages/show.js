import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.findAll('conversation', {include: 'users,messages'}).then((conversations) => {
      let userConversation = conversations.find((conversation) => {
        let foundConversationUser = conversation.get('users').find((user) => {
          return user.get('username') === params.username;
        });
        return !!foundConversationUser;
      });
      return userConversation.get('messages');
    });
  },

  setupController(controller, messages) {
    controller.set('messages', messages);
  }
});
