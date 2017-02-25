import Ember from 'ember';

export default Ember.Service.extend({
  resultDestination: null,

  validate(username, resultDestinationObject, resultDestinationPropertyName) {
    let url = '/api/users/' + username + '/is-unique';

    this.ajax({
      url: url,
      type: 'get',
      contentType: 'application/json'
    }).then(
      function fulfillHandler(data) {
        resultDestinationObject.set(resultDestinationPropertyName, data.isUnique);
      },
      function rejectHandler(jqXHR, textStatus, errorThrown) {
        alert('reject');
      }
    ).catch(function (error) {
      alert('errors');
    });
  },

  ajax(options) {
    return new Promise(function (resolve, reject) {
      Ember.$.ajax(options).done(resolve).fail(reject);
    })
  }
});
