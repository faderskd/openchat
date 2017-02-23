import Ember from 'ember';

export const TextInput = Ember.Object.extend({
  init() {
    this._super(...arguments);
    this.set('errors', false);
  },

  validate() {
    let validators = this.get('validators');
    let errors = {};
    let value = this.get('value');
    let hasErrors = false;

    for (let i = 0; i < validators.length; i++) {
      let validator = validators[i];

      if (!validator.isValid(value)) {
        errors[validator.validatorName] = true;
        hasErrors = true;
      } else {
        errors[validator.validatorName] = false;
      }
    }

    if (!hasErrors) {
      errors = false;
    }

    this.set('errors', errors);
  }
});

export function MaxLength(maxLength) {
  this.validatorName = 'maxLength';
  this.maxLength = maxLength;

  this.isValid = function(value) {
    return value.length <= this.maxLength;
  };
}

export function MinLength(minLength) {
  this.validatorName = 'minLength';
  this.minLength = minLength;

  this.isValid = function(value) {
    return value.length >= this.minLength;
  };
}

export function MatchPattern(pattern) {
  this.validatorName = 'matchPattern';
  this.pattern = pattern;

  this.isValid = function(value) {
    let result = this.pattern.test(value);
    console.log(result);
    return result;
  };
}
