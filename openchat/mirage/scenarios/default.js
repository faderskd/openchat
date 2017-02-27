export default function(server) {
  server.createList('users', 10);
  server.create('users', {email: 'beczkowb@gmail.com', username: 'beczkowb'});
  server.create('users', {email: 'faderskd@gmail.com', username: 'faderskd'});
}
