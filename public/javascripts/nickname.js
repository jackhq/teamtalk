(function() {
  module.exports = {
    update: function() {
      now.name = $.cookie("name");
      if (now.name === null) {
        now.name = prompt("What is your name?", "");
      }
      $.cookie("name", now.name);
      return now.name;
    }
  };
}).call(this);
