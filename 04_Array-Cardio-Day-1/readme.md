# **04 - Array Cardio Day 1**
>首次上傳：2017/05/19  

## **主題**
作者用了8個範例來介紹關於Array的各種操作。  
[[BLOG]](https://guahsu.io/2017/05/JavaScript30-04-Array-Cardio-Day-1/)  
[[DEMO]](https://guahsu.io/JavaScript30/04_Array-Cardio-Day-1/index-GuaHsu.html)  

## **步驟**
#### 練習範例內有提供了3組資料：
1. inventors：first(名)、last(姓) 、year(出生日期)、passed(逝世日期)
2. people：逗點分隔的姓名(firstName, lastName)
3. data：在練習8中提供的一組包含重覆資料的陣列

#### 要練習的題目為：
1. 篩選出於1500~1599年間出生的inventor(year in 1500-1599)
2. 將inventors內的first與last組合成一個陣列
3. 依據生日由大至小排序所有的inventor
4. 加總所有inventor的在世時間
5. 依據年齡由大至小排序所有的inventor
6. 列出wiki中巴黎所有包含'de'的路名(在wiki中透過querySelectorAll來選取資料作篩選)
7. 依據lastName排序所有people的資料
8. 分別計算data內每個種類的數量

## **JavaScript語法&備註**
### **1. filter()**
題目：篩選出於1500~1599年間出生的inventor(year in 1500-1599)  
解答：透過`fifter()`對來源做篩選，會將結果為`true`的資料組成陣列回傳
````javascript
const fifteen = inventors.filter(function(inventor) {
    if(inventor.year >= 1500 & inventor.year <= 1600) {
        return true;
    }
});
//可簡化為arrow function
const fifteen = inventors.filter(inventor => (inventor.year >= 1500 & inventor.year <= 1600));
````
>參閱：[MDN-Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

### **2. map()**
題目：將inventors內的first與last組合成一個陣列  
解答：透過`map`來將firstName/lastNam組合返回陣列
````javascript
const fullNames = inventors.map(inventor => `${inventor.first} ${inventor.last}`);
        console.log(fullNames);
````
>參閱：[MDN-Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

### **3. sort()**
題目：依據生日由大至小排序所有的inventor  
解答：透過`sort()`來做排序
````javascript
const ordered = inventors.sort(function(a, b) {
    if(a.year > b.year) {
        return 1;
    } else {
        return -1;
    }
});
//利用箭頭函式及三元運算式可簡寫如下
const ordered = inventors.sort((a, b) => a.year > b.year ? 1 : -1);
`````
>若比對的值相同要依據原排序的話，要再加上一個`return 0`的判斷使其保持原排序  
>參閱：[MDN-Array.prototype.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)  


### **4. reduce()**
題目：加總所有inventor的在世時間  
解答：要加總的話，用以前的寫法會寫這樣
````javascript
let totalYears = 0;
for (let i = 0; i < inventors.length; i++) {
    let liveYear = inventors[i].passed - inventors[i].year;
    totalYears += liveYear;
}
````
如果利用`reduce()`搭配箭頭函式如下：
````javascript
const totalYears = inventors.reduce((total, inventor) => {
    return total + (inventor.passed - inventor.year);
}, 0);
````
`redice()`的callback有四個參數：
1. 初始值
2. 陣列中正在處理的元素
3. 陣列中正在處理的元素的索引值（好饒舌ＸＤ）
4. 使用reduce的陣列
及一個預設值(會再第一次執行時賦予第一個參數設定的值。

所以用這個答案來看，在第一次執行時預設值賦予了`total=0`  
接著每次讀取陣列元素時對其計算在世時間並加回total中。
>參閱：[MDN-Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)

### **5. sort()**
題目：依據年齡由大至小排序所有的inventor。  
解答：排序原理同第三題，多了一段計算年齡的部分而已
````javascript
const oldest = inventors.sort(function (a, b) {
    const lastInventor = a.passed - a.year;
    const nextInventor = b.passed - b.year;
    return lastInventor > nextInventor ? -1 : 1;
});
````

### **6. map() + filter() & includes()**
題目：列出wiki中巴黎所有包含'de'的路名
解答：
````javascript
const category = document.querySelector('.mw-category');
const links = Array.from(category.querySelectorAll('a'));
const de = links
            .map(link => link.textContent)
            .filter(streetName => streetName.includes('de'));
````
這題先用`querySelectorAll()`來選取對象元件，  
再利用之前[第一個練習](https://github.com/guahsu/JavaScript30/tree/master/01_Java-Script-Drum-Kit)有提到的Array.from將nodeList轉為Array，  
才能對其進行map操作(map是Array的方法，nodeList沒有)，  
同時加上`filter`+`includes`來做文字的篩選，若存在’de’就回傳true加入陣列。
>參閱：[MDN-Array.prototype.includes()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)

### **7. sort() & split()**
題目：依據lastName排序所有people的資料
解答：
````javascript
const alpha = people.sort((lastOne, nextOne) => {
    const [aLast, aFirst] = lastOne.split(', ');
    const [bLast, bFirst] = nextOne.split(', ');
    return aLast > bLast ? 1 : -1;
});
````
由於people的資料都是`['Beck, Glenn’]`這樣的逗點字串，  
要取得lastName就必須要使用`split()`來切開，  
滿酷的是因為`split()`會返回陣列，所以宣告了陣列`[aLast, aFirst]`來接值  
接著再利用接到的值來做排序比對。
>參閱：[MDN-String.prototype.split()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split)

### **8. reduce()**
題目：分別計算data內每個種類的數量  
解答：
````javascript
const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck', 'pogostick'];

const transportation = data.reduce(function (obj, item) {
    if (!obj[item]) {
        obj[item] = 0;
    }
    obj[item]++;
        return obj;
}, {});
````
這題的做法真的很厲害啊！  
首先利用預設值將`reduce()`的第一個參數設定為空物件`obj={}`  
接著做一個判斷來決定建立物件內容或著使已建立內容累加總數!  


## 探索
將上面用到的技巧應用到一個常會遇到的統計問題  
題目：試著將統計people的所有單字拆開，並統計各單字共出現次數(僅包含英文字)  
解答：
````javascript
const strCnt = people.reduce(function (obj, item) {
    const itemStr = item.match(/[a-zA-Z]/g, '');
        itemStr.forEach(str => {
            if (!obj[str]) {
           obj[str] = 0;
            }
            obj[str]++
        })
    return obj;
}, {});
console.log(strCnt);
````
同第8題，先宣告一個空陣列來傳入item，  
接著將每個item透過`match()`拆開只取英文字，  
再利用`forEach`來建立內容或是累加總數。
