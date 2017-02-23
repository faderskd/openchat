import Ember from 'ember';
import {TextInput, MaxLength, MinLength, MatchPattern, SameAs} from '../utils/text-input';


export default Ember.Component.extend({
  username: TextInput.create({
    value: '',
    validators: [new MaxLength(30), new MinLength(6)]
  }),
  email: TextInput.create({
    value: '',
    validators: [new MatchPattern(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)]
  }),
  password: TextInput.create({
    value: '',
    validators: [new MaxLength(50), new MinLength(8)]
  }),
  confirmPassword: TextInput.create({
    value: '',
    validators: null
  }),

  init() {
    this._super(...arguments);
    let passwordInput = this.get('password');
    let confirmPassword = this.get('confirmPassword');
    confirmPassword.set(
      'validators',
      [new SameAs(passwordInput)]
    );
  },

  actions: {
    onUsernameChange() {
      this.get('username').validate();
    },

    onEmailChange() {
      this.get('email').validate();
    },

    onPasswordChange() {
      this.get('password').validate();
    },

    onConfirmPasswordChange() {
      this.get('confirmPassword').validate();
    }
  }

});
