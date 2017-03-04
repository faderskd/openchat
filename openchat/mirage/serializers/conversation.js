import BaseSerializer from './application';

export default BaseSerializer.extend({
  serialize() {
    console.log('jestem conversation');
    console.log(arguments);
    let json = BaseSerializer.prototype.serialize.apply(this, arguments);
    console.log(json.data[0].relationships.users.data);

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
