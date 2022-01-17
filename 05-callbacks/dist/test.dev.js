"use strict";

/* eslint-env mocha */
var assert = require("assert");

var _require = require("./answers"),
    passwordCheckerCb = _require.passwordCheckerCb,
    passwordCheckerPrms = _require.passwordCheckerPrms,
    makePromiseFromFunctionWithCallback = _require.makePromiseFromFunctionWithCallback;
/* This test describes the callback version of this function */


describe("#passwordCheckerCb(email:string, password:string, cb:(User, Error) => void):void", function () {
  it("replies promptly with a user with the correct email and password", function (done) {
    function testCallback(err, user) {
      assert(!err, "There should be no error");
      assert.deepEqual(user, {
        name: "Jeff Jeffries",
        email: "jeff@jeff.jeff"
      });
      done();
    }

    passwordCheckerCb("jeff@jeff.jeff", "jeff", testCallback);
  });
  it("replies after 1000ms with the incorrect email", function (done) {
    var start = new Date();

    function testCallback(err, user) {
      assert.equal(err, "User Not Found!");
      assert(!user, "No User Should Have Returned");
      var timeDiff = new Date() - start;
      assert(timeDiff >= 1000, "This returned too early!");
      done();
    }

    passwordCheckerCb("jim@jim.jim", "jeff", testCallback);
  });
  it("replies after 1000ms with the incorrect password", function (done) {
    var start = new Date();

    function testCallback(err, user) {
      assert.equal(err, "User Not Found!");
      assert(!user, "No User Should Have Returned");
      var timeDiff = new Date() - start;
      assert(timeDiff >= 1000, "This returned too early (after " + timeDiff + "ms)");
      done();
    }

    passwordCheckerCb("jeff@jeff.jeff", "jim", testCallback);
  });
});
describe("#passwordCheckerPrms(email:string, password:string): Promise<User, Error>", function () {
  it("replies promptly with a user with the correct email and password", function () {
    return passwordCheckerPrms("jeff@jeff.jeff", "jeff").then(function (user) {
      assert.deepEqual(user, {
        name: "Jeff Jeffries",
        email: "jeff@jeff.jeff"
      });
    });
  });
  it("replies after 1000ms with the incorrect email", function () {
    var start = new Date();
    return passwordCheckerPrms("jim@jim.jim", "jeff").then(function () {
      assert.fail("This should not have succeeded!");
    }, function (error) {
      assert.equal(error, "User Not Found!");
      var timeDiff = new Date() - start;
      assert(timeDiff >= 1000, "This returned too early!");
    });
  });
  it("replies after 1000ms with the incorrect password", function () {
    var start = new Date();
    return passwordCheckerPrms("jeff@jeff.jeff", "jim").then(function () {
      assert.fail("This should not have succeeded!");
    }, function (error) {
      assert.equal(error, "User Not Found!");
      var timeDiff = new Date() - start;
      assert(timeDiff >= 1000, "This returned too early!");
    });
  });
});
describe("#makePromiseFromFunctionWithCallback:(fn:([...params,] cb: (err:E, val:T) => void)) => void)=>([...params]) => Promise<T,E>", function () {
  it("turns a resolving callback function into a resolving promise", function () {
    function resolver(cb) {
      cb(null, "Hello");
    }

    return makePromiseFromFunctionWithCallback(resolver).then(function (val) {
      assert.equal(val, "Hello");
    });
  });
  it("turns a rejecting callback function into a rejecting promise", function () {
    function rejector(cb) {
      cb("Boo!");
    }

    return makePromiseFromFunctionWithCallback(rejector).then(function () {
      assert.fail("This should have rejected");
    }, function (err) {
      assert.equal(err, "Boo!");
    });
  });
  it("takes params in the returning function", function () {
    function delayedResolver(firstVal, secondVal, cb) {
      setTimeout(function () {
        cb(null, firstVal + " " + secondVal);
      }, 500);
    }

    return makePromiseFromFunctionWithCallback(delayedResolver, "Hello", "World").then(function (val) {
      assert.equal(val, "Hello World");
    });
  });
});