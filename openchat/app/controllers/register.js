import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    handleError() {
      this.transitionToRoute('error');
    },
    handleFormSubmission(formData) {
      console.log(formData);
    }
  }
});
