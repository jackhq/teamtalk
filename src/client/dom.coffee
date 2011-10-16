module.exports = {
  addMessage: (name, message) ->
    html = $("""
<li style='display:none;'>
  <p class='alert-message block-message success'>
    <span style='font-size: 1.2em;color: rgba(0,0,0,.4);'>#{name} says</span>
    <br />
    #{message}
    <br />
    <small style='color:rgba(0,0,0,.4);'>#{Date.create("now").relative()}</small>
  </p>
</li>    
    """)
    $("#messages").prepend html
    html.fadeIn 500

}
