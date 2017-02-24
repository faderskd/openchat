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
    validators: []
  }),

  init() {
    this._super(...arguments);
    let passwordInput = this.get('password');
    let confirmPassword = this.get('confirmPassword');
    confirmPassword.set(
      'validators',
      [new SameAs(passwordInput)]
    );
    confirmPassword.validate();
  },

  passwordChanged: Ember.observer('password.{value}', function () {
    this.get('confirmPassword').validate();
  }),

  showUsernameErrors: Ember.computed('username.{pristine,errors}', function () {
    return !this.get('username.pristine') && this.get('username.errors');
  }),

  showEmailErrors: Ember.computed('email.{pristine,errors}', function () {
    return !this.get('email.pristine') && this.get('email.errors');
  }),

  showPasswordErrors: Ember.computed('password.{pristine,errors}', function () {
    return !this.get('password.pristine') && this.get('password.errors');
  }),

  showConfirmPasswordErrors: Ember.computed('confirmPassword.{pristine,errors}', function () {
    return !this.get('confirmPassword.pristine') && this.get('confirmPassword.errors');
  }),

  formInvalid: Ember.computed('username.{errors}', 'email.{errors}', 'password.{errors}', 'confirmPassword.{errors}', function () {
      return this.get('username.errors') || this.get('email.errors') || this.get('password.errors') || this.get('confirmPassword.errors');
  }),



});
