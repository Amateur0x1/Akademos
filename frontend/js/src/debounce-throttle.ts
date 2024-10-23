const debounce = (func: Function, delay: number) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const throttle = (func: Function, interval: number) => {
  let isThrottling = true;
  return (...args: any[]) => {
    if (isThrottling) {
      func(...args);
      isThrottling = false;
      setTimeout(() => {
        isThrottling = true;
      }, interval);
    }
  };
};

// Test

import { expect } from 'chai';
describe('Debounce and Throttle Functions', function () {
  it('should debounce the function and only call it once after the delay', function (done) {
    let counter = 0;
    const func = () => counter++;
    const debouncedFunc = debounce(func, 100);

    debouncedFunc();
    debouncedFunc();
    debouncedFunc();
    setTimeout(() => {
      expect(counter).to.equal(1);
      done();
    }, 150);
  });

  it('should throttle the function and limit calls to once per interval', function (done) {
    let counter = 0;
    const func = () => counter++;
    const throttledFunc = throttle(func, 100);

    throttledFunc();
    throttledFunc();
    throttledFunc();

    expect(counter).to.equal(1);

    setTimeout(() => {
      throttledFunc();
      expect(counter).to.equal(2);
      done();
    }, 150);
  });
});
