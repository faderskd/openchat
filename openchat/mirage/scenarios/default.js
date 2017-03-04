export default function(server) {
  let beczkowb = server.create('user', {
    username: 'beczkowb',
    email: 'beczkowb@gmail.com',
    password: 'validpassword1234',
    token: 'token-beczkowb'
  });

  let faderskd = server.create('user', {
    username: 'faderskd',
    email: 'faderskd@gmail.com',
    password: 'validpassword4321',
    token: 'token-faderskd'
  });

  let klaudiab = server.create('user', {
    username: 'klaudiab',
    email: 'klaudiab@gmail.com',
    password: 'validpassword0987',
    token: 'token-klaudiab'
  });

  let conversationBeczkowbFaderskd = server.create('conversation', {
    updatedAt: new Date()
  });
  let conversationUserBeczkowbFaderskd1 = server.create('conversationUser', {
    user: beczkowb,
    conversation: conversationBeczkowbFaderskd
  });
  let conversationUserBeczkowbFaderskd2 = server.create('conversationUser', {
    user: faderskd,
    conversation: conversationBeczkowbFaderskd
  });

  let conversationBeczkowbKlaudiab = server.create('conversation', {
    updatedAt: new Date()
  });
  let conversationUserBeczkowbKlaudiab1 = server.create('conversationUser', {
    user: beczkowb,
    conversation: conversationBeczkowbKlaudiab
  });
  let conversationUserBeczkowbKlaudiab2 = server.create('conversationUser', {
    user: klaudiab,
    conversation: conversationBeczkowbKlaudiab
  });
}
