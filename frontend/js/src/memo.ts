const isSerialize = (value: any) => {
  if (
    typeof value === 'undefined' ||
    value === null ||
    typeof value === 'symbol' ||
    typeof value === 'function' ||
    typeof value === 'bigint'
  )
    return false;
  return true;
};

const checkSerialize = (value: any) => {
  if (!isSerialize(value)) {
    throw new Error(
      'Value cannot be serialize: function symbol undefined null bigint'
    );
  }

  if (typeof value === 'object') {
    if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        checkSerialize(value[i]);
      }
    } else {
      for (let key in value) {
        checkSerialize(value[key]);
      }
    }
  }
  return;
};

const memorize = (fn: Function) => {
  const cache = new Map();

  return (...args: any[]) => {
    args.forEach((value) => checkSerialize(value));
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

describe('memorize function serialization', () => {
  it('should throw an error for non-serializable values like undefined', () => {
    const add = (a: number, b: number) => a + b;
    const memorizedAdd = memorize(add);

    expect(() => memorizedAdd(undefined, 2)).to.throw(
      'Value cannot be serialize: function symbol undefined null bigint'
    );
  });

  it('should throw an error for non-serializable values like null', () => {
    const add = (a: number, b: number) => a + b;
    const memorizedAdd = memorize(add);

    expect(() => memorizedAdd(null, 2)).to.throw(
      'Value cannot be serialize: function symbol undefined null bigint'
    );
  });

  it('should throw an error for non-serializable values like function', () => {
    const add = (a: number, b: number) => a + b;
    const memorizedAdd = memorize(add);

    const func = () => {};
    expect(() => memorizedAdd(func, 2)).to.throw(
      'Value cannot be serialize: function symbol undefined null bigint'
    );
  });

  it('should throw an error for non-serializable values like BigInt', () => {
    const add = (a: number, b: number) => a + b;
    const memorizedAdd = memorize(add);

    expect(() => memorizedAdd(BigInt(12345), 2)).to.throw(
      'Value cannot be serialize: function symbol undefined null bigint'
    );
  });

  it('should not throw an error for serializable values like number, string, boolean', () => {
    const add = (a: number, b: number) => a + b;
    const memorizedAdd = memorize(add);

    expect(() => memorizedAdd(1, 2)).to.not.throw();
    expect(memorizedAdd(1, 2)).to.equal(3);
  });

  it('should cache the result for serializable values', () => {
    let callCount = 0;
    const add = (a: number, b: number) => {
      callCount++;
      return a + b;
    };
    const memorizedAdd = memorize(add);

    expect(memorizedAdd(1, 2)).to.equal(3);
    expect(callCount).to.equal(1);

    expect(memorizedAdd(1, 2)).to.equal(3);
    expect(callCount).to.equal(1);
  });

  it('should compute and cache results for different arguments', () => {
    let callCount = 0;
    const add = (a: number, b: number) => {
      callCount++;
      return a + b;
    };
    const memorizedAdd = memorize(add);

    expect(memorizedAdd(1, 2)).to.equal(3);
    expect(memorizedAdd(2, 3)).to.equal(5);
    expect(callCount).to.equal(2);
  });
});

describe('memorize function with nested data', () => {
  it('should cache and handle nested arrays', () => {
    let callCount = 0;
    const sumNestedArray = (arr: any[]) => {
      callCount++;
      return arr.flat(Infinity).reduce((acc, val) => acc + val, 0);
    };
    const memorizedSumNestedArray = memorize(sumNestedArray);

    const nestedArray = [1, [2, 3], 4];

    expect(memorizedSumNestedArray(nestedArray)).to.equal(10);
    expect(callCount).to.equal(1);

    expect(memorizedSumNestedArray(nestedArray)).to.equal(10);
    expect(callCount).to.equal(1);
  });

  it('should cache and handle nested objects', () => {
    let callCount = 0;
    const calculateObjectSum = (obj: { [key: symbol]: number | object }) => {
      callCount++;
      const sumValues = (o: { [key: symbol]: number | object }): number =>
        Object.values(o).reduce((acc: number, val: unknown) => {
          if (typeof val === 'object') {
            return acc + sumValues(val as { [key: symbol]: number | object });
          } else {
            return acc + (val as number);
          }
        }, 0);

      return sumValues(obj);
    };
    const memorizedCalculateObjectSum = memorize(calculateObjectSum);

    const nestedObject = { a: 1, b: { c: 2, d: 3 }, e: 4 };

    expect(memorizedCalculateObjectSum(nestedObject)).to.equal(10);
    expect(callCount).to.equal(1);

    expect(memorizedCalculateObjectSum(nestedObject)).to.equal(10);
    expect(callCount).to.equal(1);
  });

  it('should throw an error for non-serializable nested data (e.g., functions inside objects)', () => {
    const add = (a: number, b: number) => a + b;
    const memorizedAdd = memorize(add);

    const nestedObjectWithFunction = { a: 1, b: { c: 2, d: () => {} } };

    expect(() => memorizedAdd(nestedObjectWithFunction)).to.throw(
      'Value cannot be serialize: function symbol undefined null bigint'
    );
  });

  it('should throw an error for non-serializable nested data (e.g., BigInt inside arrays)', () => {
    const multiply = (a: number, b: number) => a * b;
    const memorizedMultiply = memorize(multiply);

    const nestedArrayWithBigInt = [1, [2, BigInt(3)], 4];

    expect(() => memorizedMultiply(nestedArrayWithBigInt)).to.throw(
      'Value cannot be serialize: function symbol undefined null bigint'
    );
  });
});
