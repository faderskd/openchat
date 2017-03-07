import Mirage from 'ember-cli-mirage';

export default function () {
  this.namespace = 'api';

  this.get('/users/:username/is-unique', (schema, request) => {
    let username = request.params.username;
    let user = schema.users.where({username: username});

    return {
      isUnique: user.length === 0
    }
  });

  this.get('/users/email/:email/is-unique', (schema, request) => {
    let email = request.params.email;
    let user = schema.users.where({email: email});

    return {
      isUnique: user.length === 0
    }
  });

  this.post('/users', function (schema, request) {
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

  this.post('/login', function (schema, request) {
    let attrs = this.normalizedRequestAttrs();
    let users = schema.db.users.where({username: attrs.username, password: attrs.password});
    if (users.length > 0) {
      return {
        data: {
          type: 'user',
          id: users[0].id,
          attributes: {
            username: users[0].username,
            email: users[0].email,
            token: users[0].token
          }
        }
      };
    }
    return new Mirage.Response(400, {a: 'header'}, {nonFieldErrors: ['Bad login or password']});
  });

  this.get('/conversations/', 'conversations');
  this.get('/users', 'users');
  this.get('/users/:id', 'users');
  this.get('/messages', 'messages');
  this.get('/messages/:id', 'messages');
  this.post('/messages/', 'messages');
}
