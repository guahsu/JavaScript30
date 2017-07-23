const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const fullScreenBtn = player.querySelector('.fullScreen');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

//點擊切換播放/暫停（視窗、播放鈕）
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  const icon = video.paused ? `<i class="icon-play"></i>` : `<i class="icon-pause"></i>`;
  toggle.innerHTML = icon;
  video[method]();
}

//音量、速率操作
function handleRangeUpadte() {
  video[this.name] = this.value;
}

//快進、快退操作
function skip(direction) {
  let skipTime = 0;
  if (direction === 'left') {
    skipTime = document.querySelector('.skip_left').dataset.skip;
  } else if (direction === 'right') {
    skipTime = document.querySelector('.skip_right').dataset.skip;
  } else {
    skipTime = this.dataset.skip;
  }
  video.currentTime += parseFloat(skipTime);
}

//進度條顯示
function handleProgress() {
  const precent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${precent}%`;
}

//進度條操作（點擊、拖曳）
let mousedown = false;
function scrunb(e) {
  const mouseType = e.type;
  if (mouseType === 'mousedown') { mousedown = true; }
  if (mouseType === 'mouseup') { mousedown = false; }
  if (mouseType === 'click' || mouseType === 'mousemove' && mousedown) {
    const scrunbTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrunbTime
  }
}

//全螢幕
function fullScreen() {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.msRequestFullscreen) {
    video.msRequestFullscreen();
  } else if (video.mozRequestFullScreen) {
    video.mozRequestFullScreen();
  } else if (video.webkitRequestFullscreen) {
    video.webkitRequestFullscreen();
  }
}

//鍵盤動作
function eventKeydown(e) {
  switch (e.keyCode) {
    //空白鍵
    case 32:
      e.preventDefault()
      togglePlay();
      break;
    //方向鍵左
    case 37:
      skip('left');
      break;
    //方向鍵右
    case 39:
      skip('right')
      break;
  }
}

/* Hook up the event listners */
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);

ranges.forEach(range => {
  range.addEventListener('change', handleRangeUpadte);
  range.addEventListener('mousemove', handleRangeUpadte);
})

skipButtons.forEach(button => {
  button.addEventListener('click', skip);
})

video.addEventListener('progress', handleProgress);

const progressEvents = ['click', 'mousemove', 'mousedown', 'mouseup'];
progressEvents.forEach(progressEvent => {
  progress.addEventListener(progressEvent, scrunb);
})

fullScreenBtn.addEventListener('click', fullScreen);

document.addEventListener('keydown', eventKeydown);