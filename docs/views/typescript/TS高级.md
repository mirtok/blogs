---
title: TS高级
date: 2021-11-24
tags:
 - typescript
 - javascript      
categories: 
 - 前端
---

### Typescript深度理解

#### 概念

+ infer：类型占位，结合类型分发，协变与逆变等概念

+ 如果判断继承的也是泛型，那么就可以快速取出一些类型，而不用自己重新去定义。
+ 有内置的，所以这就需要和infer联合使用

## extends

[typescript](https://so.csdn.net/so/search?from=pc_blog_highlight&q=typescript) 2.8引入了条件类型关键字: extends，长这个样子:

```typescript
T extends U ? X : Y
```

看起来是不是有点像三元运算符: `condition ? result(1) : result(2)`，用大白话可以表示为:

> 如果`T`包含的类型 是 `U`包含的类型的 ‘子集’，那么取结果`X`，否则取结果`Y`。

再举几个ts预定义条件类型的例子，加深理解:

```typescript
type NonNullable<T> = T extends null | undefined ? never : T;
// 如果泛型参数 T 为 null 或 undefined，那么取 never，否则直接返回T。
let demo1: NonNullable<number>; // => number
let demo2: NonNullable<string>; // => string
let demo3: NonNullable<undefined | null>; // => never
```

### 分配式extends

```typescript
T extends U ? X : Y
```

其实就是当上面的T为联合类型的时候，会进行拆分，有点类似数学中的分解因式:

> (a + b) * c => ac + bc

官网的例子

```typescript
type Diff<T, U> = T extends U ? never : T; // 找出T的差集
type Filter<T, U> = T extends U ? T : never; // 找出交集

type T30 = Diff<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // => "b" | "d"
// <"a" | "b" | "c" | "d", "a" | "c" | "f">
// 相当于
// <'a', "a" | "c" | "f"> |
// <'b', "a" | "c" | "f"> |
// <'c', "a" | "c" | "f"> |
// <'d', "a" | "c" | "f">
type T31 = Filter<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // => "a" | "c"
// <"a" | "b" | "c" | "d", "a" | "c" | "f"> 同上
let demo1: Diff<number, string>; // => number
```

## infer

在extends语句中，还支持`infer`关键字，可以推断一个类型变量，高效的对类型进行模式匹配。但是，这个类型变量只能在true的分支中使用。

```typescript
// 内置 ReturnType
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
```

> infer X 就相当于声明了一个变量，这个变量随后可以使用，是不是有点像for循环里面的声明语句？

```typescript
for (let i = 0, len = arr.length; i < len; i++) {
    // do something
}
```

> 不同的是，infer X的这个位置本应该有一个写死的类型变量，只不过用infer R替换了，更灵活
>
> 需要注意的是infer声明的这个变量只能在true分支中使用

### 例子一

```typescript
// 解读: 如果泛型变量T是 () => infer R的`子集`，那么返回 通过infer获取到的函数返回值，否则返回boolean类型
type Func<T> = T extends () => infer R ? R : boolean;

let func1: Func<number>; // => boolean
let func2: Func<''>; // => boolean
let func3: Func<() => Promise<number>>; // => Promise<number>
```

### 例子二

```typescript
// 同上，但当a、b为不同类型的时候，返回不同类型的联合类型
type Obj<T> = T extends {a: infer VType, b: infer VType} ? VType : number;

let obj1: Obj<string>; // => number
let obj2: Obj<true>; // => number
let obj3: Obj<{a: number, b: number}>; // => number
let obj4: Obj<{a: number, b: () => void}>; // => number | () => void
```

### 例子三([Vue](https://so.csdn.net/so/search?from=pc_blog_highlight&q=Vue)3中的UnwrapRef)

```typescript
// 如果泛型变量T是ComputedRef的'子集'，那么使用UnwrapRefSimple处理infer指代的ComputedRef泛型参数V
// 否则进一步判断是否为Ref的'子集'，进一步UnwrapRefSimple
export type UnwrapRef<T> = T extends ComputedRef<infer V>
  ? UnwrapRefSimple<V>
  : T extends Ref<infer V> ? UnwrapRefSimple<V> : UnwrapRefSimple<T>
    
// 我是分割线
    
// 如果T为Function | CollectionTypes | BaseTypes | Ref之一的'子集'，直接返回。
// 否则判断是否为数组的'子集'，不是的话视为object，调用UnwrappedObject
type UnwrapRefSimple<T> = T extends Function | CollectionTypes | BaseTypes | Ref
  ? T
  : T extends Array<any> ? T : T extends object ? UnwrappedObject<T> : T

// 我是分割线
// 调用UnwrapRef，产生递归效果，解决了ts类型递归
type UnwrappedObject<T> = { [P in keyof T]: UnwrapRef<T[P]> } & SymbolExtract<T>

// 我是分割线
    
// 泛型Ref
export interface Ref<T = any> {
  [Symbol()]: true
  value: T
}

// 我是分割线

export interface ComputedRef<T = any> extends WritableComputedRef<T> {
  readonly value: T
}

// 我是分割线

export interface WritableComputedRef<T> extends Ref<T> {
  readonly effect: ReactiveEffect<T>
}
```

