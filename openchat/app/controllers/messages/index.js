import Ember from 'ember';

export default Ember.Controller.extend({
  userData: Ember.inject.service(),

  init() {
    this._super(...arguments);
    let username = this.get('userData').get('username');

    let conversations = this.get('store')
      .findAll('conversation', {include: 'users'})
      .then((conversations) => {
        let conversation = conversations.get('firstObject');
        let interlocutor = conversation.get('users').get('firstObject');
          this.transitionToRoute('messages.show', interlocutor);
      });
  }
});
