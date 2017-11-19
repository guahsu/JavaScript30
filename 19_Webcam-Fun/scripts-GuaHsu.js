const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

// 取得影片
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

// 取得視訊資料並輸出在cavas中
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
    // 取得pixels
    let pixels = ctx.getImageData(0, 0, width, height);
    // 製作效果
    // pixels = redEffect(pixels); // 紅色濾鏡效果
    // pixels = rgbSplit(pixels); // 色彩分離
     pixels = greenScreen(pixels); // 綠幕
    // 置入效果
    ctx.putImageData(pixels, 0, 0);
    //debugger;
  }, 16)
}

/** 拍照功能 */
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

/** 紅色濾鏡效果 */
function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 100;
    pixels.data[i + 1] = pixels.data[i + 1] - 50;
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5;
  }
  return pixels;
}

/** 色彩分離效果 */
function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 150] = pixels.data[i + 0];
    pixels.data[i + 500] = pixels.data[i + 1];
    pixels.data[i - 550] = pixels.data[i + 2];
  }
  return pixels;
}

/** 綠幕效果 */
function greenScreen(pixels) {
  const levels = {};

  document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value;
  });

  for (i = 0; i < pixels.data.length; i = i + 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    if (red >= levels.rmin &&
      green >= levels.gmin &&
      blue >= levels.bmin &&
      red <= levels.rmax &&
      green <= levels.gmax &&
      blue <= levels.bmax) {
      // take it out!
      pixels.data[i + 3] = 0;
    }
  }

  return pixels;
}

// 執行
getVideo();
// 可以播放時
video.addEventListener('canplay', paintToCanavas);