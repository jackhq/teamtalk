(function() {
  module.exports = {
    send: function(msgText) {
      now.distribute(msgText);
      return true;
    },
    receive: function(dom) {
      return now.receive = function(name, message) {
        return dom.addMessage(name, message);
      };
    }
  };
}).call(this);
