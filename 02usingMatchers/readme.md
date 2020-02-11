## 常用的匹配器
### 完全相等
* `.toBe`: 只能测试简单数据类型，原理上使用的是`Object.is`进行判断
* `.toEqual`: 递归检查数组或对象的每个字段是否都相等
* `.not`: 测试匹配结果相反结果

### 真假性
用来在不同场景下区分`undefined`,`null`和`false`
* `toBeNull`: 只匹配`null`
* `toBeUndefined`: 只匹配`undefined`
* `toBeDefined`: 匹配`toBeUndefined`的相反结果(即不配所有不是`undefined`的结果)
* `toBeTtruthy`: 匹配`if`语句认为是`true`的所有结果
* `toBeFalsy`: 匹配`if`语句认为是`false`的所有结果
```js
test('null', () => {
  const n = null;
  expect(n).toBeNull();
  expect(n).toBeDefined();
  expect(n).not.toBeUndefined();
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy();
});

test('zero', () => {
  const z = 0;
  expect(z).not.toBeNull();
  expect(z).toBeDefined();
  expect(z).not.toBeUndefined();
  expect(z).not.toBeTruthy();
  expect(z).toBeFalsy();
});
```


### 数值
大部分的数值比较方式都有相对应的匹配器
* `toBeGreaterThan`
* `toBeGreaterThanOrEqual`
* `toBeLessThan`
* `toBeLessThanOrEqual`

### 字符串
`toMatch`: 通过正则表达式来检查字符串： 
```js
test('there is no I in team', () => {
  expect('team').not.toMatch(/I/);
});

test('but there is a "stop" in Christoph', () => {
  expect('Christoph').toMatch(/stop/);
});
```

### 数组和可迭代的元素
`toContain`: 检查数组或可迭代元素是否包含特定项
```js
const shoppingList = [
  'diapers',
  'kleenex',
  'trash bags',
  'paper towels',
  'beer',
];

test('the shopping list has beer on it', () => {
  expect(shoppingList).toContain('beer');
  expect(new Set(shoppingList)).toContain('beer');
});
```

### 异常(Exceptions)
* `toThrow`: 检查一个特定函数在被调用的时候是否抛出一个错误
```js
function compileAndroidCode() {
  throw new Error('you are using the wrong JDK');
}

test('compiling android goes as expected', () => {
  expect(compileAndroidCode).toThrow();
  expect(compileAndroidCode).toThrow(Error);

  // You can also use the exact error message or a regexp
  expect(compileAndroidCode).toThrow('you are using the wrong JDK');
  expect(compileAndroidCode).toThrow(/JDK/);
});
```
