import Ember from 'ember';

export default Ember.Route.extend({
  userData: Ember.inject.service(),

  model(params) {
    console.log('model');
    console.log(params);

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
        console.log('inside');
        console.log(users);
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

  afterModel(model, transition) {
    console.log('afterModel');
    console.log(model);
  }

});
