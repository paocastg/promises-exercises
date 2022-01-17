"use strict";

/* eslint-env mocha */
var assert = require("assert");

var _require = require("./answers"),
    waitForPromise = _require.waitForPromise,
    consumePromise = _require.consumePromise;

describe("Consuming Promises with .then(cb) and .catch(cb)", function () {
  describe("#waitForPromise(promise, action) => void", function () {
    it("waits until the promise is done to perform the action.", function (done) {
      var start = new Date();

      function action() {
        var diff = new Date() - start;
        assert(diff >= 1000, "Not enough time passed ".concat(diff, " < 1000"));
        assert(diff <= 1050, "Too much time passed ".concat(diff, " > 1050"));
        done();
      }

      var delayPromise = new Promise(function (resolve) {
        setTimeout(resolve, 1000);
      });
      waitForPromise(delayPromise, action);
    });
  });
  describe("#consumePromise(promise, consumer, errorHandler) => void", function () {
    it("calls the consumer on the resolve value of the promise", function (done) {
      var resolvedPromise = Promise.resolve("Yay!");

      function consumer(val) {
        assert.equal(val, "Yay!");
        done();
      }

      function handler() {
        assert.fail("This should not have been called.");
      }

      assert.equal(consumePromise(resolvedPromise, consumer, handler), undefined, "Consume Promise should not return anything.");
    });
    it("calls the errorHandler on the rejection error of the promise", function (done) {
      var rejectedPromise = Promise.reject("Boo!");

      function consumer() {
        assert.fail("This should not have been called.");
      }

      function handler(err) {
        assert.equal(err, "Boo!");
        done();
      }

      assert.equal(consumePromise(rejectedPromise, consumer, handler), undefined, "Consume Promise should not return anything.");
    });
  });
});