import Ember from 'ember';

export default Ember.Route.extend({
  userData: Ember.inject.service(),

  beforeModel() {
    let username = this.get('userData').get('username');
    this.transitionTo('messages.show', username);
  }
});
