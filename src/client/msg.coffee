module.exports = {
  send: ->
    messageText = $("#text-input")
    now.distribute(messageText.val())
    messageText.val ""

 receive: (dom) ->
    now.receive = (name, message) ->
      dom.addMessage name, message
}

