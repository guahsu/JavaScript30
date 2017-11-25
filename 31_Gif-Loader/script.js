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