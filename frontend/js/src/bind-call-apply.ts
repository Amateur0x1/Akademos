declare global {
  interface Function {
    myCall<T, U>(
      this: (this: T, ...args: U[]) => any,
      thisArg: T,
      ...args: U[]
    ): any;
    myApply<T, U>(
      this: (this: T, ...args: U[]) => any,
      thisArg: T,
      args?: U[]
    ): any;
    myBind<T, U>(
      this: (this: T, ...args: U[]) => any,
      thisArg: T,
      ...args: U[]
    ): (...newArgs: U[]) => any;
  }
}

Function.prototype.myCall = function <T>(thisArg: T, ...args: any[]) {
  
  thisArg = (thisArg ?? globalThis) as T;
  const fnSymbol = Symbol(); 
  (thisArg as any)[fnSymbol] = this;

  
  const result = (thisArg as any)[fnSymbol](...args);

  
  delete (thisArg as any)[fnSymbol];
  return result;
};

Function.prototype.myApply = function <T>(thisArg: T, args: any[] = []) {
  thisArg = (thisArg ?? globalThis) as T;
  const fnSymbol = Symbol();
  (thisArg as any)[fnSymbol] = this;

  const result = (thisArg as any)[fnSymbol](...args);
  delete (thisArg as any)[fnSymbol];
  return result;
};

Function.prototype.myBind = function (thisArg: any, ...args: any[]) {
  const self = this; 
  return function (...newArgs: any[]) {
    return self.myCall(thisArg, ...args, ...newArgs); 
  };
};

// Test
import { expect } from 'chai';

describe('Custom call, apply, and bind', function () {
  let obj: { value: number; getValue: () => number };

  beforeEach(function () {
    obj = {
      value: 42,
      getValue: function () {
        return this.value;
      },
    };
  });

  it('should call the function with myCall', function () {
    function add(this: { value: number }, a: number, b: number): number {
      return this.value + a + b;
    }

    const result = add.myCall(obj, 1, 2);
    expect(result).to.equal(45); 
  });

  it('should apply the function with myApply', function () {
    function add(this: { value: number }, a: number, b: number): number {
      return this.value + a + b;
    }

    const result = add.myApply(obj, [1, 2]);
    expect(result).to.equal(45); 
  });

  it('should bind the function with myBind', function () {
    function add(this: { value: number }, a: number, b: number): number {
      return this.value + a + b;
    }

    const boundAdd = add.myBind(obj, 1);
    const result = boundAdd(1);

    expect(result).to.equal(45); 
  });

  it('should bind and maintain the correct context with myBind', function () {
    const getValue = obj.getValue.myBind(obj);
    expect(getValue()).to.equal(42);
  });
});
