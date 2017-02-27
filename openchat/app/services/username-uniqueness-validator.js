import Ember from 'ember';

export default Ember.Service.extend({
  resultDestination: null,

  validate(username) {
    let url = '/api/users/' + username + '/is-unique';

    let promise = this.ajax({
      url: url,
      type: 'get',
      contentType: 'application/json'
    }).then(function (data) {
      return data.isUnique;
    });

    return promise;
  },

  ajax(options) {
    return new Promise(function (resolve, reject) {
      Ember.$.ajax(options).done(resolve).fail(reject);
    });
  }
});
