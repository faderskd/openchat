import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('register');
  this.route('login');
  this.route('error');
  this.route('messages', function() {
    this.route('show', {path: '/:username'});
  });
});

export default Router;
