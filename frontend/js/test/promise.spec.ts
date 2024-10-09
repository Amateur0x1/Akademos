import { assert } from 'chai';
import { MyPromise } from '../src/promise';

describe('Promise Implementation', function () {
  it('should test MyPromise and native Promise behaviors', function () {
    const promise2 = new MyPromise<number>((resolve, reject) => {
      console.log(1111);
      resolve(1);
      reject(2);
    });

    const promise1 = new Promise((resolve, reject) => {
      console.log(11);
      reject(1);
    });

    promise2.then((value) => {
      console.log(value);
      assert.equal(value, 1, 'MyPromise resolves to 1');
    });

    promise1
      .then(() => {
        console.log(22);
      })
      .catch(() => {
        console.log(2222);
        assert.isTrue(true, 'Promise1 rejected as expected');
      });
  });
});
