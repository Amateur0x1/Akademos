## 测试驱动开发(TDD)
要理解如何编写 Promise，最有效的方式之一就是先编写针对它的测试。

编写测试可以帮助我们明确要测试什么，这并不是一个简单的任务，因为这实际上表明你已经对 Promise 的行为和功能有了一定的理解。通常，知道如何测试某个功能，意味着你已经知道该功能是如何实现的了。

### 如何测试 Promise 的三种状态与状态状态转移

#### 测试原生 Promise
Promise 是一种状态机，它有三种状态：
- pending：Promise 尚未完成，也未被拒绝，仍在等待结果。
- fulfilled (resolved)：Promise 成功执行，返回了结果。
- rejected：Promise 执行失败，返回了错误信息。

当 Promise 实例化时，它的初始状态是 pending。调用 resolve 方法成功后，状态会转为 fulfilled，而调用 reject 方法或者失败，状态则会变为 rejected。

由于 Promise 的状态是私有的，外部无法直接访问或打印状态。因此，一种测试 Promise 状态变化的方式是通过继承 Promise 并在子类上添加额外的实例方法或属性，用来追踪状态变化。

但可惜的是，Promise 的生命周期和行为由 JavaScript 引擎特别处理，它不仅仅是一个普通的类对象。Promise 的内部状态和执行机制是封装的，这与普通的类不同。这是 Js 异步可扩展性不足的一种表现，其他语言比如 Java、Python 就没有这种情况，尽管 Js 语言有其特殊的应用场景。

另外一种监测方法是借用 node.js 中的 util.inspect 方法来监测状态的变化。测试如下。

```js
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
```

#### 手写 Promise State 并测试
既然已经知道了原理，我们就可以着手写自己的 Promise 与对应的测试了。
将 Promise 中内置一个私有方法，用于测试需求，我们加入一个 testState 方法方便外部测试即可。
```ts
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
```


### 如何实现 Promise 的 then 与 catch 方法


### 如何实现 then 与 catch 的链式调用