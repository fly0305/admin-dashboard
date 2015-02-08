/*
 * React.js Starter Kit
 * Copyright (c) 2014 Konstantin Tarkus (@koistya), KriaSoft LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

require('6to5/polyfill');

var React = require('react');
var emptyFunction = require('react/lib/emptyFunction');
var App = require('./components/App');
var Dispatcher = require('./core/Dispatcher');
var AppActions = require('./actions/AppActions');
var ActionTypes = require('./constants/ActionTypes');

// Export React so the dev tools can find it
(window !== window.top ? window.top : window).React = React;

var path = decodeURI(window.location.pathname);
var setMetaTag = (name, content) => {
  // Remove and create a new <meta /> tag in order to make it work
  // with bookmarks in Safari
  var elements = document.getElementsByTagName('meta');
  [].slice.call(elements).forEach((element) => {
    if (element.getAttribute('name') === name) {
      element.parentNode.removeChild(element);
    }
  });
  var meta = document.createElement('meta');
  meta.setAttribute('name', name);
  meta.setAttribute('content', content);
  document.getElementsByTagName('head')[0].appendChild(meta);
};

function run() {
  // Render the top-level React component
  var props = {
    path: path,
    onSetTitle: (title) => document.title = title,
    onSetMeta: setMetaTag,
    onPageNotFound: emptyFunction
  };
  var component = React.createElement(App, props);
  var app = React.render(component, document.body);

  // Update `Application.path` prop when `window.location` is changed
  Dispatcher.register((payload) => {
    if (payload.action.actionType === ActionTypes.CHANGE_LOCATION) {
      app.setProps({path: decodeURI(payload.action.path)});
    }
  });
}

// Run the application when both DOM is ready
// and page content is loaded
Promise.all([
  new Promise((resolve) => {
    if (window.addEventListener) {
      window.addEventListener('DOMContentLoaded', resolve);
    } else {
      window.attachEvent('onload', resolve);
    }
  }),
  new Promise((resolve) => {
    AppActions.loadPage(path, resolve);
  })
]).then(run);
