module.exports = {
  send: (input) ->
    now.distribute input.val()
    input.val ""

 receive: (dom) ->
    now.receive = (name, message) ->
      dom.addMessage name, message
}

