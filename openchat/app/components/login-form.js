import Ember from 'ember';
import {TextInput, MinLength} from '../utils/text-input'

export default Ember.Component.extend({
  username: TextInput.create({
    value: '',
    validators: [
      new MinLength(1)
    ]
  }),

  password: TextInput.create({
    value: '',
    validators: [
      new MinLength(1)
    ]
  }),

  init() {
    this._super(...arguments);
    let username = this.get('username');
    let password = this.get('password');
    this.nonFieldErrors = [];
  },

  showUsernameErrors: Ember.computed('username.{pristine,errors}', function () {
    return !this.get('username.pristine') && this.get('username.errors');
  }),

  showPasswordErrors: Ember.computed('password.{pristine,errors}', function () {
    return !this.get('password.pristine') && this.get('password.errors');
  }),

  formInvalid: Ember.computed('username.errors', 'password.errors', function () {
    let username = this.get('username');
    let password = this.get('password');
    return username.pristine || password.pristine || username.errors || password.errors;
  }),

  actions: {
    onSubmit() {
      let formData = {
        username: this.get('username').value,
        password: this.get('password').value
      };
      let component = this;
      this.set('nonFieldErrors', []);
      this.get('onFormSubmission')(formData).catch(function (error) {
        let serverNonFieldErrors = error.errors[0].detail.nonFieldErrors;
        let componentNonFieldErrors = component.get('nonFieldErrors');
        for (let i=0; i < serverNonFieldErrors.length; i++)
          componentNonFieldErrors.pushObject(serverNonFieldErrors[i]);
      });
    }
  }

});
