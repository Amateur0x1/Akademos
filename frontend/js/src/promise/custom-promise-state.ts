type Executor<T> = (
  resolve: (value: T) => void,
  reject: (reason: any) => void
) => void;

type PromiseState = 'pending' | 'fulfilled' | 'rejected';

class CustomPromise<T> {
  private state: PromiseState = 'pending';

  constructor(executor: Executor<T>) {
    const resolve = (value: T) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
      }
    };

    const reject = (reason: any) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
      }
    };

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  testState(): { state: PromiseState } {
    return {
      state: this.state,
    };
  }
}

// Test
import { expect } from 'chai';

describe('CustomPromise', () => {
  it('should start with a pending state', () => {
    const promise = new CustomPromise(() => {});
    const state = promise.testState().state;
    expect(state).to.equal('pending');
  });

  it('should transition to fulfilled state when resolved', (done) => {
    const promise = new CustomPromise((resolve, reject) => {
      resolve('success');
    });

    setTimeout(() => {
      const state = promise.testState().state;
      expect(state).to.equal('fulfilled');
      done();
    }, 0);
  });

  it('should transition to rejected state when rejected', (done) => {
    const promise = new CustomPromise((resolve, reject) => {
      reject('error');
    });

    setTimeout(() => {
      const state = promise.testState().state;
      expect(state).to.equal('rejected');
      done();
    }, 0);
  });

  it('should handle exceptions thrown in the executor', (done) => {
    const promise = new CustomPromise(() => {
      throw new Error('Something went wrong');
    });

    setTimeout(() => {
      const state = promise.testState().state;
      expect(state).to.equal('rejected');
      done();
    }, 0);
  });
});
