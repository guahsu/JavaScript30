# 27 - Click and Drag

![](https://guahsu.io/2017/10/JavaScript30-27-Click-and-Drag/demo27.gif)

## **主題**
製作一個可拖曳移動的水平捲軸。

[[BLOG]](https://guahsu.io/2017/10/JavaScript30-27-Click-and-Drag) | [[DEMO]](https://guahsu.io/JavaScript30/27_Click-and-Drag/index-GuaHsu.html)

## **步驟**
### Step1. 取得頁面元素與設定初始變數
```javascript
const slider = document.querySelector('.items');
let isDown = false;
let startX;
let scrollLeft;
```

### Step2. 建立基本事件框架
因為這次練習主要是在拖曳的動作，  
所以對會用到的mouse event事件先建立監聽框框出來：
```javascript
/** 滑鼠按鍵按下 **/
slider.addEventListener('mousedown', () => {

});

/** 滑鼠滑出範圍**/
slider.addEventListener('mouseleave', () => {

});

/** 滑鼠按鍵放開 **/
slider.addEventListener('mouseup', () => {

});

/** 滑鼠移動 **/
slider.addEventListener('mousemove', () => {

});
```

### Step3. 滑鼠按下事件
```javascript
slider.addEventListener('mousedown', (e) => {
  // 給予按下的flag
  isDown = true;
  // 加上抓取效果樣式
  slider.classList.add('active');
  // 設定移動的初始值為目前頁面距離-當前item左邊距
  startX = e.pageX - slider.offsetLeft;
  // 設定目前捲軸的左距
  scrollLeft = slider.scrollLeft;
});
```

### Step4. 滑鼠移出事件
```javascript
slider.addEventListener('mouseleave', () => {
  // 將按下的flag與樣式移除
  isDown = false;
  slider.classList.remove('active');
});
```

### Step5. 滑鼠按鍵放開事件
與Step4一樣，主要是取消樣式
```javascript
slider.addEventListener('mouseup', () => {
  // 將按下的flag與樣式移除
  isDown = false;
  slider.classList.remove('active');
});
```

### Step6. 滑鼠移動事件
```javascript
slider.addEventListener('mousemove', (e) => {
  // 若移動時的狀態非按下，不作動
  if (!isDown) return;
  // 避免觸發其他預設事件（按下且移動預設是選取範圍）
  e.preventDefault();
  // 設定X（當前定位）為目前頁面距離-當前item左邊距
  const x = e.pageX - slider.offsetLeft;
  // 設定移動距離為 X-初始值
  const walk = x - startX;
  // 設定水平捲軸的偏移量
  slider.scrollLeft = scrollLeft - walk;
});
```

### 其他
如果有仔細看，會發現當拖曳左右移動時，  
HTML中的卡片會有3D移動的效果感很褲，這是CSS的`rotateY`效果:
```CSS
/* 用scaleX與rotateY搭配使移動時有3D效果 */
.item:nth-child(even) { transform: scaleX(1.31) rotateY(40deg); }
.item:nth-child(odd) { transform: scaleX(1.31) rotateY(-40deg); }
```
>參閱：[MDN-rotateY()](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotateY)