/* eslint-env jest */

const Promise = require('./CustomPromise');

describe('Promise - resolving and rejecting', () => {
  it('promises can be chained', (done) => {
    function work1() {
      return new Promise((resolve) => {
        setTimeout(() => resolve(), 10);
      });
    }

    function work2() {
      return new Promise((resolve) => {
        setTimeout(() => resolve(), 10);
      });
    }

    work1().then(work2).then(() => done());
  });

  it('chained promises can use the resolved value of the previous promise', (done) => {
    function work1() {
      return new Promise((resolve) => {
        setTimeout(() => resolve('result1'), 10);
      });
    }

    function work2(value) {
      return new Promise((resolve) => {
        setTimeout(() => resolve(`${value} result2`), 10);
      });
    }

    work1().then(work2).then((result) => {
      expect(result).toBe('result1 result2');
      done();
    });
  });

  it('you can also chain quick operations that don\'t return promises', (done) => {
    function work1() {
      return new Promise((resolve) => {
        setTimeout(() => resolve('result1'), 10);
      });
    }

    function work2(value) {
      return new Promise((resolve) => {
        setTimeout(() => resolve(`${value} result2`), 10);
      });
    }

    work1()
      .then(work2)
      .then(value => `${value} result3`)
      .then((result) => {
        expect(result).toBe('result1 result2 result3');
        done();
      });
  });

  it('chaining also works with promises that are already resolved', (done) => {
    const promise = Promise.resolve('result1');

    promise
      .then(value => `${value} result2`)
      .then((result) => {
        expect(result).toBe('result1 result2');
        done();
      });
  });
});
