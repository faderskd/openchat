import { JSONAPISerializer } from 'ember-cli-mirage';

export default JSONAPISerializer.extend({
  serialize() {
    console.log('jestem conversation');
    let json = JSONAPISerializer.prototype.serialize.apply(this, arguments);
    console.log(json);
    if (Array.isArray(json.data)) {
      json.data.forEach((data, i) => {
        json.data[i].relationships.users.data = this.userSerialize(data);
      });
    } else {
      json.data.relationships.users.data = this.userSerialize(json.data);
    }
    console.log('po');
    console.log(json);
    return json;
  },

  userSerialize(data) {
    let result = data.relationships.users.data.map(conversationUser => ({
      id: this.registry.schema.conversationUsers.find(conversationUser.id).userId,
      type: 'user'
    }));
    return result;
  }
});
