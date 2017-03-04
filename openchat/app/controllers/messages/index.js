import Ember from 'ember';

export default Ember.Controller.extend({
  userData: Ember.inject.service(),

  init() {
    this._super(...arguments);
    let username = this.get('userData').get('username');

    let conversations = this.get('store')
      .findAll('conversation', {include: 'users'}).then((conversations) => {
        conversations.forEach((c) => {
          console.log('jestem w petli');
        });
      });

    // conversations.forEach((conversation) => {
    //   console.log(conversation.updatedAt);
    // });

    // conversation.get('users').then((users) => {
    //   console.log(users);
    // });

    // let interlocutor = null;
    //
    // conversation.users.forEach((user) => {
    //   if (user.username !== username) {
    //     interlocutor = user;
    //     break;
    //   }
    // });
    //
    // this.transitionToRoute('messages.show', conversation);
  }
});
