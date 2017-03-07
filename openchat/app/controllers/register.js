import Ember from 'ember';


export default Ember.Controller.extend({
  userData: Ember.inject.service(),

  actions: {
    handleError() {
      this.transitionToRoute('error');
    },

    handleFormSubmission(formData) {
      let newUser = this.get('store').createRecord('user', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });

      newUser.save().then((newUser) => {
        this.get('userData').set('username', newUser.data.username);
        this.get('userData').set('email', newUser.data.email);
        this.get('userData').set('token', newUser.data.token);
        this.get('userData').set('token', newUser.data.id);

        this.transitionToRoute('messages');
      });
    }
  }
});
