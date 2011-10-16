module.exports = {
  send: (msgText) ->
    now.distribute msgText
    true

 receive: (dom) ->
    now.receive = (name, message) ->
      dom.addMessage name, message
}

