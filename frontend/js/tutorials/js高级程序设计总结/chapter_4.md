# 第四章 变量、作用域与内存

## 4.1 原始值与引用值
原始值：Undefined Null Boolean Number String Symbol

引用值：多个值构成的对象

### 4.1.1 动态属性
引用值可以随时添加、修改与删除属性

原始值则不能有属性，尽管给原始值添加属性不会报错
```js
let name = 'a';
name.age = 24;
console.log(name.age); // undefined
```

### 4.1.2 复制值
变量复制时，原始值会被复制到新变量的位置；引用值的复制仅仅是指针的复制。
```js
function setName(obj) {
    obj.name = "Nicholas";
    obj = new Object();
    obj.name = "Greg";
}

let person = new Object();
setName(person);
console.log(person.name) // "Nicholas"
```
person 作为一个对象传值时，是将自身的指针传入了 setName 的函数中，由变量 obj 获取了这个指针，但是随后 obj 被赋值为一个新的指针，因此最后打印的是 Nicholas。为了更好理解，我将这段代码的运行逻辑摊平变为这样。
```js

let person = new Object();
let obj = person
obj.name = "Nicholas";
obj = new Object()
obj.name = "Greg"
console.log(obj) // "Greg"
console.log(person) // "Nicholas"
```
不过需要注意的是，由于垃圾回收机制的存在，在function 中声明的 name = "Greg" 的对象被销毁了。

## 4.2 执行上下文与作用域
全局上下文：本质上就是 global 对象。所有通过 var 定义的全局变量与函数都会变成 window 的属性。但在局部上下文的时候就不会了。此外，未经 let var const 定义的全局变量与函数也会变成 window 的属性。

作用域链：

活动对象：

### 4.2.1 作用于链增强

作用域增强：某些语句会导致在作用域链临时添加一个上下文，这个上下文在代码执行后会被删除。
    - try/catch 中的 catch：catch 会创建一个新的变量对象来包含要抛出的错误对象的声明。
    - with 语句：with 语句会向作用域前端添加指定的对象。
### 4.2.2 变量声明

块级作用域声明({} 就是块)：这是 ES6 中出现的新概念，let const 声明的作用域范围都是块级作用域声明。

块级作用域声明会影响垃圾回收与上下文变量对象的标识符查找。


## 4.3 垃圾回收
下面介绍垃圾回收几种策略。
### 4.3.1 标记清理
当变量进入上下文时，会加上一个上下文的标记。当变量离开上下文时，则会有一个离开上下文的标记。

策略：垃圾回收运行的时候，标记内存中存储的所有变量，然后，它会将所有上下文中的变量以及所有被上下文中的变量引用的变量的标记去掉，剩下的被标记对象就是待删除对象了，随后垃圾回收程序做一次内存清理，销毁带标记的所有值并回收内存。

### 4.3.2 引用计数
对每个值都记录引用的次数。

问题：循环引用。

### 4.3.3 性能

### 4.3.4 内存管理
解引用：将变量声明为 null，会自动将超出作用域的变量解引用。

1. const 和 let 提升性能
2. 隐藏类和删除操作：需要注意一下
3. 内存泄漏：意外的全局声明；定时器的回调闭包引用了外部变量；内部闭包的引用变量会一直存在，需要注意。
4. 静态分配与对象池：
```js
function addVector(a,b) {
    let resultant = new Vector()
    resultant.x = a.x + b.x;
    resultant.y = a.y + b.y
    return resultant
}
```
这段代码中的对象经过的返回的创建，并在脱离作用域后被销毁，因此垃圾回收机制会以比较激进的方法来应对这段函数。因此为了避免这一点，反复创建新对象是不被推荐的。
```js
function addVector(a,b,resultant) }
    resultant.x = a.x + b.x;
    resultant.y = a.y + b.y;
    return resultant
}
```
这样就可以避免 resultant 对象的销毁，减少垃圾回收机制的使用。而这个 resultant 需要用对象池的方式来管理，来满足多个对象的需求。对象池比较好的一种使用方法是用数组，但是需要注意数组长度的动态扩展会影响垃圾回收，因为每一次扩展都会导致一个新的数组对象的创建与旧对象的垃圾回收。









































