"use strict";

/**
 *
 * EXERCISE 1
 *
 * @returns {Promise<3>}
 */
function makePromiseResolveWith3() {
  /* IMPLEMENT ME! */
  return Promise.resolve(3);
}
/**
 *
 * EXERCISE 2
 *
 * @returns {Promise<,"Boo!">}
 */


function makePromiseRejectWithBoo() {
  /* IMPLEMENT ME! */
  return Promise.reject("Boo!");
}
/**
 *
 * EXERCISE 3
 *
 * @param {boolean} itShouldResolve - Whether the promise should resolve or reject
 * @returns {Promise<undefined, undefined>}
 */


function makePromiseWithConstructor(itShouldResolve) {
  return new Promise(function (resolve, reject) {
    /* If itShouldResolve is true, call resolve */

    /* If itShouldResolve is false, call reject */
    if (itShouldResolve) {
      resolve(true);
    } else {
      reject(false);
    }
  });
}
/**
 *
 * EXERCISE 4
 *
 * @param {any} value
 * @param {number} delayInMs
 * @return {Promise<any>} - A promise that will resolve with the value after delayInMs milliseconds
 */


function makeDelayPromise(value, delayInMs) {
  /* Return a promise that resolves with the value after delayInMs */
  return new Promise(function (resolve) {
    return setTimeout(function () {
      return resolve(value);
    }, delayInMs);
  });
}

module.exports = {
  makePromiseResolveWith3: makePromiseResolveWith3,
  makePromiseRejectWithBoo: makePromiseRejectWithBoo,
  makePromiseWithConstructor: makePromiseWithConstructor,
  makeDelayPromise: makeDelayPromise
};