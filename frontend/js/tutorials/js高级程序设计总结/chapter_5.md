# 基本引用类型
## Date

## RegExp


## 原始值包装类型

尽管 string/number/boolean 并不是对象，但是为了给他们提供一系列的操作方法，便有了原始值包装类型，也就是 String/Number/Boolean

需要注意的是，原始值包装类型的生命周期与其他对象不同，仅仅是在访问属性、方法时创建，然后立刻被销毁
```js
const run = () => {
    let name = 'Alice'
    console.log(name.length)
    console.log(name.toUpperCase())
}
run()
```
对于普通对象来说，这里应该只有一个 name 对象，有 length 属性和 toUpperCase 方法，并在退出作用域后被销毁。但实际上这里面创建并销毁了两个 String 对象，并在对象属性或方法的访问或执行时创建，在访问结束或者执行后销毁。

Consider the following code, which may behave unexpectedly:
```js
const run = () => {
    let name = 'Alice'
    name.age = 18
    console.log(name.age) //Expected: 18 Actual: undefined
}

run()

```
In this code, name is string primitive. When `name.age = 18` executes, Js creates a temporary String Wrapper object for name and assign age as a property. However, as soon as this code completes, the temporary String Wrapper object will be destroyed. Then when `console.log(name.age)` exectutes, Js creates a new temporary String Wrapper object for name, but this new object does not have the age property.

## 单例内置对象

### Global
The Global Object doesn't need to be explicitly named, but we can still use its properties and methods directly, like `isNaN()`and `parseInt()`. In relity, there aren't standalone global functions or properties; any variable declared in the global scope automatically becomes a property of the Global Object.
#### URL 编码方法

#### eval() 方法

#### Global 对象属性
All special value like undefind, Nan and infinity are properties of Global. Additionally,
the constructor like Object, Function are also properties of global.
#### window 对象

### Math







