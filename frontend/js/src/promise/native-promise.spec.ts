import util from 'util';
import { expect } from 'chai';

describe('NativePromise', () => {
  it('should resolve the Promise and verify its status at each stage', async () => {
    let resolvePromise: ((value: any) => void) | undefined;
    let rejectPromise: ((reason: any) => void) | undefined;

    const promise = new Promise((resolve, reject) => {
      resolvePromise = resolve;
      rejectPromise = reject;
    });

    expect(util.inspect(promise)).to.equal('Promise { <pending> }');

    resolvePromise?.('Success');
    await promise;
    expect(util.inspect(promise)).to.equal("Promise { 'Success' }");

    const rejectedPromise = new Promise((_, reject) => reject('Error'));

    try {
      await rejectedPromise;
    } catch (e) {}

    expect(util.inspect(rejectedPromise)).to.equal(
      "Promise { <rejected> 'Error' }"
    );
  });
});
