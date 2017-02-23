import Ember from 'ember';
import {TextInput, MaxLength, MinLength} from '../utils/text-input';


export default Ember.Component.extend({
  username: TextInput.create({
    value: '',
    validators: [new MaxLength(30), new MinLength(6)]
  }),
  email: '',
  password: '',
  confirmPassword: '',

  usernameErrors: [],


  actions: {
    onUsernameChange() {
      this.get('username').validate();
    }
  }

});
