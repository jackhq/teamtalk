(function() {
  module.exports = {
    send: function(input) {
      now.distribute(input.val());
      return input.val("");
    },
    receive: function(dom) {
      return now.receive = function(name, message) {
        return dom.addMessage(name, message);
      };
    }
  };
}).call(this);
