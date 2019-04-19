/* eslint-env jest */

const Promise = require('./CustomPromise');

describe('Promise - resolving and rejecting', () => {
  it('runs fulfillment handler when resolved', (done) => {
    // You will often use promises in this way. The work function represents
    // any async work like doing an HTTP request.
    function work() {
      return new Promise((resolve) => {
        setTimeout(() => resolve(), 100);
      });
    }

    work().then(() => done());

    // But this is ofcourse the same as:
    /*
    const promise = new Promise((resolve) => {
      setTimeout(() => resolve(), 100);
    });

    promise.then(done);
    */
  });

  it('passes resolved value to fulfillment handler', (done) => {
    function work() {
      return new Promise((resolve) => {
        setTimeout(() => resolve('test'), 100);
      });
    }

    work().then((passedValue) => {
      expect(passedValue).toBe('test');
      done();
    });
  });

  it('there can be multiple fulfillment handlers', () => {
    expect.assertions(3);

    const promise = new Promise((resolve) => {
      setTimeout(() => resolve('test'), 100);
    });

    promise.then(value => expect(value).toBe('test'));
    promise.then(value => expect(value).toBe('test'));
    promise.then(value => expect(value).toBe('test'));

    // Return promise so Jest knows how long to wait
    return promise;
  });

  it('runs new fulfillment handler immediately if promise is already resolved', (done) => {
    const promise = Promise.resolve();
    promise.then(() => done());
  });

  it('runs rejection handlers when rejected', (done) => {
    function work() {
      return new Promise((resolve, reject) => {
        setTimeout(() => reject(), 100);
      });
    }

    work().catch(() => done());
  });

  it('passes rejected value to rejection handler', (done) => {
    function work() {
      return new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error('test error')), 100);
      });
    }

    work().catch((error) => {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('test error');
      done();
    });
  });

  it('there can be multiple rejection handlers', (done) => {
    expect.assertions(6);

    const promise = new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error('test error')), 100);
    });

    promise.catch((error) => {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('test error');
    });

    promise.catch((error) => {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('test error');
    });

    promise.catch((error) => {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('test error');
    });

    setTimeout(done, 200);
  });

  it('runs new rejection handler immediately if promise is already rejected', (done) => {
    const promise = Promise.reject(new Error('test error'));
    promise.catch(() => done());
  });
});
