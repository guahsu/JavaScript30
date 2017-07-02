# 07 - Array Cardio Day 2
>首次上傳：2017/05/23

## **主題**
延續[[04 - Array Cardio Day 1]](https://github.com/guahsu/JavaScript30/tree/master/04_Array-Cardio-Day-1)的Array各種操作，這次有5個範例。  
[[BLOG]](https://guahsu.io/2017/05/JavaScript30-07-Array-Cardio-Day-2/)  
[[DEMO]](https://guahsu.io/JavaScript30/07_Array-Cardio-Day-2/index-GuaHsu.html) 

## **步驟**
#### 練習範例內有提供了2組資料：
1. people：[ { name: ‘string’, year: number } ]
3. comments：[ text: ‘string’, id: number } ]

#### 要練習的題目為：
1. people是否有19歲以上的人
2. People是否每個人都19歲以上
3. 在comments中找到id是823423的資料
4. 在comments中找到id是823423的資料索引值, 並透過索引值刪除這筆資料

## **JavaScript語法&備註**
### **1. some()**
題目：people是否有19歲以上的人？  
解答：
````javascript
const isAdult = people.some(person => ((new Date()).getFullYear()) - person.year >= 19);
````
透過`some()`會將Array中的資料逐筆進行判斷，只要有一筆通過判斷則回傳`true`並結束。
>參閱：[MDN-Array.prototype.some()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)

### **2. every() **
題目：people是否每個人都19歲以上？  
解答：
````javascript
const allAdults = people.every(person => ((new Date()).getFullYear()) - person.year >= 19);
````
`every()`會對Array中的每筆資料進行判斷，只要有一筆不符合則回傳`false`並結束。  
與`some()`是相反操作的感覺。
>參閱：[MDN-Array.prototype.every()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)

### **３. find() **
題目：在comments中找到id是823423的資料  
解答：
````javascript
const comment = comments.find(comment => comment.id === 823423);
````
`find()`會對Array中的資料逐筆進行判斷，返回第一筆符合條件的值，  
若都沒有符合的值，將返回`undefined`。
>參閱：[MDN-Array.prototype.find()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)

### **4. findIndex() & slice() & spared**
題目：在comments中找到id是823423的資料索引值, 並透過索引值刪除這筆資料  
解答：
````javascript
const index = comments.findIndex(comment => comment.id === 823423);
const newComments = [
      ...comments.slice(0, index),
      ...comments.slice(index + 1)
];
````
首先透過`findIndex()`對Array中的資料逐筆進行判斷，返回符合條件的索引值，    
接著利用`spared`也就是省略符號`...`來進行展開陣列並透過`slice()`組合陣列，  
` ...comments.slice(0, index),`這段先將陣列開頭到索引值前的資料加進來，  
`...comments.slice(index + 1)`這段則是將索引值+1後延續到陣列結束的資料加進來。  
`slice()`的第一個參數是陣列索引的起點，第二個是終點（且不會被使用）無填寫則是到結束。
>參閱：  
[MDN-Array.prototype.findIndex()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)  
[MDN-Spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator)  
[MDN-Array.prototype.slice()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)

