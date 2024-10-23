type Executor<T, E> = (
  resolve: (value: T) => void,
  reject: (reason: E) => void
) => void;

class Promise<T, E extends any> {
  private state: 'pending' | 'fulfilled' | 'rejected' = 'pending';
  private value: T | null = null;
  private reason: E | null = null;
  private onFulfilledCallbacks: ((value: T) => void)[] = [];
  private onRejectedCallbacks: ((reason: E) => void)[] = [];

  private resolve(value: T) {
    if (this.state === 'pending') {
      this.state = 'fulfilled';
      this.value = value;
      this.onFulfilledCallbacks.forEach((callback) => callback(value));
    }
  }

  private reject(reason: E) {
    if (this.state === 'pending') {
      this.state = 'rejected';
      this.reason = reason;
      this.onRejectedCallbacks.forEach((callback) => callback(reason));
    }
  }

  constructor(executor: Executor<T, E>) {
    executor(this.resolve.bind(this), this.reject.bind(this));
  }

  then<U>(
    onFulfilled?: (value: T) => U | Promise<U, E>,
    onRejected?: (reason: E) => U | Promise<U, E>
  ): Promise<U, E> {
    return new Promise<U, E>((resolve, reject) => {
      const handleFulfilled = () => {
        try {
          const result = onFulfilled?.(this.value as T);
          if (result instanceof Promise) {
            result.then(resolve, reject);
          } else {
            resolve(result as U);
          }
        } catch (error) {
          reject(error as E);
        }
      };

      const handleRejected = () => {
        try {
          const result = onRejected?.(this.reason as E);
          if (result instanceof Promise) {
            result.then(resolve, reject);
          } else {
            resolve(result as U);
          }
        } catch (error) {
          reject(error as E);
        }
      };

      if (this.state === 'fulfilled') {
        handleFulfilled();
      }

      if (this.state === 'rejected') {
        handleRejected();
      }

      if (this.state === 'pending') {
        this.onFulfilledCallbacks.push(handleFulfilled);
        this.onRejectedCallbacks.push(handleRejected);
      }
    });
  }

  catch<U>(onRejected?: (reason: E) => U | Promise<U, E>): Promise<U, E> {
    return new Promise((resolve, reject) => {
      const handleRejected = () => {
        try {
          const result = onRejected?.(this.reason as E);
          if (result instanceof Promise) {
            result.then(resolve, reject);
          } else {
            resolve(result as U);
          }
        } catch (error) {
          reject(error as E);
        }
      };
      if (this.state === 'rejected') {
        handleRejected();
      } else if (this.state === 'pending') {
        this.onRejectedCallbacks.push(handleRejected);
      }
    });
  }
}

// Test
import { expect } from 'chai';

describe('Custom Promise Tests', () => {
  it('should resolve successfully', async () => {
    const myPromise = new Promise<string, string>((resolve, reject) => {
      resolve('Promise resolved successfully!');
    });

    const result = await myPromise;
    expect(result).to.equal('Promise resolved successfully!');
  });

  it('should reject with an error', async () => {
    const myPromise = new Promise<string, string>((resolve, reject) => {
      reject('Promise rejected!');
    });

    try {
      await myPromise;
    } catch (error) {
      expect(error).to.equal('Promise rejected!');
    }
  });

  it('should chain promises with resolved values', async () => {
    const myPromise = new Promise<number, string>((resolve, reject) => {
      resolve(1);
    });

    const result = await myPromise
      .then((value) => value + 1)
      .then((value) => value * 2);

    expect(result).to.equal(4);
  });

  it('should handle promise rejection in a chain', async () => {
    const myPromise = new Promise<number, string>((resolve, reject) => {
      resolve(1);
    });

    try {
      await myPromise
        .then((value) => {
          throw 'Something went wrong!';
        })
        .then((value) => value + 1);
    } catch (error) {
      expect(error).to.equal('Something went wrong!');
    }
  });

  it('should catch rejection in a chain and continue', async () => {
    const myPromise = new Promise<number, string>((resolve, reject) => {
      resolve(1);
    });

    const result = await myPromise
      .then((value) => {
        throw 'Something went wrong!';
      })
      .catch((error) => {
        expect(error).to.equal('Something went wrong!');
        return 10;
      })
      .then((value) => value + 1);

    expect(result).to.equal(11);
  });

  it('should handle returning a new promise from then', async () => {
    const myPromise = new Promise<number, string>((resolve, reject) => {
      resolve(5);
    });

    const result = await myPromise.then((value) => {
      return new Promise<number, string>((resolve, reject) => {
        setTimeout(() => resolve(value * 2), 100);
      });
    });

    expect(result).to.equal(10);
  });

  it('should chain promises and handle asynchronous resolve', async () => {
    const myPromise = new Promise<number, string>((resolve, reject) => {
      setTimeout(() => resolve(3), 100);
    });

    const result = await myPromise
      .then((value) => value * 2)
      .then((value) => value + 1);

    expect(result).to.equal(7);
  });

  it('should catch errors and allow promise to continue', async () => {
    const myPromise = new Promise<number, string>((resolve, reject) => {
      resolve(1);
    });

    const result = await myPromise
      .then((value) => {
        throw new Error('Error occurred!');
      })
      .catch((error) => {
        expect((error as unknown as Error).message).to.equal('Error occurred!');
        return 100;
      })
      .then((value) => value + 50);

    expect(result).to.equal(150);
  });

  it('should handle a rejected promise and chain after catch', async () => {
    const myPromise = new Promise<number, string>((resolve, reject) => {
      reject('Initial rejection');
    });

    const result = await myPromise
      .catch((error) => {
        expect(error).to.equal('Initial rejection');
        return 200; // Recover from rejection
      })
      .then((value) => value + 100);

    expect(result).to.equal(300);
  });
});
