# 22 - Follow Along Link Highlighter

![](https://guahsu.io/2017/10/JavaScript30-22-Follow-Along-Link-Highlighter/demo22.gif)

## **主題**
透過`getBoundingClientRect`與CSS的`transform`來達到HightLight樣式會跟著指定位置移動的效果。

[[BLOG]](https://guahsu.io/2017/10/JavaScript30-22-Follow-Along-Link-Highlighter)  
[[DEMO]](http://guahsu.io/JavaScript30/22_Follow-Along-Link-Highlighter/index-GuaHsu.html)  

## **步驟**
### Step1. 取得頁面元素
```javascript
// 取得HTML中所有的a元素
const triggers = document.querySelectorAll('a');
// 建立一個span來放置highlight效果
const highlight = document.createElement('span');
highlight.classList.add('highlight');
// 將建立的span加到頁面中
document.body.append(highlight);
```

### Step2. 撰寫移入狀態
用以下的JS對目標(a連結)定位並設定樣式
```javascript
// 效果
function highlightLink() {
  // 取得this(由a.addEventListener傳入，所以會是該a)的資訊
  const linkCoords = this.getBoundingClientRect();
  // 建立一個coords物件來存放會使用的寬高與定位資訊
  const cords = {
    width: linkCoords.width,
    height: linkCoords.height,
    left: linkCoords.left + window.scrollX,
    top: linkCoords.top + window.scrollY
  }
  // 設定highlight效果的寬高及定位
  highlight.style.width = `${cords.width}px`;
  highlight.style.height = `${cords.height}px`;
  highlight.style.transform = `translate(${cords.left}px, ${cords.top}px`;
}

// 監聽所有a元素的滑鼠移入，觸發highlightLink
triggers.forEach(a => a.addEventListener('mouseenter', highlightLink));
```
位移的效果主要來自已經寫好的css與js裡面重新定位的`translate`
```css
.highlight {
  transition: all 0.2s;
  border-bottom:2px solid white;
  position: absolute;
  top:0;
  background:white;
  left:0;
  z-index: -1;
  border-radius:20px;
  display: block;
  box-shadow: 0 0 10px rgba(0,0,0,0.2)
}
```

## **語法&備註**
### **Element.getBoundingClientRect()**
返回目標元素的大小與相對於瀏覽器視窗的位置資訊
>參閱：[MDN-Element.getBoundingClientRect()](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)