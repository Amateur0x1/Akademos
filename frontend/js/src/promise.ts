type Executor<T, E> = (
  resolve: (value: T) => void,
  reject: (reason: E) => void
) => void;

class Promise<T, E> {
  private state: 'pending' | 'fulfilled' | 'rejected' = 'pending';
  private value: T | null = null;
  private reason: E | null = null;

  private resolve(value: T) {
    this.state = 'fulfilled';
    this.value = value;
  }

  private reject(reason: E) {
    this.state = 'rejected';
    this.reason = reason;
  }

  constructor(exectutor: Executor<T, E>) {
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
    exectutor(this.resolve.bind(this), this.reject.bind(this));
  }

  then(value: T): Promise<T, E> {
    return new Promise((resolve, reject) => {
      if (this.state === 'fulfilled') {
        resolve(value);
      } else if (this.state === 'rejected') {
        reject(this.reason);
      }
    });
  }
}

// Test
import { expect } from 'chai';

describe('Custom Promise Test', () => {
  it('should resolve successfully', async () => {
    const myPromise = new Promise((resolve, reject) => {
      resolve('Promise resolved successfully!');
    });

    const result = await myPromise;
    expect(result).to.equal('Promise resolved successfully!');
  });

  it('should reject with an error', async () => {
    const myPromise = new Promise((resolve, reject) => {
      reject('Promise rejected!');
    });

    try {
      await myPromise;
    } catch (error) {
      expect(error).to.equal('Promise rejected!');
    }
  });
});
