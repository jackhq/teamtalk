(function() {
  module.exports = {
    captureEnter: function(selector, cb) {
      return $(selector).live('keydown', function(e) {
        var code;
        code = (e.keyCode ? e.keyCode : e.which);
        if (code === 13) {
          return cb();
        }
      });
    },
    captureClick: function(selector, cb) {
      return $(selector).live('click', cb);
    },
    addNick: function(selector, name) {
      return $(selector).append("<h2 id='" + name + "'>" + name + "</h2>");
    },
    addMessage: function(name, message) {
      var html;
      html = $("<li style='display:none;'>\n  <p class='alert-message block-message success'>\n    <span style='font-size: 1.2em;color: rgba(0,0,0,.4);'>" + name + " says</span>\n    <br />\n    " + message + "\n    <br />\n    <small style='color:rgba(0,0,0,.4);'>" + (Date.create("now").relative()) + "</small>\n  </p>\n</li>    ");
      $("#messages").prepend(html);
      return html.fadeIn(500);
    }
  };
}).call(this);
