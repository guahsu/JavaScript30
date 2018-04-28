# 19 - Webcam Fun

## **主題**
利用`navigator.mediaDevices.getUserMedia`來取得視訊鏡頭影像，並透過`cavas`來達到拍照與濾鏡的效果。

[[BLOG]](https://guahsu.io/2017/10/JavaScript30-19-Webcam-Fun)    
[DEMO] -> 安全性問題無法檢視，請在本機執行  

## **步驟**
### Step1. 啟動Local Server
這個練習需要使用到local server，  
如果你已經有一個可在本機run起來的server可以直接使用，  
或在這層資料夾底下運行`npm install`來安裝`browser-sync`，  
安裝完成後可以透過指令`npm start`來啟動localserver(預設port3000)，  
>npm指令需要下載node.js來使用

### Step2. 取得影像
透過`navigator.mediaDevices.getUserMedia`來取得視訊影像
```javascript
function getVideo() {
  // 取得user的視訊裝置，回傳Promise狀態
  navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false
    })
    // 如果允許則把回傳的MediaStream寫進html的video tag中並播放
    .then(localMediaStream => {
      /* console.log(localMediaStream); */
      video.src = window.URL.createObjectURL(localMediaStream);
      video.play();
    })
    // 當失敗時印出錯誤結果
    .catch(err => {
      console.error(`ERROR: `, err);
    })
}
```
>參閱：[MDN-MediaDevices.getUserMedia()](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)

### Step3. 取得視訊資料並輸出在cavas區塊中
```javascript
function paintToCanavas() {
  // 設置寬高
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;
  // 用setInterval來持續取得目前的影像資訊
  return setInterval(() => {
    // 在canvas中設置內容來源與video相同，並且X、Ｙ軸及長寬與video相同
    ctx.drawImage(video, 0, 0, width, height);
  }, 16)
}
```
>參閱：[MDN-CanvasRenderingContext2D.drawImage()](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage)

### Step4. 製作拍照功能！
```javascript
function takePhoto() {
  // 拍照的音效->把音效切到第0秒並播放
  snap.currentTime = 0;
  snap.play();
  // 利用toDataURL把canvas的內容轉為base64的圖檔資訊
  const data = canvas.toDataURL('image/jpeg');
  // 用createElemamnt來建立一個新的a元素
  const link = document.createElement('a');
  // 設置連結位置為轉圖檔後的base64位置
  link.href = data;
  // 設置連結為下載
  link.setAttribute('download', 'photo');
  // 內部新增一個預覽圖
  link.innerHTML = `<img src="${data}" alt="photo" />`;
  // 在圖片區塞入新圖片（在第一筆的位置）
  strip.insertBefore(link, strip.firstChild);
}
```
>參閱：[MDN-HTMLCanvasElement.toDataURL()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL)
>參閱：[MDN-Node.insert Before()](https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore)

### Step5. 濾鏡效果（紅色）
再回到Step3的`paintToCanavas()`中新增：
```javascript
function paintToCanavas() {
  // ...略
  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    // 透過getImageData取得當前canvans中所有的像素點(r,g,b,alpha的資訊)
    let pixels = ctx.getImageData(0, 0, width, height);
    // 製作效果
    pixels = redEffect(pixels); // 紅色濾鏡效果
    // 置入效果
    ctx.putImageData(pixels, 0, 0);
  }, 16)
}
```
並新增一個對應的濾鏡function`redEffect()`
```javascript
function redEffect(pixels) {
  // 透過迴圈將取回的所有像素資料跑一次，i +=4 是因為四個一組(r,g,b,alpha）
  for (let i = 0; i < pixels.data.length; i += 4) {
    // 下面組合就是單純把R(紅色)增強達到紅色濾鏡的效果
    pixels.data[i + 0] = pixels.data[i + 0] + 100;
    pixels.data[i + 1] = pixels.data[i + 1] - 50;
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5;
  }
  return pixels;
}
```
>參閱：[MDN-CanvasRenderingContext2D.getImageData()](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData)
>參閱:[MDN-putImageData()](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/putImageData)

### 其他
另外還有色彩分離與綠幕的濾鏡效果，  
基本上程式操作邏輯同Step5的紅色濾鏡效果，  
不過色彩的偏移設定我沒什麼顏色概念可以做說明..  
所以只能用紅色濾鏡作為說明><..