"use strict";

/**
 *
 * EXERCISE 1
 *
 * @param {*} promise
 * @param {*} transformer
 * @returns {Promise}
 */
function mapPromise(promise, transformer) {
  return new Promise(function (resolve, reject) {
    /* IMPLEMENT ME!! */
  });
}
/**
 *
 * EXERCISE 2
 *
 * @param {Promise<number | string>} numberPromise
 * @returns {Promise<number>}
 */


function squarePromise(numberPromise) {
  return numberPromise.then();
}
/**
 * EXERCISE 3
 *
 * @param {Promise<number | string>} numberPromise
 * @returns {Promise<number>}
 */


function squarePromiseOrZero(promise) {
  return squarePromise(promise)["catch"]();
}
/**
 * EXERCISE 4
 *
 * @param {Promise} promise
 * @returns {Promise}
 */


function switcheroo(promise) {
  return promise.then();
}
/**
 * @callback consumer
 * @param {*} value
 */

/**
 * @callback handler
 * @param {*} error
 */


module.exports = {
  mapPromise: mapPromise,
  squarePromise: squarePromise,
  squarePromiseOrZero: squarePromiseOrZero,
  switcheroo: switcheroo
};