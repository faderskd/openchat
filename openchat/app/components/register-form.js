import Ember from 'ember';
import {TextInput, MaxLength, MinLength, MatchPattern, SameAs, IsUnique} from '../utils/text-input';


export default Ember.Component.extend({
  username: TextInput.create({
    value: '',
    validators: [
      new MaxLength(30),
      new MinLength(6),
      new MatchPattern(/^[a-zA-Z0-9]*$/)
    ],
    asyncValidators: []
  }),

  email: TextInput.create({
    value: '',
    validators: [new MatchPattern(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)],
    asyncValidators: []
  }),

  password: TextInput.create({
    value: '',
    validators: [
      new MaxLength(50),
      new MinLength(8),
      new MatchPattern(/^[a-zA-Z0-9!@#$%^&*]*$/)
    ]
  }),

  confirmPassword: TextInput.create({
    value: '',
    validators: []
  }),

  usernameUniquenessValidator: Ember.inject.service(),
  emailUniquenessValidator: Ember.inject.service(),

  init() {
    this._super(...arguments);
    // SameAs validator needs reference to field
    let passwordInput = this.get('password');
    let confirmPassword = this.get('confirmPassword');
    confirmPassword.set(
      'validators',
      [new SameAs(passwordInput)]
    );
    confirmPassword.validate();

    // IsUnique needs service
    let usernameInput = this.get('username');
    usernameInput.set('asyncValidators', [new IsUnique(this.get('usernameUniquenessValidator'))]);

    let emailInput = this.get('email');
    emailInput.set('asyncValidators', [new IsUnique(this.get('emailUniquenessValidator'))]);
  },

  passwordChanged: Ember.observer('password.{value}', function () {
    this.get('confirmPassword').validate();
  }),

  showUsernameErrors: Ember.computed('username.{pristine,errors}', function () {
    return !this.get('username.pristine') && this.get('username.errors');
  }),

  showUsernameAsyncErrors: Ember.computed('username.{pristine,asyncErrors}', function () {
    return !this.get('username.pristine') && this.get('username.asyncErrors');
  }),

  showEmailErrors: Ember.computed('email.{pristine,errors}', function () {
    return !this.get('email.pristine') && this.get('email.errors');
  }),

  showEmailAsyncErrors: Ember.computed('email.{pristine,asyncErrors}', function () {
    return !this.get('email.pristine') && this.get('email.asyncErrors');
  }),

  showPasswordErrors: Ember.computed('password.{pristine,errors}', function () {
    return !this.get('password.pristine') && this.get('password.errors');
  }),

  showConfirmPasswordErrors: Ember.computed('confirmPassword.{pristine,errors}', function () {
    return !this.get('confirmPassword.pristine') && this.get('confirmPassword.errors');
  }),

  formInvalid: Ember.computed('username.{errors}', 'email.{errors}', 'password.{errors}',
    'confirmPassword.{errors}', 'usernameWaitingForAsyncValidation', 'username.{asyncErrors}',
    'emailWaitingForAsyncValidation', 'email.{asyncErrors}', function () {
      return this.get('username.errors') || this.get('email.errors') || this.get('password.errors')
        || this.get('confirmPassword.errors') || this.get('usernameWaitingForAsyncValidation')
        || this.get('username.asyncErrors') || this.get('emailWaitingForAsyncValidation')
        || this.get('email.asyncErrors');
  }),

  usernameWaitingForAsyncValidation: false,
  emailWaitingForAsyncValidation: false,

  _onFieldFocusOut(fieldName) {
    let field = this.get(fieldName);

    if (!field.pristine && !field.errors) {
      this.set(fieldName + 'WaitingForAsyncValidation', true);
      let validatorsPromises = field.validateAsync();
      validatorsPromises.isUnique.then((isUnique) => {
        this.set(fieldName + 'WaitingForAsyncValidation', false);
      }, (jqXHR, textStatus, errorThrown) => {
        this.get('onError')();
      }).catch((error) => {
        this.get('onError')();
      });
    }
  },

  _onFieldFocusIn(fieldName) {
    let field = this.get(fieldName);
    field.cleanAsyncErrors();
  },

  actions: {
    onSubmit() {
      let formData = {
        username: this.get('username').value,
        email: this.get('email').value,
        password: this.get('password').value
      };
      this.get('onFormSubmission')(formData);
    },

    onUsernameFocusOut() {
      this._onFieldFocusOut('username');
    },

    onUsernameFocusIn() {
      this._onFieldFocusIn('username');
    },

    onEmailFocusOut() {
      this._onFieldFocusOut('email');
    },

    onEmailFocusIn() {
      this._onFieldFocusIn('email');
    },
  }
});
