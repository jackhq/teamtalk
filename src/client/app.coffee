msg = {
    # send Message
  send: ->
    msg = $("#text-input")
    now.distribute msg.val()
    msg.val ""
 
 receive: (dom) ->
    now.receive = (name, msg) ->
      dom.addMessage name, msg
}

dom = {
  captureEnter: (selector, cb) ->
    $(selector).live 'keydown', (e) ->
      code = (if e.keyCode then e.keyCode else e.which)
      cb() if code == 13

  captureClick: (selector, cb) ->
    $(selector).live 'click', cb()

  addNick: (selector, name) ->
    $(selector).append "<h2 id=" + name + ">" + name + "</h2>"

  addMessage: (name, msg) ->
    html = """
<li style='display:none;'>
  <p class='alert-message block-message success'>
    <span style='font-size: 1.2em;color: rgba(0,0,0,.4);'>#{name} says</span>
    <br />
    #{msg}
    <br />
    <small style='color:rgba(0,0,0,.4);'>#{Date.create("now").relative()}</small>
  </p>
</li>    
    """
    $("#messages").prepend html
    msg.fadeIn 500

}

nickName = {
  update: ->
    now.name = $.cookie("name")
    now.name = prompt("What is your name?", "")  if now.name == null
    $.cookie "name", now.name
    now.name
}


$( ->
  
  dom.captureClick "#send-button", msg.send
  dom.captureEnter "#text-input", msg.send
  dom.addNick ".sidebar .well", nickName.update()
  msg.receive dom

)

