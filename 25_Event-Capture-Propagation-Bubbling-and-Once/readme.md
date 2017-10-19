# 25 - Event Capture, Propagation, Bubbling and Once

![](https://guahsu.io/2017/10/JavaScript30-24-Sticky-Nav/demo24.gif)

## **主題**
解析`addEventListener`中事件的捕捉、傳遞、氣泡與單次執行方法

[[BLOG]](https://guahsu.io/2017/10/JavaScript30-25-Event-Capture-Propagation-Bubbling-and-Once) | [[DEMO]](https://guahsu.io/JavaScript30-25-Event-Capture-Propagation-Bubbling-and-Once/index-GuaHsu.html)

## **步驟**
### step1 建立事件模型與基本呼叫
首先建立三層DIV作為稍後測試使用的模型，
依序包覆為：紫色>淺橘色>深橘色
```html
<div class="one"> 
  <div class="two">
    <div class="three">
    </div>
  </div>
</div>
```
接著建立`click`事件
```javascript
// 取得頁面的所有div
const divs = document.querySelectorAll('div');

function logText(e) {
  // 印出當前div的class name
  console.log(this.classList.value);
}

// 為每個div加上click事件監聽
divs.forEach(div => div.addEventListener('click', logText));
```

### step2 預設的點擊事件
當對著畫面中間(深橘色/one)做點擊時，console印出來的是
```javascript
three
two
one
```  
會從`click`的位置的最深處開始向外層連動所有的div`click`事件，像是氣泡一樣的從內向外浮出去。

### step3 addEventListener的第三個參數
深入檢查，會發現其實`addEventListener`是有第三個參數的：
```javascript
divs.forEach(div => div.addEventListener('click', logText, {
  capture: false, // 預設為false
  once: true // 預設為false
}));
```
第三個參數的第一個屬性`Capture`就是事件的捕捉順序，  
剛剛提到`click`後console印出來順序是由內向外，  
若將`Capture`設為`true`會在點擊中間(深橘色/one)會印出：
```javascript
one
```
就只有印出one而已，這是因為對當前最外層的容器one去點了，  
就已經捕捉到目的了，所以他不會再往下找，只會到點擊的最外層目標為止。

### step4 topPropagation()
但如果想從內層往外層點，不想每次都