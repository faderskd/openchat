export default function(server) {
  server.createList('user', 10);
  server.createList('message', 10);
  server.createList('conversation', 10);

}
