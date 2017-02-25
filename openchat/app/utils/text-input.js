import Ember from 'ember';

export const TextInput = Ember.Object.extend({
  value: null,
  errors: null,
  validators: null,
  pristine: null,

  asyncErrors: false,
  asyncValidators: null,
  asyncValidationPending: false,
  asyncValidationDone: false,
  asyncValidationFailed: false,

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
    let asyncValidators = this.get('asyncValidators');
    let value = this.get('value');
    let asyncErrors = {};

    for (let i = 0; i < asyncValidators.length; i++) {
      let validationPromise = asyncValidators[i].isValid(value);

      validationPromise.then(
        (isValid) => { // fulfilled
          asyncErrors[asyncValidators[i].validatorName] = !isValid;
          this.set('asyncErrors', asyncErrors);
        },
        (jqXHR, textStatus, errorThrown) => { // rejected
          alert('rejected');
        }).catch((error) => { // error
          alert('error');
          console.log(error);
      });
    }
  },

  cleanAsyncErrors() {
    this.set('asyncErrors', false)
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
  this.validatorName = 'isUnique';
  this.validationService = validationService;

  this.isValid = function (value) {
    let validationPromise = this.validationService.validate(value);

    return validationPromise.then(function (data) {
      return new Promise(function (resolve, reject) {
        resolve(data.isUnique);
      });
    });

  };

}
