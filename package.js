Package.describe({
  name: 'maodouio:friends',
  version: '0.0.9',
  // Brief, one-line summary of the package.
  summary: 'microduino friends package',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/maodouio/meteor-friends',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.use('iron:router@1.0.12', ["server", "client"]);
  api.use('accounts-ui@1.1.6', ["server", "client"]);
  api.use('accounts-password@1.1.4', ["server", "client"]);
  api.use('momentjs:moment@2.10.6', ["server", "client"]);
  api.use('aldeed:autoform@5.7.1', ["server", "client"]);
  api.use('aldeed:collection2@2.5.0', ["server", "client"]);
  api.use('aldeed:simple-schema@1.3.2', ["server", "client"]);
  api.use('minimongo@1.0.10', 'client');
  api.use('mongo-livedata@1.0.9', 'client');
  api.use('templating@1.1.4', 'client');

  api.addFiles('client/router.js', 'client');
  api.addFiles('client/helpers.js', 'client');
  api.addFiles('client/friends/friends_index.html', 'client');
  api.addFiles('client/friends/friend_show.html', 'client');

  api.addFiles('lib/collection.js');

  api.addFiles('server/method.js', 'server');
  api.addFiles('server/publications.js', 'server');

  api.export('Friends');
});
