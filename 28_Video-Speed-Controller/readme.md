# 28 - Video Speed Controller

![](https://guahsu.io/2017/10/JavaScript30-28-Video-Speed-Controller/demo28.png)

## **主題**
製作一個可控制影片速率的拉把。

[[BLOG]](https://guahsu.io/2017/10/JavaScript30-28-Video-Speed-Controller) | [[DEMO]](https://guahsu.io/JavaScript30/28_Video-Speed-Controller/index-GuaHsu.html)

這個練習可以算是延續[「JS30紀錄＆心得」11 - Custom Video Player](https://guahsu.io/2017/07/JavaScript30-11-Custom-Video-Player/)的操作，  
主要是把原本`input range`改成`div`的滑鼠事件監聽。


## **步驟**
### Step1. 取得頁面元素
```javascript
const speed = document.querySelector('.speed');
const bar = speed.querySelector('.speed-bar');
const video = document.querySelector('.flex');
```

### Step2. 建立滑鼠移動監聽與事件
```javascript
/** 滑鼠移動事件 **/
function handleMove (e) {
  // 取得觸發點位置（滑鼠位於整頁頂端的Y軸定位-speed框到整頁頂端的距離）
  const y = e.pageY - this.offsetTop;
  // 設定百分比(y / speed框的高度)
  const percent = y / this.offsetHeight;
  const min = 0.4;
  const max = 4;
  // 用Math.round來計算取得四捨五入的百分比值
  const height = Math.round(percent * 100) + '%';
  // 取得播放速率(0.4一跳，最多4倍速)
  const playbackRate = percent * (max - min) + min;
  // 調整speed-bar的樣式高度
  bar.style.height = height;
  // 用toFixed(2)來設定最多取得小數點後兩位，顯示於speed-bar上
  bar.textContent = playbackRate.toFixed(2) + 'x';
  // 控制影片的速率
  video.playbackRate = playbackRate;
}
```
