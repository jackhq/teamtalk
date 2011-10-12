$( ->
  # send Message
  sendMessage = ->
    msg = $("#text-input")
    now.distribute msg.val()
    msg.val ""
  $("#send-button").click sendMessage
  $("#text-input").live "keydown", (e) ->
    code = (if e.keyCode then e.keyCode else e.which)
    if code == 13
      sendMessage()
      true
  
  # mange nickName
  now.name = $.cookie("name")
  now.name = prompt("What is your name?", "")  if now.name == null
  $(".sidebar .well").append "<h2 id=" + now.name + ">" + now.name + "</h2>"
  $.cookie "name", now.name

  # receive Message
  now.receive = (name, message) ->
    msg = $("<li style='display:none;'><p class='alert-message block-message success'><span style='font-size: 1.2em;color: rgba(0,0,0,.4);'>" + name + " says </span><br />" + message + "<br /><small style='color:rgba(0,0,0,.4);'>" + Date.create("now").relative() + "</small></p></li>")
    $("#messages").prepend msg
    msg.fadeIn 500
)

