((function(){if(!this.require){var a={},b={},c=function(f,g){var h=b[f],i=d(g,f),j;if(h)return h;if(!(j=a[i]||a[i=d(i,"./index")]))throw"module '"+f+"' not found";h={id:f,exports:{}};try{return b[f]=h.exports,j(h.exports,function(a){return c(a,e(i))},h),b[f]=h.exports}catch(k){throw delete b[f],k}},d=function(a,b){var c=[],d,e;/^\.\.?(\/|$)/.test(b)?d=[a,b].join("/").split("/"):d=b.split("/");for(var f=0,g=d.length;f<g;f++)e=d[f],e==".."?c.pop():e!="."&&e!=""&&c.push(e);return c.join("/")},e=function(a){return a.split("/").slice(0,-1).join("/")};this.require=function(a){return c(a,"")},this.require.define=function(b){for(var c in b)a[c]=b[c]}}return this.require.define})).call(this)({dom:function(a,b,c){((function(){c.exports={addMessage:function(a,b){var c;return c=$("<li style='display:none;'>\n  <p class='alert-message block-message success'>\n    <span style='font-size: 1.2em;color: rgba(0,0,0,.4);'>"+a+" says</span>\n    <br />\n    "+b+"\n    <br />\n    <small style='color:rgba(0,0,0,.4);'>"+Date.create("now").relative()+"</small>\n  </p>\n</li>    "),$("#messages").prepend(c),c.fadeIn(500)}}})).call(this)},msg:function(a,b,c){((function(){c.exports={send:function(a){return now.distribute(a),!0},receive:function(a){return now.receive=function(b,c){return a.addMessage(b,c)}}}})).call(this)}})