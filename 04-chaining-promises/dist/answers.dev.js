"use strict";

/**
 *
 * EXERCISE 1
 *
 * @param {Promise} promise
 * @param {function} asyncTransformer
 */
function flatMapPromise(promise, asyncTransformer) {
  return new Promise(function (resolve, reject) {
    promise.then();
  });
}
/**
 *
 * EXERCISE 2
 *
 * @param {Promise} firstPromise
 * @param {function} slowAsyncProcess
 */


function chainTwoAsyncProcesses(firstPromise, slowAsyncProcess) {
  return firstPromise.then();
}
/**
 *
 * EXERCISE 3
 *
 * @param {function} getUserById
 * @param {function} getOrganizationById
 */


function makeGetUserByIdWithOrganization(getUserById, getOrganizationById) {
  return function getUserByIdWithOrganization(userId) {
    /* IMPLEMENT ME! */
  };
}

module.exports = {
  flatMapPromise: flatMapPromise,
  chainTwoAsyncProcesses: chainTwoAsyncProcesses,
  makeGetUserByIdWithOrganization: makeGetUserByIdWithOrganization
};