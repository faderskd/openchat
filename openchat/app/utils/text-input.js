import Ember from 'ember';

export const TextInput = Ember.Object.extend({
  value: '',
  errors: null,
  validators: null,
  pristine: null,

  asyncErrors: false,
  asyncValidators: null,

  init() {
    this._super(...arguments);
    this.set('pristine', true);
    this.validate();
  },

  valueChanged: Ember.observer('value', function () {
    this.validate();
    this.set('pristine', false);
  }),

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
  },

  validateAsync() {
    let validators = this.get('asyncValidators');
    let value = this.get('value');
    let errors = {};
    let validatorsPromises = {};

    for (let i = 0; i < validators.length; i++) {
      let validationPromise = validators[i].isValid(value);
      let validatorName = validators[i].validatorName;

      validationPromise = validationPromise.then((isValid) => {
        if (!isValid) {
          errors[validatorName] = !isValid;
          this.set('asyncErrors', errors);
        }
        return isValid;
      });

      validatorsPromises[validatorName] = validationPromise;
    }

    return validatorsPromises;
  },

  cleanAsyncErrors() {
    this.set('asyncErrors', false)
  },

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
    return this.pattern.test(value);
  };
}

export function SameAs(otherInput) {
  this.validatorName = 'sameAs';
  this.otherInput = otherInput;

  this.isValid = function (value) {
    return this.otherInput.value === value;
  }
}

export function IsUnique(validationService) {
  // User should provide validationService that has method validate(value)
  // validate should return promise that returns isUnique
  this.validatorName = 'isUnique';
  this.validationService = validationService;

  this.isValid = function (value) {
    return this.validationService.validate(value);
  };

}
