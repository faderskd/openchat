import BaseSerializer from './application';

export default BaseSerializer.extend({
  serialize() {
    console.log('jestem conversation');

    let json = BaseSerializer.prototype.serialize.apply(this, arguments);
    console.log(json);

    if (Array.isArray(json.data)) {
      json.data.forEach((data, i) => {
        json.data[i].relationships.users.data = this.userSerialize(data);
      });
    } else {
      json.data.relationships.users.data = this.userSerialize(json.data);
    }

    if (json.included && Array.isArray(json.included)) {
      json.included.forEach((data, i) => {
        json.included[i] = this.includeUser(data);
      });
    } else if (json.included && !Array.isArray(json.included)) {
      json.included = this.includeUser(json.included);
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
  },

  includeUser(conversationUser) {
    let user = {};
    user.id = conversationUser.relationships.user.data.id;
    user.type = 'users';
    user.attributes = this.registry.schema.users.find(user.id);
    return user;
  }
});
