import Ember from 'ember';

export default Ember.Route.extend({
  userData: Ember.inject.service(),

  model(params) {
    return Ember.RSVP.hash({
      conversation: this.store.findAll('conversation', {include: 'users,messages'}).then((conversations) => {
        let userConversation = conversations.find((conversation) => {
          let foundConversationUser = conversation.get('users').find((user) => {
            return user.get('username') === params.username;
          });
          return !!foundConversationUser;
        });
        return userConversation;
      }),
      currentUser: this.store.peekRecord('user', this.get('userData').id),
    });
  },
});
