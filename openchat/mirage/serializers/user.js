import BaseSerializer from './application';

export default BaseSerializer.extend({
  serialize() {
    console.log('jestem user');
    let json = BaseSerializer.prototype.serialize.apply(this, arguments);

    if (Array.isArray(json.data)) {
      json.data.forEach((data, i) => {
        json.data[i].relationships.conversations.data = this.conversationSerialize(data);
      });
    } else {
      json.data.relationships.conversations.data = this.conversationSerialize(json.data);
    }

    return json;
  },

  conversationSerialize(data) {
    return data.relationships.conversations.data.map(conversationUser => ({
      id: this.registry.schema.conversationUsers.find(conversationUser.id).conversationId,
      type: 'conversation'
    }));
  }
});
