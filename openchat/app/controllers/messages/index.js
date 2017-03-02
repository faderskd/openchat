import Ember from 'ember';

export default Ember.Controller.extend({
  userData: Ember.inject.service(),

  init() {
    this._super(...arguments);
    let username = this.get('userData').get('username');
    let conversation = this.get('store').findAll('conversation').get('firstObject');
    this.transitionToRoute('messages.show', username);
  }
});
