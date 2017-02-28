export default function(server) {
  server.createList('users', 10);
  server.create('users', {email: 'beczkowb@gmail.com', username: 'beczkowb', password: 'beczkowb', token: '123456'});
  server.create('users', {email: 'faderskd@gmail.com', username: 'faderskd', password: 'faderskd', token: '123456'});
  server.create('users', {email: 'test@gmail.com', username: 'test', password: 'test', token: '123456'});
}
