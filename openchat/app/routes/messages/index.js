import Ember from 'ember';

export default Ember.Route.extend({
  userData: Ember.inject.service(),

  beforeModel() {
    let currentUserUsername = this.get('userData').username;
    return this.store.findAll('conversation', {include: 'users'}).then((conversations) => {
      let lastConversationUsers = conversations.sortBy('updatedAt').get('firstObject').get('users');
      // filter last conversation's users to find one we talked to
      let lastConversationUser = lastConversationUsers.find((item) => {
        return item.get('username') !== currentUserUsername;
      });
      if (lastConversationUser)
        this.transitionTo('messages.show', lastConversationUser.get('username'));
    });
  }
});
