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

  this.get('/messages', 'message');

  // this.get('/conversations', function (schema, request) {
  //   return {
  //     data: [
  //       {
  //         type: 'conversations',
  //         id: 1,
  //         attributes: {
  //           'updated-at': new Date()
  //         },
  //
  //         relationships: {
  //           users: {
  //             data: [
  //               {type: 'users', id: 1},
  //               {type: 'users', id: 2}
  //             ]
  //           },
  //           messages: {
  //             data: [
  //               {type: 'messages', id: 1},
  //               {type: 'messages', id: 2}
  //             ]
  //           }
  //         }
  //       }
  //     ]
  //   };
  // });

  // this.get('/conversations/:id');
  // this.get('/conversations', function (schema, request) {
  //   console.log(request);
  //   // let token = request.requestHeaders.API_KEY;
  //   let token = 'token-beczkowb';
  //
  //   let user = schema.users.findBy({token: token});
  //   console.log(user);
  //   console.log(user.conversations);
  //
  //   let conversations = [];
  //   for (let i = 0; user.conversations.models.length > i; i++) {
  //     let conversationUser = user.conversations.models[i];
  //     conversations.push(conversationUser.conversation);
  //   }
  //   console.log(conversations);
  //   let responseBody = {
  //     data: conversations
  //   }
  // });
  this.get('/conversations');

  this.get('/users');
  this.get('/users/:id');
}
