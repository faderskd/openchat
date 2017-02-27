import Ember from 'ember';


export default Ember.Controller.extend({
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
      newUser.save();
    }
  }
});
