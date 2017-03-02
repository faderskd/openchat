import BaseSerializer from './application';

export default BaseSerializer.extend({
  attrs: ['updatedAt', 'id'],
  include: ['users', 'messages']
});
