# 31 - Gif Loader

![](https://guahsu.io/2017/11/JavaScript30-30-Whack-A-Mole/demo31.gif)

## **主題**
JavaScript30系列終於完成！！
寫了一個清單頁擺放每一篇的練習概要與截圖，  
這個列表網站也是沒使用任何外部函式庫與框架，  
最後一篇紀錄這個小站中做的靜/動態圖切換、loading效果。

[[BLOG]](https://guahsu.io/2017/11/JavaScript30-Final-Gif-Loader/) | [[DEMO]](https://guahsu.io/JavaScript30/31_Gif-Loader/index-GuaHsu.html)

## 目的
想法很單純，就只是因為gif的檔案較大若網站一次全讀會造成一些延遲，  
但若使用lazyload的方式則是預設情況下gif會一直自己動造成畫面的混亂，  
所以想設計成當要他動時在動，就像是影片網站的動態預覽一樣，
所以再我能力不足以去切割gif影格的狀態下，最快就是放png/gif來切換了，
而在切換gif後的載入難免會有延遲需要等待，就想做個轉圈圈讓人知道他有在做事XD

開始吧！

### HTML
HTML的結構：
1. photo: 這次要做的整個圖片事件外框
2. photo--hasGif: 標記這裡面有gif可作切換用，若不用切換則不用給這個class
3. photo__load: 載入動畫用
4. photo__img: 圖片本體
  
```html
<div class="photo photo--hasGif">
  <div class="photo__load"></div>
  <img class="photo__img" src="https://guahsu.io/2017/05/JavaScript30-01-Java-Script-Drum-Kit/demo1.png">
</div>
```

### CSS
圖片框hover時的浮起效果與讀取轉圈圈特效。
```css
.photo {
  position: relative;  
  display: inline-block; 
  margin: 0px 15px;
  width: 400px;
  background-color: #fafafa;
  /* 加上陰影與transition時間，讓hover時有浮起來的感覺 */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: 0.5s;
}

.photo:hover {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}

.photo__img {
  max-width: 100%;
}

.photo__load {
  display: none;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100px;
  height: 100px;
  /* 
    為了讓載入圖示像是載入圖示再轉的樣子，
    把四個邊的其中一邊(這裡是bottom)設為透明，
    再透過border-radius設成圓型，
  */
  border: 5px solid #fafafa;
  border-bottom: 5px solid transparent;
  border-radius: 100%;
  background-color: transparent;
  /* 使用animation動畫，線性且無限循環 呼叫動畫rotate */
  animation: 1.5s linear infinite rotate;
}

/* 
  旋轉動畫，就是從0度轉到360無限循環
  而裡面的translate是為了讓加載圖示對齊圖片中心，
  也就是常見的left: 50% + translateX(-50%)這種做法，
  但因為有用到animation必須把translate設在keyframes裡面。
*/
@keyframes rotate {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
```

## JavaScript
作圖片副檔名的切換與圖片讀取檢查(轉圈圈判斷)
```javascript
/** 圖片讀取檢查 */
function checkLoad(image) {
  // 取得觸發事件photo中的加載圖示
  var loadIcon = image.parentElement.querySelector('.photo__load');
  setTimeout(function() {
    // 用complete檢查圖片是否已加載完成
    if (image.complete) {
      // 已加載完成就把加載圖示隱藏
      loadIcon.style.display = 'none';
    } else {
      // 未完成就顯示加載圖示並在呼叫自己一次
      loadIcon.style.display = 'block';
      checkLoad(image);
    }
  }, 100);
}

/** 變更圖片類別(滑鼠移入載GIF移出換回PNG) */
function changeImgaeType() {
  // 判斷傳入的photo是否有gif，若沒有就跳出這個function
  if (this.classList.contains('photo--hasGif')) {
    var type = [];
    // 取得觸發事件的photo裡面圖片本體
    var image = this.querySelector('.photo__img');
    // 檢查是否已經轉為gif播放中
    var isPlay = image.classList.contains('photo__img--play');
    // 播放判斷
    if(isPlay) {
      // 如果播放中，就移除播放標記(mouseleave時會觸發)並寫好轉換用的type值
      image.classList.remove('photo__img--play');
      type = ['gif', 'png'];
    }else {
      // 如果未播放，就新增播放標記(mouseenter時會觸發)並寫好轉換用的type值
      image.classList.add('photo__img--play');
      type = ['png', 'gif'];
    }
    // 取得圖片連結(原本的src圖片連結，替換掉副檔名)
    var imageLink = image.getAttribute('src').replace(type[0], type[1]);
    // 設定新的圖片連結到原本的圖片本體中
    image.setAttribute('src', imageLink);
    // 檢查讀取
    checkLoad(image);
  }
}

/*
  因為querySelectorAll取回的不是Array是NodeList並不存在forEach方法，
  所以透過Array.from()把取回的NodeList轉Array，接著再用forEach為每個photo加上滑鼠事件的監聽 
*/
var photos = Array.from(document.querySelectorAll('.photo'));
photos.forEach(photo => {
  photo.addEventListener('mouseenter', changeImgaeType);
  photo.addEventListener('mouseleave', changeImgaeType);
});
```