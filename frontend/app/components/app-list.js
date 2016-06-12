import Ember from 'ember';

export default Ember.Component.extend({

  appList: Ember.ArrayProxy.create([]),

  getAppList: function() {

    Ember.$.ajax({
      type: "GET",
      url: "http://localhost:3000/apps"
    }).then((response) => {

      this.get('appList').set('content', []);
      for (var appName in response) {

	this.get('appList').pushObject({
	  appName: appName,
	  appPath: response[appName]
	});
      }
    });
  }.on('init'),

  actions: {

    run: function(appPath) {

      Ember.$.ajax({
	type: "POST",
	url: "http://localhost:3000/app/" + appPath
      });
    }
  }
});
