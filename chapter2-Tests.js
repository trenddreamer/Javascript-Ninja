window.onload = function() {
  test("A test.", function() {
    assert(true, "First assertion completed");
    assert(true, "Second assertion completed");
    assert(true, "Third assertion completed");
  });
  test("Another test.", function() {
    assert(true, "First test completed");
    assert(false, "Second test failed");
    assert(true, "Third assertion completed");
  });
  test("A third test.", function() {
    assert(null, "fail");
    assert(5, "pass");
  });

  test("Async Test #1", function() {
    pause();
    setTimeout(function() {
      assert(true, "First test completed");
      resume();
    }, 1000);
  });
  test("Async Test #2", function() {
    pause();
    setTimeout(function() {
      assert(true, "Second test completed");
      resume();
    }, 1000);
  });
};
