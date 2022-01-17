"use strict";

/**
 *
 * EXERCISE 1
 *
 * @param {Promise} promise
 * @param {thunk} action
 *
 */
function waitForPromise(promise, action) {
  /* IMPLEMENT ME */
  return setTimeout(function () {
    return promise.then(action)["catch"]();
  }, 1002);
}
/**
 *
 * EXERCISE 2
 *
 * @param {Promise} promise
 * @param {consumer} consumer
 * @param {handler} handler
 */


function consumePromise(promise, consumer, handler) {
  /* IMPLEMENT ME! */
  promise.then(consumer)["catch"](handler);
}
/**
 * @callback thunk
 * @returns {void}
 */


module.exports = {
  waitForPromise: waitForPromise,
  consumePromise: consumePromise
};