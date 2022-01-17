"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-env mocha */
var assert = require("assert");

var _require = require("./answers"),
    flatMapPromise = _require.flatMapPromise,
    chainTwoAsyncProcesses = _require.chainTwoAsyncProcesses,
    makeGetUserByIdWithOrganization = _require.makeGetUserByIdWithOrganization;

describe("Chaining Promises with .then(cb) and .catch(cb)", function () {
  describe("#flatMapPromise(promise, asyncTransformer) => Promise", function () {
    context("If the first promise resolves", function () {
      var firstPromise = Promise.resolve(3);
      it("resolves with the value of the second promise", function () {
        var resolveAndSquare = function resolveAndSquare(val) {
          return Promise.resolve(val * val);
        };

        return flatMapPromise(firstPromise, resolveAndSquare).then(function (val) {
          assert.equal(val, 9);
        });
      });
      it("rejects with the error of the second promise", function () {
        var freakOut = function freakOut(val) {
          return Promise.reject("Boo! ".concat(val));
        };

        return flatMapPromise(firstPromise, freakOut).then(function (val) {
          assert.fail("This should not have resolved!  It resolved with ".concat(val));
        }, function (err) {
          assert.equal(err, "Boo! 3");
        });
      });
    });
    context("If the first promise rejects", function () {
      it("rejects with the error of the first promise", function () {
        return flatMapPromise(Promise.reject("Boo!"), function (val) {
          return Promise.reject(val);
        }).then(function (val) {
          assert.fail("This should not have resolved!  It resolved with ".concat(val));
        }, function (err) {
          assert.equal(err, "Boo!");
        });
      });
    });
  });
  describe("#chainTwoAsyncProcesses(firstPromise, slowAsyncProcess)", function () {
    it("runs a slow process on the result of the numberPromise", function () {
      var time = new Date();
      var numberPromise = Promise.resolve(31);

      function slowSquarer(num) {
        return new Promise(function (resolve) {
          setTimeout(function () {
            resolve(num * num);
          }, 1000);
        });
      }

      return chainTwoAsyncProcesses(numberPromise, slowSquarer).then(function (val) {
        assert.equal(val, 961);
        var timeElapsed = new Date() - time;
        assert(timeElapsed >= 975, "Process too quick.  Are you sure that you chained the two processes?");
        assert(timeElapsed <= 1025, "Process too slow.");
      });
    });
  });
  describe("#makeGetUserByIdWithOrganization(getUserById, getOrganizationById) => (id) => Promise", function () {
    var users = {
      u001: {
        id: "u001",
        name: "Jeff",
        email: "jeff@jeff.jeff",
        organizationId: "o001"
      },
      u002: {
        id: "u002",
        name: "Joan",
        email: "joan@joan.joan",
        organizationId: "o002"
      }
    };
    var organizations = {
      o001: {
        id: "o001",
        name: "Operations"
      },
      o002: {
        id: "o002",
        name: "Marketing"
      }
    };

    function getUserById(id) {
      return new Promise(function (resolve) {
        setTimeout(function () {
          resolve(users[id]);
        }, 500);
      });
    }

    function getOrganizationById(id) {
      return new Promise(function (resolve) {
        setTimeout(function () {
          resolve(organizations[id]);
        }, 500);
      });
    }

    var getUserByIdWithOrganization = makeGetUserByIdWithOrganization(getUserById, getOrganizationById);
    it("gets a user and their organization if the user and organization exist", function () {
      var start = new Date();
      return getUserByIdWithOrganization("u001").then(function (userWithOrganization) {
        var correctUser = users["u001"];
        var correctOrganization = organizations[correctUser.organizationId];
        assert.deepEqual(userWithOrganization, _objectSpread({}, correctUser, {
          organization: correctOrganization
        }));
        var elapsed = new Date() - start;
        assert(elapsed >= 1000 && elapsed < 1030, "Elapsed time wrong ".concat(elapsed));
      });
    });
    it("resolves with undefined if the user is not found", function () {
      var start = new Date();
      return getUserByIdWithOrganization("u003").then(function (userWithOrganization) {
        assert.equal(userWithOrganization, undefined);
        var elapsed = new Date() - start;
        assert(elapsed >= 500 && elapsed < 530, "Elapsed time wrong ".concat(elapsed));
      });
    });
  });
});