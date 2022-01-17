"use strict";

/* eslint-env mocha */
var assert = require("assert");

var _require = require("./answers"),
    makePromiseResolveWith3 = _require.makePromiseResolveWith3,
    makePromiseRejectWithBoo = _require.makePromiseRejectWithBoo,
    makePromiseWithConstructor = _require.makePromiseWithConstructor,
    makeDelayPromise = _require.makeDelayPromise;

describe("Promise.resolve: (val:T) => Promise<T>", function () {
  describe("#makePromiseResolveWith3:() => Promise<number>", function () {
    it("creates a resolving promise", function () {
      return makePromiseResolveWith3().then(function (val) {
        assert.equal(val, 3);
      });
    });
  });
});
describe("Promise.reject: (err:T) => Promise<,T>", function () {
  describe("#makePromiseRejectWithBoo:() => Promise<,string>", function () {
    it("creates a rejecting promise", function () {
      return makePromiseRejectWithBoo().then(function () {
        assert.fail("This promise should have rejected, not resolved");
      }, function (err) {
        assert.equal(err, "Boo!");
      });
    });
  });
});
describe('Promise constructor "new Promise((resolve, reject) => void) => Promise', function () {
  describe("#makePromiseWithConstructor: (boolean) => Promise<undefined,undefined>", function () {
    it("creates a promise that will resolve", function () {
      return makePromiseWithConstructor(true);
    });
    it("creates a promise that will reject", function () {
      return makePromiseWithConstructor(false).then(function () {
        assert.fail("This should have failed.");
      }, function () {});
    });
  });
  describe("#makeDelayPromise: (A, number) => Promise<A>", function () {
    it("returns a promise that resolves with the value", function () {
      var start = new Date();
      return makeDelayPromise("Hello", 0).then(function (val) {
        assert.equal(val, "Hello");
        assert(new Date() - start < 50, "Took too long");
      });
    });
    it("returns a promise that resolves after a delay", function () {
      var start = new Date();
      return makeDelayPromise("World", 1000).then(function (val) {
        assert.equal(val, "World");
        var diff = new Date() - start;
        assert(diff >= 1000, "Happened too early");
        assert(diff < 1050, "Took too long");
      });
    });
  });
});