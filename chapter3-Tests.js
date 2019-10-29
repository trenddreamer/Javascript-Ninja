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
    assert(canFly.name === "canFly", "canFly() has a name??");
    assert(isDeadly.name === "", "isDeadly() has no name");
    assert(typeof window.isDeadly === "function", "isDeadly() defined");

    function outer() {
      assert(
        typeof inner === "function",
        "inner() in scope before declaration"
      );
      function inner() {}
      assert(typeof inner === "function", "inner() in scope after declaration");
      assert(window.inner === undefined, "inner() not in global scope");
    }
    outer();
    assert(window.inner === undefined, "inner() still not in global scope");

    assert(true, "|----- BEFORE OUTER -----|");
    assert(true, "some decriptive text");
    assert(typeof outer1 === "function", "outer() is in scope");
    assert(typeof inner1 === "function", "inner() is in scope");
    assert(typeof a === "number", "a is in scope");
    assert(typeof b === "number", "b is in scope");
    assert(typeof c === "number", "c is in scope");
    function outer1() {
      assert(true, "|----- INSIDE OUTER, BEFORE a -----|");
      assert(true, "some decriptive text");
      assert(typeof outer1 === "function", "outer() is in scope");
      assert(typeof inner1 === "function", "inner() is in scope");
      assert(typeof a === "number", "a is in scope");
      assert(typeof b === "number", "b is in scope");
      assert(typeof c === "number", "c is in scope");

      var a = 1;
      assert(true, "|----- INSIDE OUTER, AFTER a -----|");
      assert(true, "some decriptive text");
      assert(typeof outer1 === "function", "outer() is in scope");
      assert(typeof inner1 === "function", "inner() is in scope");
      assert(typeof a === "number", "a is in scope");
      assert(typeof b === "number", "b is in scope");
      assert(typeof c === "number", "c is in scope");

      function inner1() {}
      var b = 2;

      assert(true, "|----- INSIDE OUTER, AFTER inner() AND b -----|");
      assert(true, "some decriptive text");
      assert(typeof outer1 === "function", "outer() is in scope");
      assert(typeof inner1 === "function", "inner() is in scope");
      assert(typeof a === "number", "a is in scope");
      assert(typeof b === "number", "b is in scope");
      assert(typeof c === "number", "c is in scope");

      if (a == 1) {
        var c = 3;
        assert(true, "|----- INSIDE OUTER, INSIDE if -----|");
        assert(true, "some decriptive text");
        assert(typeof outer1 === "function", "outer() is in scope");
        assert(typeof inner1 === "function", "inner() is in scope");
        assert(typeof a === "number", "a is in scope");
        assert(typeof b === "number", "b is in scope");
        assert(typeof c === "number", "c is in scope");
      }
      assert(true, "|----- INSIDE OUTER, OUTSIDE if -----|");
      assert(true, "some decriptive text");
      assert(typeof outer1 === "function", "outer() is in scope");
      assert(typeof inner1 === "function", "inner() is in scope");
      assert(typeof a === "number", "a is in scope");
      assert(typeof b === "number", "b is in scope");
      assert(typeof c === "number", "c is in scope");
    }
    outer1();
    assert(true, "|----- AFTER OUTER -----|");
    assert(true, "some decriptive text");
    assert(typeof outer1 === "function", "outer() is in scope");
    assert(typeof inner1 === "function", "inner() is in scope");
    assert(typeof a === "number", "a is in scope");
    assert(typeof b === "number", "b is in scope");
    assert(typeof c === "number", "c is in scope");

    function creep() {
      return this;
    }
    assert(creep() === window, "Creeping in the window");
    var sneak = creep;
    assert(sneak() === window, "Sneaking in the window");
    var ninja1 = {
      skulk: creep
    };
    assert(ninja1.skulk() === ninja1, "The 1st ninja is skulking");
    var ninja2 = {
      skulk: creep
    };
    assert(ninja2.skulk() === ninja2, "The 2nd ninja is skulking");

    function Ninja() {
      this.skulk = function() {
        return this;
      };
    }
    var ninja1 = new Ninja();
    var ninja2 = new Ninja();
    assert(ninja1.skulk() === ninja1, "The 1st ninja is skulking");
    assert(ninja2.skulk() === ninja2, "The 2nd ninja is skulking");

    function juggle() {
      var result = 0;
      for (var n = 0; n < arguments.length; n++) {
        result += arguments[n];
      }
      this.result = result;
    }
    var ninja1 = {};
    var ninja2 = {};
    juggle.apply(ninja1, [1, 2, 3, 4]);
    juggle.call(ninja2, 5, 6, 7, 8);
    assert(ninja1.result === 10, "juggled via apply");
    assert(ninja2.result === 26, "juggled via call");

    function forEach(list, callback) {
      for (var n = 0; n < list.length; n++) {
        callback.call(list[n], n);
      }
    }
    var list = ["shuriken", "katana", "nunchucks"];
    forEach(list, function(index) {
      console.log(index);
      console.log(this);
      assert(this == list[index], "Got the expected value of " + list[index]);
    });
  });
};

window.isDeadly = function() {
  return true;
};
function isNimble() {
  return true;
}

var canFly = function() {
  return true;
};
