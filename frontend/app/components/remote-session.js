import Ember from 'ember';

export default Ember.Component.extend({

  _forgeConnectionString: function(token) {

    var width = 800;
    var height = 600;

    // Calculate optimal width/height for display
    var pixel_density = Ember.$(this.get('element')).devicePixelRatio || 1;
    var optimal_dpi = pixel_density * 96;
    var optimal_width = width * pixel_density;
    var optimal_height = height * pixel_density;

    // Build base connect string
    var connectString =
	  "token="             + token +
	  "&GUAC_DATA_SOURCE=" + "noauth" +
	  "&GUAC_ID="          + "localhost" +
	  "&GUAC_TYPE="        + "c" + // connection
	  "&GUAC_WIDTH="       + Math.floor(optimal_width) +
	  "&GUAC_HEIGHT="      + Math.floor(optimal_height) +
	  "&GUAC_DPI="         + Math.floor(optimal_dpi);

    // Add audio mimetypes to connect string
    connectString += "&GUAC_AUDIO=" + "audio%2Fwav";

    // Add video mimetypes to connect string
    connectString += "&GUAC_VIDEO=" + "video%2Fmp4";

    return connectString;
  },

  initCanvas: function() {

    Ember.$.get("/token/", (token) => {

      token = JSON.parse(token);
      // Get display div from document
      var display = document.getElementById("display");

      // Instantiate client, using an HTTP tunnel for communications.
      var guac = new Guacamole.Client(
	new Guacamole.WebSocketTunnel("/guacamole/websocket-tunnel?" + this._forgeConnectionString(token.authToken))
      );

      // Add client to display div
      display.appendChild(guac.getDisplay().getElement());

      // Error handler
      guac.onerror = function(error) {
	alert(error);
      };

      // Mouse
      var mouse = new Guacamole.Mouse(guac.getDisplay().getElement());

      mouse.onmousedown =
	mouse.onmouseup   =
	mouse.onmousemove = function(mouseState) {
	  guac.sendMouseState(mouseState);
	};

      // Keyboard
      var keyboard = new Guacamole.Keyboard(document);

      keyboard.onkeydown = function (keysym) {
	guac.sendKeyEvent(1, keysym);
      };

      keyboard.onkeyup = function (keysym) {
	guac.sendKeyEvent(0, keysym);
      };

      // Connect
      guac.connect();

      // Disconnect on close
      window.onunload = function() {
	guac.disconnect();
      };
    });

  }.on('didRender')

});
