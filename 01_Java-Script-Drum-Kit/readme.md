# **01 - JavaScript Drum Kit**
>首次上傳：2017/05/16   

![](https://guahsu.io/2017/05/JavaScript30-01-Java-Script-Drum-Kit/demo1.png)

## **主題**
透過JS使鍵盤按下後播放出對應按鍵的聲音，並同時產生一個特效，  
在按下其他鍵後會關閉該特效並於新按鍵中啟用。  
[[BLOG]](https://guahsu.io/2017/05/JavaScript30-01-Java-Script-Drum-Kit/)  
[[DEMO]](https://guahsu.io/JavaScript30/01_Java-Script-Drum-Kit/index-GuaHsu.html)  

## **步驟**
#### Step1. 新增keydown listener
利用`window.addEventListener('keydown', playSound);`來監聽鍵盤動作。  
#### Step2. 建立function`playSound`
1. 利用傳入的e.keyCode來取得對應的`audio`標籤及該按鍵的`div`標籤
2. 判斷傳入的e.keyCode是否有對應的`audio`標籤，若無則退出
3. 使對應的`div`加上`playing`樣式，產生對應的典及特效
4. 使對應的`audio`播放時間為0
5. 播放對應的音檔
#### Step3. 新增transitionend listener
1. 偵測所有包含`className='key'`的元件
2. 當該元件觸發特效並結束時(`transitionend`)，呼叫`removeTransition`
#### Step4.  建立function`removeTransition`
1. 判斷傳入的propretyName是否為transform，若否則退出
2. 若為transform，則移除`playing`樣式

## **JavaScript語法&備註**
### **element.classList**：
這個會回傳element的class值(陣列)，  
範例用到了classList的方法`add()`及`remove()`
````
classList.add('aaa', 'bbb', 'ccc'); //新增多個className
classList.remove('aaa', 'bbb', 'ccc'); //移除多個className
````
如果已經存在/不存在的className則會被忽略。
>還有其他方法如:  
`toggle()`偵測是否存在這個className，存在則刪除/不存在則新增  
`contains()`偵測是否存在這個className, 返回true/false  
參閱：[MDN-Element.classList](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList)

### **HTMLmediaElement(audio)**：
HTML的`audio`標籤，在HTML放置如下標籤指定音源
````
<audio src="sound/a.mp3"></audio>
````
透過javascript來操作：  
`element.play()`:進行播放  
`element.currentTime`:指定播放秒數  
範例中使用`currentTime`是為了達到連發的效果XD  
>參閱：[MDN-HTMLMediaElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement)

### **forEach**
之前沒在javascript中使用的語法，用法如下：
````javascript
arr.forEach(callback function)
````
我是用for迴圈來比對做語法理解的：
````javascript
let datas = ['data1', 'data2', 'data3'];
//for迴圈寫法
for (let i = 0; i < datas.length; i++) {
    console.log(datas[i]);
}
//forEach寫法
datas.forEach(function(data){
    console.log(data);
});
//都會輸出
//data1
//data2
//data3

datas.forEach(console.log);
//如果透過上面直接console.log來看到結果是：
//data1 0 ["data1", "data2", "data3"]
//data2 1 ["data1", "data2", "data3"]
//data3 2 ["data1", "data2", "data3"]
//回傳的分別是value, index, array本身內容。
````
>參閱：[MDN-Array.prototype.forEach()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)

### **箭頭函式(Arrow Function)**
ES6的新語法
````javascript
//傳統寫法
let func1 = function(arg) { console.log('Hi, ' + arg); };
//箭頭函式寫法
let func2 = arg => console.log('Hi, ' + arg);
//補充:如果該function沒有參數要傳，要帶空括號如下
let func3 = () => console.log('Hi');
````
>參閱：[MDN-Arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)

### **addEventListener**
因為我是是第一次看到`transtionend`這個event，  
所以去MDN查了HTML DOM event記錄連結在此
>參閱：[MDN-Event reference](https://developer.mozilla.org/en-US/docs/Web/Events)


### **template literals**
模板文字，同樣屬於第一次看到的東西，  
利用`` ` `` - 反引號(back-tick)或稱重音符(grave accent)來組合字串，  
在範圍內可利用`${}`加上變數操作

例如原本的字串+變數組合寫法：
```javascript
let str = '<div data-key="' + key + '">' +
         '<button>click me</button>' +
         '</div>';
```
改用template string來做只要
```javascript
let str = `<div data-key="${key}">
         <button>click me</button>
         </div>`;
```
用`` ` ``包住字串，利用`${}`來包變數  
這樣可以很輕鬆的組出易於閱讀的組合字串！  
不用像以前還要注意單雙引號與+的配合了~
>參閱：[MDN-Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)

### **Array.from**
範例中有這段
````javascript
const keys = Array.from(document.querySelectorAll('.key'));
````
查詢了`Array.from`才知道這是一個將一個物件或是字串轉為陣列格式的語法，  
但當時覺得為何要把陣列在轉成陣列?querySelectorAll不就是返回陣列嗎?  
在查下去才發現querySelectorAll返回的是nodeList且**nodeList跟Array是不同的!**  
雖然都很像陣列，但nodeList並沒有array.prototype上的方法！  
最簡單的例子是用array.push()去測試，會發現由querySelectAll得到的物件無法用.push()。
```javascript
let testNodeList = document.querySelectAll('.key');
testNodeList.push('add'); // <--非陣列會報錯TypeError: testNodeList.push is not a function

let testArray = Array.from(testNodeList);
testArray.push('add'); // <-- 轉為陣列就可以了
```
至於在範例中轉型的原因，  
我想應該是因為若無轉型為Array使用nodeList來forEach可能會導致某些瀏覽器版本錯誤。  
>nodeList由querySelectorAll及childNodes返回的
參閱：[MDN-NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList)

## **CSS語法&備註**
### **display:flex**
CSS3的排版語法，以範例中的來做備註紀錄
````css
.keys {
    display: flex; /*要使用flex要在元素內先宣告flex*/
    flex: 1; /*這是一個簡寫，全部為flex: flex-grow｜flex-shrink｜flex-basis*/
    min-height: 100vh; /*vh代表view height, 百分比呈現*/
    align-items: center; /*宣告為flex後才有效的屬性，垂直置中*/
    justify-content: center;/*宣告為flex後才有效的屬性，水平置中*/
}
````
>參閱：[MDN-flex](https://developer.mozilla.org/en-US/docs/Web/CSS/flex)

## 探索
原範例只能由鍵盤觸發，  
我的探索是為這個範例加上可由滑鼠點擊觸發的功能
````javascript
const keys = Array.from(document.querySelectorAll('.key'));

//新增click功能綁定至每個class="key"
keys.forEach(key => key.addEventListener('click', playSound));

function playSound(e) {
    //依據不同的事件來取得對應的key_code(e.type可以看，以下是簡寫版)
    let keyCode = e.keyCode || this.getAttribute('data-key');

    const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
    const key = document.querySelector(`div[data-key="${keyCode}"]`);

    if (!audio) return;

    key.classList.add('playing');
    audio.currentTime = 0;
    audio.play();
}