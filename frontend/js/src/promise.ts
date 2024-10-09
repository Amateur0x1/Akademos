type Executor<T> = (
  resolve: (value: T) => void,
  reject: (reason: any) => void
) => void;

export class MyPromise<T> {
  private state: 'pending' | 'fulfilled' | 'rejected' = 'pending';
  private value: T | null = null;
  private reason: any = null;

  private onFulfilledCallbacks: Array<() => void> = [];
  private onRejectedCallbacks: Array<() => void> = [];

  constructor(executor: Executor<T>) {
    const resolve = (value: T) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.onFulfilledCallbacks.forEach((fn) => fn());
      }
    };

    const reject = (reason: any) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(
    onFulfilled?: (value: T) => void,
    onRejected?: (reason: any) => void
  ): void {
    if (this.state === 'fulfilled' && onFulfilled) {
      onFulfilled(this.value as T);
    }

    if (this.state === 'rejected' && onRejected) {
      onRejected(this.reason);
    }

    if (this.state === 'pending') {
      if (onFulfilled) {
        this.onFulfilledCallbacks.push(() => onFulfilled(this.value as T));
      }
      if (onRejected) {
        this.onRejectedCallbacks.push(() => onRejected(this.reason));
      }
    }
  }
}
