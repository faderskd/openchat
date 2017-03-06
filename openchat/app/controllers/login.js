import Ember from 'ember';

export default Ember.Controller.extend({
  authentication: Ember.inject.service(),
  userData: Ember.inject.service(),

  actions: {
    handleFormSubmission(formData) {
      let authentication = this.get('authentication');
      let controller = this;
      return new Promise(function (resolve, reject) {
        authentication.login(formData).then(function (data) {
          controller.get('store').push(data);

          controller.get('userData').set('username', data.data.attributes.username);
          controller.get('userData').set('email', data.data.attributes.email);
          controller.get('userData').set('token', data.data.attributes.token);

          resolve(data);
        }, reject).then((userData) => {

          controller.transitionToRoute('messages', 'beczkowb');
        });
      });
    },
  }
});
