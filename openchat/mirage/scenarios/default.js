export default function(server) {
  server.createList('users', 10);
  server.create('users', {email: 'beczkowb@gmail.com', username: 'beczkowb', password: 'beczkowb', token: '123456', id:11});
  server.create('users', {email: 'faderskd@gmail.com', username: 'faderskd', password: 'faderskd', token: '123456', id: 12});
  server.create('users', {email: 'test@gmail.com', username: 'test', password: 'test', token: '123456', id: 13});
  server.create('message', {content: 'Siema siema', sentAt: new Date(), senderId: 11, receiverId: 12});
  server.create('message', {content: 'Siemaeniu', sentAt: new Date(), senderId: 12, receiverId: 11});
}
