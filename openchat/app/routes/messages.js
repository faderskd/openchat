import Ember from 'ember';

export default Ember.Route.extend({
  userData: Ember.inject.service(),

  model(params) {
    return Ember.RSVP.hash({
      conversations: this.get('store').findAll('conversation', {include: 'users,messages'}),

      currentConversation: this.get('store').findAll('conversation').then((conversations) => {
        return conversations.get('firstObject');
      }),

      interlocutor: this.get('store').findAll('conversation', {include: 'users'}).then((conversations) => {
        return conversations.get('firstObject');
      }).then((conversation) => {
        return conversation.get('users');
      }).then((users) => {
        let interlocutor = null;
        users.forEach((user) => {
          if (user.data.username !== this.get('userData').username) {
            interlocutor = user;
          }
        });

        return interlocutor;
      })
    });
  },

});
