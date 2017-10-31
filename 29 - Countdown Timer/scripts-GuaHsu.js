const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
let countdown; // 計時器

/** 
 * 計時器 
 * seconds：秒數
*/
function timer(seconds) {
  // 新的計時器被啟動時，先把原本的setInterval刪除
  clearInterval(countdown);
  // 取得時間
  const now = Date.now();
  const timeStamp = now + seconds * 1000;
  // 開始與結束的時間顯示function
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

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds /60);
  const remainderSeconds = seconds % 60;
  console.log({minutes, remainderSeconds});
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  document.title = display;
  timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  const minutes = end.getMinutes();
  endTime.textContent = `Be Back At ${hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));

document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  timer(mins * 60);
  this.reset();
})