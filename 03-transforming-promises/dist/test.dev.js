"use strict";

/* eslint-env mocha */
var assert = require("assert");

var _require = require("./answers"),
    mapPromise = _require.mapPromise,
    squarePromise = _require.squarePromise,
    squarePromiseOrZero = _require.squarePromiseOrZero,
    switcheroo = _require.switcheroo;

describe("Transforming Promises with .then(cb) and .catch(cb)", function () {
  describe("#mapPromise(promise, transformer) => Promise", function () {
    it("transforms a promises resolution value", function () {
      return mapPromise(Promise.resolve(3), function (val) {
        return val + val;
      }).then(function (val) {
        assert.equal(val, 6);
      });
    });
    it("returns a promise that rejects if the first promise rejects", function () {
      return mapPromise(Promise.reject("Boo!"), function (val) {
        return val;
      }).then(function (val) {
        assert.fail("This should not resolve!  It resolved with: " + val);
      }, function (error) {
        assert.equal(error, "Boo!");
      });
    });
    it("returns a promise that rejects if the transformer throws an error", function () {
      return mapPromise(Promise.resolve(3), function () {
        throw new Error("Boo!");
      }).then(function (val) {
        assert.fail("This should not resolve!  It resolved with: " + val);
      }, function (error) {
        assert.equal(error.message, "Boo!");
      });
    });
  });
  describe("#squarePromise(promise) => Promise", function () {
    it("squares the resolution value of the promise", function () {
      return squarePromise(Promise.resolve(5)).then(function (val) {
        assert.equal(val, 25);
      });
    });
    it("converts a numeric string to a number and squares it", function () {
      return squarePromise(Promise.resolve("11")).then(function (val) {
        assert.equal(val, 121);
      });
    });
    it("rejects if the resolution value is not numeric", function () {
      return squarePromise(Promise.resolve("abc")).then(function (val) {
        assert.fail("This should not resolve!  It resolved with: " + val);
      }, function (err) {
        assert.equal(err, "Cannot convert 'abc' to a number!");
      });
    });
    it("rejects if the input promise rejects.", function () {
      return squarePromise(Promise.reject(9)).then(function (val) {
        assert.fail("This should not resolve!  It resolved with: " + val);
      }, function (err) {
        assert.equal(err, 9);
      });
    });
  });
  describe("#squarePromiseOrZero(promise) => Promise", function () {
    it("squares the resolution value of the promise", function () {
      return squarePromiseOrZero(Promise.resolve(5)).then(function (val) {
        assert.equal(val, 25);
      });
    });
    it("converts a numeric string to a number and squares it", function () {
      return squarePromiseOrZero(Promise.resolve("11")).then(function (val) {
        assert.equal(val, 121);
      });
    });
    it("resolves with 0 if the resolution value is not numeric", function () {
      return squarePromiseOrZero(Promise.resolve("abc")).then(function (val) {
        assert.equal(val, 0);
      });
    });
    it("rejects if the input promise rejects.", function () {
      return squarePromiseOrZero(Promise.reject(9)).then(function (val) {
        assert.equal(val, 0);
      });
    });
  });
  describe("#switcheroo(promise) => Promise", function () {
    it("rejects when the input promise resolves", function () {
      return switcheroo(Promise.resolve(3)).then(function (val) {
        assert.fail("This should not resolve!  It resolved with: " + val);
      }, function (err) {
        assert.equal(err, 3);
      });
    });
    it("resolves when the input promise rejects", function () {
      return switcheroo(Promise.reject(4)).then(function (val) {
        assert.equal(val, 4);
      });
    });
  });
});