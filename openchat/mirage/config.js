export default function() {
  this.namespace = 'api';

  this.get('/users/:username/is-unique', (schema, request) => {
    let username = request.params.username;
    let user = schema.users.where({username: username});

    return {
      isUnique: user.length === 0
    }
  });

  this.post('/users', function(schema, request) {
    let attrs = this.normalizedRequestAttrs();

    let user = schema.db.users.insert({
      username: attrs.username,
      email: attrs.email,
      token: attrs.password + '-token'
    });

    let response = {
      data: {
        type: 'users',
        id: user.id,
        attributes: {
          username: user.username,
          email: user.email,
          token: user.token
        }
      }
    };

    return response;
  });
}
