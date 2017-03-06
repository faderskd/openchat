import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    let username = params.username;
    let conversation = this.get('store')
      .findAll('conversation', {include: 'messages,users'})
      .get('firstObject');
  }
});
