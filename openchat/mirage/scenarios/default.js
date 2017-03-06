export default function(server) {
  // server.createList('user', 10);
  // server.createList('message', 10);
  // server.createList('conversation', 10);
  let daniel = server.create('user', {username: 'daniel', email: 'daniel.faderski@gmail.com', token: '111111', password: 'daniel'});
  let bartek = server.create('user', {username: 'bartek', email: 'bartek.beczkowski@gmail.com', token: '222222', password: 'bartek'});
  let benek = server.create('user', {username: 'benek', email: 'benek.niemam@gmail.com', token: '333333', password: 'benek'});

  let conversation1 = server.create('conversation', {updatedAt: new Date()});
  let conversation2 = server.create('conversation', {updatedAt: new Date()});

  let message1 = server.create('message',  {content: 'wiadomosc od daniela', sentAt: new Date(), sender: daniel, conversation: conversation1});
  let message2 = server.create('message',  {content: 'wiadomosc od bartka', sentAt: new Date(), sender: bartek, conversation: conversation1});
  let message3 = server.create('message',  {content: 'wiadomosc od daniela 1', sentAt: new Date(), sender: daniel, conversation: conversation1});
  let message4 = server.create('message',  {content: 'wiadomosc od bartla 1', sentAt: new Date(), sender: bartek, conversation: conversation1});


  let message1 = server.create('message', {content: 'wiadomosc od benka (ben)', sentAt: newData(), sender: benek, conversation: conversation2});
  let message1 = server.create('message', {content: 'wiadomosc od daniela (ben)', sentAt: newData(), sender: daniel, conversation: conversation2});
  let message1 = server.create('message', {content: 'wiadomosc od benka (ben)', sentAt: newData(), sender: benek, conversation: conversation2});
  let message1 = server.create('message', {content: 'wiadomosc od daniela (ben)', sentAt: newData(), sender: daniel, conversation: conversation2});


  conversation.messages = [message1, message2, message3, message4];
  conversation.users = [daniel, bartek];
};
