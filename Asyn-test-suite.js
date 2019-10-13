(function() {
  var queue = [],
    paused = false,
    results;
  this.test = function(name, fn) {
    queue.push(function() {
      results = document.getElementById("results");
      results = assert(true, name).appendChild(document.createElement("ul"));
      fn();
    });

    runTest();
  };
  this.pause = function() {
    paused = true;
  };
  this.resume = function() {
    paused = false;
    setTimeout(runTest, 1);
  };
  function runTest() {
    if (!paused && queue.length) {
      queue.shift()();
      if (!paused) {
        resume();
      }
    }
  }
  this.assert = function assert(value, desc) {
    var li = document.createElement("li");
    li.className = value ? "pass" : "fail";
    li.appendChild(document.createTextNode(desc));
    results.appendChild(li);
    if (!value) {
      li.parentNode.parentNode.className = "fail";
    }
    return li;
  };
})();
window.onload = function() {
  test("function tests", function() {
    var text = "Domo arigato!";
    function useless(cb) {
      return cb();
    }
    assert(
      useless(function() {
        return text;
      }) === text,
      "the useless function works! " + text
    );

    assert(typeof window.isNimble === "function", "isNimble() defined");
    assert(isNimble.name === "isNimble", "isNimble() has a name");

    assert(typeof window.canFly === "function", "canFly() defined");
    assert(canFly.name === "", "canFly() has no name");
  });
};
function isNimble() {
  //only part of the window object if it is declared outside of the anon function.
  return true;
}

var canFly = function() {
  return true;
};
