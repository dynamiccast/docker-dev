var express = require('express');
var exec = require('ssh-exec');
var app = express();

var HOST = "ubuntu-qemu";
var USERNAME = "vagrant";
var PASSWORD = "vagrant";

app.get('/apps', function (req, res) {

  exec('for app in /usr/share/applications/*.desktop ; do app="${app##/*/}"; echo -n "${app::-8}=" && cat /usr/share/applications/${app::-8}.desktop | grep \'^Exec\' | head -n1 | cut -d \'=\' -f 2 ; done', {
    user: USERNAME,
    host: HOST,
    password: PASSWORD
  }, function(err, stdout, stderr) {

    if (err) {
      return res.status(500).send({
	error: err,
	stderr: stderr
      });
    }

    var apps = stdout.split("\n");
    var result = {};

    apps.forEach(function(app) {

      var appName = app.split('=')[0];
      var appPath = app.split('=')[1];

      result[appName] = appPath;
    });

    return res.send(result);
  });

});

app.get('/', function (req, res) {

  exec('uname -a', {
    user: USERNAME,
    host: HOST,
    password: PASSWORD
  }, function(err, stdout, stderr) {

    if (err) {
      return res.status(500).send({
	error: err,
	stderr: stderr
      });
    }

    return res.send(stdout);
  });

});

app.listen(3000, function () {
  console.log('Human-apps listening on port 3000');
});
