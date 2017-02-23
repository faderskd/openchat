import Ember from 'ember';
import {TextInput, MaxLength} from '../utils/text-input';


export default Ember.Component.extend({
  username: TextInput.create({
    value: '',
    validators: [new MaxLength(30)]
  }),
  email: '',
  password: '',
  confirmPassword: '',

  usernameErrors: [],


  actions: {
    onUsernameChange() {
      let usernameInput = this.get('username');
      usernameInput.validate();
    }
  }

});
