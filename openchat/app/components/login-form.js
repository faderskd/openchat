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

  formInvalid: Ember.computed('showUsernameErrors','showPasswordErrors', function () {
    return this.get('showUsernameErrors') || this.get('showPasswordErrors');
  })

});
