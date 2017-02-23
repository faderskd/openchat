import Ember from 'ember';

export const TextInput = Ember.Object.extend({
  init() {
    this._super(...arguments);
    this.set('errors', {});
  },

  validate() {
    let validators = this.get('validators');
    let errors = {};
    let value = this.get('value');
    let hasErrors = false;

    for (let i = 0; i < validators.length; i++) {
      let validator = validators[i];

      if (!validator.isValid(value)) {
        errors[validator.validatorName] = validator;
        hasErrors = true;
      }
    }

    if (!hasErrors) {
      errors = false;
    }

    this.set('errors', errors);
    console.log(errors);
  }
});

export function MaxLength(maxLength) {
  this.validatorName = 'maxLength';
  this.maxLength = maxLength;

  this.isValid = function(value) {
    return value.length <= this.maxLength;
  };
}
