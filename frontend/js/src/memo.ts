const isSerialize = (value: any) => {
  if (
    value === null ||
    value === undefined ||
    typeof value === 'symbol' ||
    typeof value === 'function'
  )
    return false;
  return true;
};

const memorize = (fn: Function) => {
  const cache = new Map();

  return (...args: any[]) => {
    // Convert the arguments array to a string using JSON.stringify.
    // This ensures that the arguments are stored as a unique string key in the cache.
    // Without JSON.stringify, objects or arrays passed as arguments would be compared by reference,
    // meaning even identical objects/arrays with the same content would not match unless they share the same reference.
    const argument = JSON.stringify(args);

    if (cache.has(argument)) return cache.get(argument);
    const value = fn(...args);
    cache.set(argument, value);
    return value;
  };
};

// Test
import { expect } from 'chai';

describe('memorize function', () => {
  it('should return the correct result when called', () => {
    const add = (a: number, b: number) => a + b;
    const memorizedAdd = memorize(add);

    const result = memorizedAdd(1, 2);
    expect(result).to.equal(3);
  });

  it('should return the cached result for the same arguments', () => {
    let callCount = 0;
    const add = (a: number, b: number) => {
      callCount++;
      return a + b;
    };
    const memorizedAdd = memorize(add);

    // First call, calculates the result
    memorizedAdd(1, 2);
    expect(callCount).to.equal(1);

    // Second call with the same arguments, should return cached result
    memorizedAdd(1, 2);
    expect(callCount).to.equal(1); // call count shouldn't increase
  });

  it('should compute result for different arguments', () => {
    let callCount = 0;
    const add = (a: number, b: number) => {
      callCount++;
      return a + b;
    };
    const memorizedAdd = memorize(add);

    memorizedAdd(1, 2);
    memorizedAdd(2, 3);
    expect(callCount).to.equal(2); // It should have been called twice for different args
  });

  it('should handle functions with no arguments', () => {
    let callCount = 0;
    const getRandom = () => {
      callCount++;
      return Math.random();
    };
    const memorizedGetRandom = memorize(getRandom);

    const firstCall = memorizedGetRandom();
    const secondCall = memorizedGetRandom();
    expect(firstCall).to.equal(secondCall); // Results should be the same (cached)
    expect(callCount).to.equal(1); // The function should have been called only once
  });
});
