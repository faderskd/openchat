import Ember from 'ember';

export default Ember.Service.extend({

  ajax: Ember.inject.service(),
  /**
   * Authenticate the user.
   * @param {object} authenticationData - {username: 'test', password: 'test'}
   * @return promise to be resolved with user data back from server
   */
  login(authenticationData) {
    let ajax = this.get('ajax');
    let data = {
      data: {
        type: 'login',
        attributes: {
          username: authenticationData.username,
          password: authenticationData.password,
        }
      }
    };
    return new Promise(function (resolve, reject) {
      ajax.request(
        'api/login', {
          method: 'POST',
          contentType: 'application/json; charset=utf-8',
          data: JSON.stringify(data),
        }
      ).then(resolve, reject);
    });
  }
});
