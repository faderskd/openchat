import Ember from 'ember';
import {TextInput, MaxLength, MinLength, MatchPattern} from '../utils/text-input';


export default Ember.Component.extend({
  username: TextInput.create({
    value: '',
    validators: [new MaxLength(30), new MinLength(6)]
  }),
  email: TextInput.create({
    value: '',
    validators: [new MatchPattern(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)]
  }),
  password: '',
  confirmPassword: '',

  usernameErrors: [],


  actions: {
    onUsernameChange() {
      this.get('username').validate();
    },

    onEmailChange() {
      this.get('email').validate();
    }
  }

});
