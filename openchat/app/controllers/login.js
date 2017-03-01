import Ember from 'ember';

export default Ember.Controller.extend({
  authentication: Ember.inject.service(),

  actions: {
    handleFormSubmission(formData) {
      let authentication = this.get('authentication');
      let controller = this;
      return new Promise(function (resolve, reject) {
        authentication.login(formData).then(function (data) {
          controller.get('store').push(data);
          resolve(data);
        }, reject).then(() => {controller.transitionToRoute('messages')});
      });
    },
  }
});
