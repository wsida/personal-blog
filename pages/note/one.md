---
layout: doc
navbar: true
sidebar: false
prev: false
next: false
title: note
noteTime: 2025/06/06
noteTitle: Typescript随记
noteSummary: 有关Typescript使用记录，包含一些内置泛型、声明语法等
---

<!--@include: ../../.vitepress/parts/note-child.md-->

# Typescript随记

1. `Partial<T>`

将类型 T 的所有属性变为可选。

```ts
type Partial<T> = {
  [P in keyof T]?: T[P];
};
```

2. `Required<T>`

将类型 `T` 的所有属性变为必选。

```ts
type Required<T> = {
  [P in keyof T]-?: T[P];
};
```

**这里的-?是移除属性修饰符中的?，将可选属性变为必选属性**

3. `Readonly<T>`

将类型 T 的所有属性设为只读。

```ts
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

4. `Record<K, T>`


创建一个类型，其属性名为 K，属性值为 T。

```ts
type Record<K extends keyof any, T> = {
  [P in K]: T;
};
```

5. `Pick<T, K>`


从类型 T 中选择部分属性 K。

```ts
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
```

6. `Exclude<T, U>`


从类型 T 中排除可以赋值给类型 U 的类型。

```ts
type Exclude<T, U> = T extends U ? never : T;
```

7. `Omit<T, K>`


从类型 T 中剔除部分属性 K。

```ts
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```

8. `Extract<T, U>`

从类型 T 中提取可以赋值给类型 U 的类型。

```ts
type Extract<T, U> = T extends U ? T : never;
```

9. `NonNullable<T>`
从类型 T 中排除 null 和 undefined。

```ts
type NonNullable<T> = T extends null | undefined ? never : T;
```

10. `ReturnType<T>`

获取函数类型 T 的返回类型。

```ts
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
```

**infer 是ts的关键字，一般很少用到，主要用于条件类型中，用来推断一个类型的某些部分。**

11. `ConstructorParameters<T>`

获取构造函数类型 T 的参数类型组成的元组类型。

```ts
type ConstructorParameters<T extends abstract new (...args: any) => any> = T extends abstract new (...args: infer P) => any ? P : never;
```

12. `Parameters<T>`

获取函数类型 T 的参数类型组成的元组类型。

```ts
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;
```

13. `InstanceType<T>`

获取构造函数类型 T 的实例类型。

```ts
type InstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer R ? R : any;
```

14. `ThisType<T>`

标记对象字面量的 this 类型。

```ts
type ThisTypeLike<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any
    ? (this: T, ...args: Parameters<T[K]>) => ReturnType<T[K]>
    : T[K];
};
```

15. extends 条件表达式

在 TypeScript 中，当 **联合类型** 出现在 `extends` 条件表达式的左侧时，条件类型会被 **自动分发**（Distributive Conditional Types）。这是 TypeScript 的一个重要特性，理解它能帮助你写出更强大的类型工具。

当条件类型的形式为 `T extends U ? X : Y`，且 `T` 是 **泛型类型参数** 时：

-   **如果 `T` 是联合类型**（如 `A | B | C`），TypeScript 会将条件类型 **自动分发给每个成员**。
-   最终结果是每个成员的条件类型结果的 **联合类型**。

**示例：**
```ts
type IsString<T> = T extends string ? true : false;

// 当 T 是联合类型时：
type Result = IsString<string | number | boolean>;

// 等价于：
type Result = IsString<string> | IsString<number> | IsString<boolean>;
// 即：true | false | false → true | false
```

**触发条件**

-   **必须是泛型类型参数**：`T` 必须是泛型类型参数（如 `type Example<T> = ...`）。
-   **必须是裸类型参数**（Bare Type Parameter）：`T` 不能被包装在其他类型中（如 `Array<T>`、`Promise<T>` 等）。

