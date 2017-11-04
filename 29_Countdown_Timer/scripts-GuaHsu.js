const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
let countdown; // 外層變數，供計時器主體使用

/** 計時器 **/
function timer(seconds) {
  // 新的計時器被啟動時，先把原本的setInterval刪除
  clearInterval(countdown);
  // 取得時間
  const now = Date.now();
  const timeStamp = now + seconds * 1000;
  // 倒數計時與結束的時間顯示function
  displayTimeLeft(seconds);
  displayEndTime(timeStamp);
  // 計時器執行在countdown裡面方便接著清除使用
  countdown = setInterval(() => {
    // 取得要跑的總時長
    const secondsLeft = Math.round((timeStamp - Date.now()) / 1000);
    // 如果時間已經小於零，結束這個Interval
    if(secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    // 更新時間
    displayTimeLeft(secondsLeft);
  }, 1000);

}

// 顯示倒數時間
function displayTimeLeft(seconds) {
  // 透過Math.floor來取得分鐘數(傳入秒數/60取得最大整數)
  const minutes = Math.floor(seconds /60);
  // 用％來取得傳入秒數除60的餘數（扣除分鐘數後的秒數）
  const remainderSeconds = seconds % 60;
  console.log({minutes, remainderSeconds});
  // 顯示秒數的部分若小於0數字前補0
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  // 顯示對應時間
  document.title = display;
  timerDisplay.textContent = display;
}

// 顯示結束時間
function displayEndTime(timestamp) {
  // 用傳入的timestamp在取得date資訊
  const end = new Date(timestamp);
  // 從date取得小時數
  const hour = end.getHours();
  // 轉12小時制
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  // 從date取得分鐘數
  const minutes = end.getMinutes();
  // 顯示結束時間，與上方一樣，若分鐘數小於10，則前面補0
  endTime.textContent = `Be Back At ${hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

// 開始計時（HTML畫面設定好的時間）
function startTimer() {
  // 取得html中設定的data-time（秒數）
  const seconds = parseInt(this.dataset.time);
  // 傳入計時器function
  timer(seconds);
}

// 替每個時間按鈕加上監聽click事件，用來啟動計時function
buttons.forEach(button => button.addEventListener('click', startTimer));

// HTML中的input自訂倒數時間輸入欄位監聽
document.customForm.addEventListener('submit', function(e) {
  // 因為用form，submit後避免跳頁使用preventDefault()來阻止預設事件
  e.preventDefault();
  // 取得input欄位的值
  const mins = this.minutes.value;
  // 傳入計時器
  timer(mins * 60);
  // 清空input
  this.reset();
})