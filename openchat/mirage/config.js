export default function() {
  this.namespace = 'api';

  this.get('/users/:username/is-unique', (schema, request) => {
    let username = request.params.username;
    return {
      isUnique: username !== 'beczkowb'
    }
  });

  this.post('/users', (schema, request) => {
    return {
      data: {
        type: 'users',
        id: 1,
        attributes: {
          username: request.requestBody.username,
          email: request.requestBody.email,
          token: 'asdfasdfasdfasdw34234'
        }
      }
    }
  });
}
