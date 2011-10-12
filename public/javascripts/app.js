(function() {
  $(function() {
    var sendMessage;
    sendMessage = function() {
      var msg;
      msg = $("#text-input");
      now.distribute(msg.val());
      return msg.val("");
    };
    $("#send-button").click(sendMessage);
    $("#text-input").live("keydown", function(e) {
      var code;
      code = (e.keyCode ? e.keyCode : e.which);
      if (code === 13) {
        sendMessage();
        return true;
      }
    });
    now.name = $.cookie("name");
    if (now.name === null) {
      now.name = prompt("What is your name?", "");
    }
    $(".sidebar .well").append("<h2 id=" + now.name + ">" + now.name + "</h2>");
    $.cookie("name", now.name);
    return now.receive = function(name, message) {
      var msg;
      msg = $("<li style='display:none;'><p class='alert-message block-message success'><span style='font-size: 1.2em;color: rgba(0,0,0,.4);'>" + name + " says </span><br />" + message + "<br /><small style='color:rgba(0,0,0,.4);'>" + Date.create("now").relative() + "</small></p></li>");
      $("#messages").prepend(msg);
      return msg.fadeIn(500);
    };
  });
}).call(this);
