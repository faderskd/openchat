export default function(server) {
  server.createList('user', 20);
  server.createList('conversation', 40);
  server.createList('message', 100);
  server.createList('conversationUser', 30);
}
