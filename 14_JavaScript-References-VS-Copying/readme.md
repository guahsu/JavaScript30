# 14 - JavaScript References VS Copying
>首次上傳：2017/08/26

## **主題**
介紹JavaScript中陣列與物件的引用(refrence)及複製(Copying)。

[[BLOG]](https://guahsu.io/2017/08/JavaScript30-14-JavaScript-References-VS-Copying/)  
[[DEMO]](http://guahsu.io/JavaScript30/14_JavaScript-References-VS-Copying/index-GuaHsu.html)  

## **步驟**
### Step1. 原始型別
JavaScript中的原始型別(Primitive Type)：  
1. String
2. Number
3. Boolean
4. Null
5. Undefine

### Step2. 物件型別
JavaScript中的物件型別(Object Type)：  
1. 使用者自訂的物件 - `var obj = {}`
2. 內建的物件型別 - Array, Date, Math, RegExp ..  
對，`Array`也是個物件。

````javascript
// JS的陣列中可以使用物件的字串用法
var arr = ['a', 'b', 'c'];
console.log(arr[0]); // 'a'
console.log(arr['0']); // 'a'

// JS的陣列也可以塞屬性
arr.test = function() { return 'Hi'; };
arr.test(); // 'Hi'

typeof(arr); // 'object'
````

### Step3. Call by value
原始型別都是Call by value，當複製時不影響彼此，  
如以下範例（上述個原始型別皆是）：
````javascript
var a = 'a';
var b = a;
console.log(a, b); // a a
b = 'b';
console.log(a, b); // a b
````
最初的`b = a`使`b`指向與`a`同一個記憶體位置(存放字串a)，  
而當`b = 'b'`時，b建立了一個記憶體位置存放字串b，並指向該位置。

### Step4. Call by refrence
當物件型別被複製使用時，是會被彼此改變的  
如以下範例：
````javascript
// Array
var arr = ['a', 'b'];
var arr2 = arr;
console.log(arr, arr2);// ['a', 'b'] ['a', 'b']
arr2[1] = 'c';
console.log(arr, arr2);// ['a', 'c'] ['a', 'c']

// Object
var obj = { a: 1, b: 2 };
var obj2 = obj;
console.log(obj, obj2);// { a: 1, b: 2 } { a: 1, b: 2 }
obj2.b = 3;
console.log(obj, obj2);// { a: 1, b: 3 } { a: 1, b: 3 }
````
以陣列為例，當最初的`arr2 = arr`時，  
`arr2`指向與`arr`同個記憶體位置(存放陣列['a', 'b'])，  
但在`arr2[1] = 'c'`時，`arr2`仍指著與`arr`同個位置，  
所以當改變了索引[1]的值時，`arr`及`arr2`的索引[1]都被變更了。  

### Step5. 陣列的複製
為了避免Call by refrence時會去異動到原本的陣列，  
就要先把原本的陣列做一次複製，用剛才的範例來做，  
有以下幾種方法：
**Array.prototype.Slice()**
如果直接使用`slice()`不指定起始與結束位置的話，  
就等於直接複製整個整列：  
````javascript
var arr = ['a', 'b'];
var arr2 = arr.slice();
console.log(arr, arr2);// ['a', 'b'] ['a', 'b']
arr2[1] = 'c';
console.log(arr, arr2);// ['a', 'b'] ['a', 'c']
````
>參閱：[MDN-Array.prototype.slice()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)

**Array.prototype.concat()**
使用`concat()`可以合併陣列，所以如果使用空陣列來合併原陣列，  
也會達到複製整個陣列的效果：
````javascript
var arr = ['a', 'b'];
var arr2 = [].concat(arr);
console.log(arr, arr2);// ['a', 'b'] ['a', 'b']
arr2[1] = 'c';
console.log(arr, arr2);// ['a', 'b'] ['a', 'c']
````
>參閱：[MDN-Array.prototype.concat()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)

**Spread syntax**
ES6的`Spread`語法，直接使用於複製方法如下：
````javascript
var arr = ['a', 'b'];
var arr2 = [...arr];
console.log(arr, arr2);// ['a', 'b'] ['a', 'b']
arr2[1] = 'c';
console.log(arr, arr2);// ['a', 'b'] ['a', 'c']
````
>參閱：[MDN-Spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator)

**Array.from()**
同為ES6的`Array.from()`也可以快速達到複製的效果：

````javascript
var arr = ['a', 'b'];
var arr2 = Array.from(arr);
console.log(arr, arr2);// ['a', 'b'] ['a', 'b']
arr2[1] = 'c';
console.log(arr, arr2);// ['a', 'b'] ['a', 'c']
````
>參閱：[MDN-Array.from()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from)

### Step6. 物件的複製
同樣的，物件也會有call by refrence的特性，  
所以與陣列相同，使用之前的範例來做物件的複製：

**Object.assign()**
使用`Object.assign()`來做，指定一個空的物件並把目標對象塞進去就好了：
````javascript
var obj = { a: 1, b: 2 };
var obj2 = Object.assign({}, obj);
console.log(obj, obj2);// { a: 1, b: 2 } { a: 1, b: 2 }
obj2.b = 3;
console.log(obj, obj2);// { a: 1, b: 3 } { a: 1, b: 3 }
````

>參閱：[MDN-Object.assign()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

### Step7. JSON.parse * JSON.stringify
利用`JSON.parse * JSON.stringify`來把目標對象作轉換賦值的動作，
不論目標對象是什麼型別，都可以用這招來做複製：
````javascript
//Array
var arr = ['a', 'b'];
var arr2 = JSON.parse(JSON.stringify(arr));
console.log(arr, arr2);// ['a', 'b'] ['a', 'b']
arr2[1] = 'c';
console.log(arr, arr2);// ['a', 'b'] ['a', 'c']

//Object
var obj = { a: 1, b: 2 };
var obj2 = JSON.parse(JSON.stringify(obj));
console.log(obj, obj2);// { a: 1, b: 2 } { a: 1, b: 2 }
obj2.b = 3;
console.log(obj, obj2);// { a: 1, b: 3 } { a: 1, b: 3 }
````

