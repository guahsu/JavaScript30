# 12 - Key Sequence Detection
>首次上傳：2017/07/26

![](https://guahsu.io/2017/07/JavaScript30-12-Key-Sequence-Detection/demo12.gif)

## **主題**
記得以前玩遊戲常輸入的祕技嗎？上上下下左右左右BA之類的，    
現在很多網站也有偷塞一些密碼，當你輸入完後會出現對應特效，  
這篇就是介紹如何用JS來做這樣的小效果。

[[BLOG]](https://guahsu.io/2017/07/JavaScript30-12-Key-Sequence-Detection/)  
[[DEMO]](https://guahsu.io/JavaScript30/12_Key-Sequence-Detection/index-GuaHsu.html)

## **步驟**
### Step1. 設定目標
在這個效果中，目的是在瀏覽器內容中透過鍵盤觸發對應的“密碼”後執行，  
所以需要設定一個陣列來保存輸入值，並設定好設定的密碼(我設定為guahsu)，  
接著針對`window`對這個瀏覽器視窗來做`addEventListener('keyup'..)`監聽鍵盤動作。
### Step2. 執行
當觸發`keyup`時利用陣列的`push()`來塞入鍵盤動作所觸發的輸入內容`e.key`，  
接著用陣列的`splice()`來控制密碼陣列，使其不超出密碼長度且堆疊替換掉第一個元素，  
最後透過陣列的`join()`及字串的`includes()`來驗證輸入內容是否與設定密碼相同。  
### 程式備註
````javascript
const pressed = []; //保存輸入值用的陣列
const secretCode = 'guahsu'; //設定的密碼
//監聽整個瀏覽器視窗的鍵盤動作
window.addEventListener('keyup', (e) => {
  //push觸發的鍵盤輸入值到陣列中
  pressed.push(e.key);
  //透過運算使pressed陣列長度始終與設定密碼相同，且當超出時替換掉陣列第一個元素
  pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);
  //判斷輸入值陣列的內容是否與設定密碼相同
  if (pressed.join('').includes(secretCode)) {
    //觸發效果
    cornify_add();
  }
  //在畫面中顯示輸入內容
  document.querySelector('.inputCode').innerHTML = pressed.join('-');
})
````

## **JavaScript語法&備註**
### **Array.prototype.splice()**
`splice(start, deleteCount, item1, item2, ...)`可以對陣列內容過行刪除或新增  
第一個參數`start`為開始位置，若為負值則會返著數（由陣列尾部開始數），
第二個參數`deleteCount`為移除數量，若為0則不移除、若為負值則沒反應，  
第三個參數`item1..`開始的為加入元素，可從第一個參數位置開始塞陣列元素。  
例如
````javascript
var arr = [1,2,3];
arr.splice(0, 1);  //代表從位置0開始刪除1個元素，arr變成[2,3]
arr.splice(-1, 1); //代表從陣列尾巴第一個開始刪除1個元素，arr變成[1,2]
arr.splice(0, -1); //第二個參數不接受複數，arr不變
arr.splice(0, 1, '4') //從位置0刪除1個元素，並從位置0塞入'4'，arr變成['4',2,3]
````
所以回到練習中的這段code，就會了解為何這樣可以維持陣列長度並堆疊替換第一個元素  
````javascript
  const pressed = []; 
  const secretCode = 'guahsu'
  pressed.push(e.key);
  pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);
````
以此範例來說，第一個參數始終會是-7，第二個參數會是當前輸入陣列長度-6，  
所以當事件觸發到第七個陣列值（第七個輸入被觸發且`push`進pressed時），  
例如`[1,2,3,4,5,6,7]`時會變成`pressed.splice(-7,1)`，  
等於刪除倒數第七個元素（也就是index0第一筆），  
並透過陣列長度-設定密碼長度來決定刪除數量，使其維持在固定長度，  
之後每次的`push`會加在尾段，而`splice`會刪除第一個元素。
>其實有卡住一點點，  
>因為作者寫的第一個參數用`-secretCode.length - 1`，
>我一直搞不清楚跟用0有什麼差別囧  
>
>參閱：[MDN-Array.prototype.splice()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)


### **Array.prototype.join()**
用`join()`可以把陣列轉為字串，並透過參數設定連接符號。  
例如：
````javascript
var arr = [1,2,3];
arr.join(''); // '123'
arr.join('@@'); // '1@@2@@3'
````
>參閱：[Array.prototype.join()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join)


### **Array.prototype.includes()**
在string跟array都有`includes()`可以使用，  
都是去判斷string/array是否包含incudes設定的參數後回傳`true/false`  
在這個練習中，因為使用`pressed.join('').includes(secretCode)`;  
依據處理優先序在`pressed.join()`時已經被轉字串了，所以這裡的`incudes()`是屬於string的。
>參閱：[Array.prototype.includes()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)


## 探索
這次雖然只是小小的效果，在寫心得的時候真的也是學到很多以前沒注意的東西，  
並在寫`includes()`才也知道string也有這個效果，以往我都只會使用`match()`，  
`includes()`屬於ES6的語法，爬文後整理到關於字串比對的使用還有以下各種方法：
````javascript
var str = 'abcde';
var check1 = 'ab'; //包含ab，期待值是true
var check2 = 'ac'; //包含ac，期待值是false

//用includes()來取得true/false
str.includes(check1); //true
str.includes(check2); //false

//用match()來處理，判斷是否為null來取得true/false
str.match(check1); // object
str.match(check2); // null

//用indexOf()來處理，判斷是否為-1來取得true/false
str.indexOf(check1); // 0
str.indexOf(check2); // -1

//用search()，判斷是否為-1來取得true/false
str.search(check1); // 0
str.search(check2); // -1

//用RegExp正規表示式來取得true/false
var reg1 = /ab/;
var reg2 = /ac/;
reg1.test(str); // true
reg2.test(str); // false
````
