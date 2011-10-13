(function() {
  module.exports = {
    send: function() {
      var messageText;
      messageText = $("#text-input");
      now.distribute(messageText.val());
      return messageText.val("");
    },
    receive: function(dom) {
      return now.receive = function(name, message) {
        return dom.addMessage(name, message);
      };
    }
  };
}).call(this);
