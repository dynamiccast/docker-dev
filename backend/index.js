var express = require('express');
var exec = require('ssh-exec');
var app = express();

var HOST = "ubuntu-qemu";
var USERNAME = "vagrant";
var PASSWORD = "vagrant";

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
