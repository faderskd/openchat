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
    this.nonFieldErrors = null;
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
      this.get('onFormSubmission')(formData);
    }
  }

});
