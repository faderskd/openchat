import Ember from 'ember';

export default Ember.Controller.extend({
  userData: Ember.inject.service(),

  init() {
    this._super(...arguments);
    let username = this.get('userData').get('username');
    let conversation = this.get('store')
      .findAll('conversation', {include: 'user'})
      .get('firstObject');

    // let interlocutor = null;
    //
    // conversation.users.forEach((user) => {
    //   if (user.username !== username) {
    //     interlocutor = user;
    //     break;
    //   }
    // });

    // this.transitionToRoute('messages.show', conversation);
  }
});
