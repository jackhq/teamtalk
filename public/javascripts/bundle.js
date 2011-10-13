
(function(/*! Stitch !*/) {
  if (!this.require) {
    var modules = {}, cache = {}, require = function(name, root) {
      var module = cache[name], path = expand(root, name), fn;
      if (module) {
        return module;
      } else if (fn = modules[path] || modules[path = expand(path, './index')]) {
        module = {id: name, exports: {}};
        try {
          cache[name] = module.exports;
          fn(module.exports, function(name) {
            return require(name, dirname(path));
          }, module);
          return cache[name] = module.exports;
        } catch (err) {
          delete cache[name];
          throw err;
        }
      } else {
        throw 'module \'' + name + '\' not found';
      }
    }, expand = function(root, name) {
      var results = [], parts, part;
      if (/^\.\.?(\/|$)/.test(name)) {
        parts = [root, name].join('/').split('/');
      } else {
        parts = name.split('/');
      }
      for (var i = 0, length = parts.length; i < length; i++) {
        part = parts[i];
        if (part == '..') {
          results.pop();
        } else if (part != '.' && part != '') {
          results.push(part);
        }
      }
      return results.join('/');
    }, dirname = function(path) {
      return path.split('/').slice(0, -1).join('/');
    };
    this.require = function(name) {
      return require(name, '');
    }
    this.require.define = function(bundle) {
      for (var key in bundle)
        modules[key] = bundle[key];
    };
  }
  return this.require.define;
}).call(this)({"app": function(exports, require, module) {(function() {

}).call(this);
}, "dom": function(exports, require, module) {(function() {
  module.exports = {
    captureEnter: function(selector, cb) {
      return $(selector).live('keydown', function(e) {
        var code;
        code = (e.keyCode ? e.keyCode : e.which);
        if (code === 13) {
          return cb();
        }
      });
    },
    captureClick: function(selector, cb) {
      return $(selector).live('click', cb);
    },
    addNick: function(selector, name) {
      return $(selector).append("<h2 id='" + name + "'>" + name + "</h2>");
    },
    addMessage: function(name, message) {
      var html;
      html = $("<li style='display:none;'>\n  <p class='alert-message block-message success'>\n    <span style='font-size: 1.2em;color: rgba(0,0,0,.4);'>" + name + " says</span>\n    <br />\n    " + message + "\n    <br />\n    <small style='color:rgba(0,0,0,.4);'>" + (Date.create("now").relative()) + "</small>\n  </p>\n</li>    ");
      $("#messages").prepend(html);
      return html.fadeIn(500);
    }
  };
}).call(this);
}, "msg": function(exports, require, module) {(function() {
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
}, "nickname": function(exports, require, module) {(function() {
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
}});
