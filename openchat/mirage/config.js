export default function() {
  this.namespace = 'api';

  this.get('/users/:username/is-unique', (schema, request) => {
    let username = request.params.username;
    return {
      isUnique: username !== 'beczkowb'
    }
  });
}
