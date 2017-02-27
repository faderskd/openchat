import Ember from 'ember';

export default Ember.Controller.extend({
    handleFormSubmission(formData) {
      console.log('login handler');
    },
    onError(errors) {
      console.log('error handler');
    }
});
