import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  username(i) {return `User${i}`;},
  email(i) {return `user${i}@gmail.com`;},
  token(i) {return `tokentoken1234and${i}`;},
  password(i) {return `test${i}`;}
});
