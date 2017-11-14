# 30 - Whack A Mole

![](https://guahsu.io/2017/11/JavaScript30-30-Whack-A-Mole/demo30.gif)

## **主題**
JS30的最終篇啦！這次要來做一個打地鼠的小遊戲:D

[[BLOG]](https://guahsu.io/2017/11/JavaScript30-30-Whack-A-Mole/) | [[DEMO]](https://guahsu.io/JavaScript30/30_Whack-A-Mole/index-GuaHsu.html)


## **步驟**
### Step1. 取得頁面元素並設定預設變數
```javascript
/**  取得頁面元素 */
const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');

/** 預設變數設定 */
let lastHole; // 最後一次出現的地鼠洞
let timeUP = false; // 遊戲時間是否結束戳記
let score = 0; // 分數
```

### Step2. 亂數決定地鼠出現後存在的時間&地鼠出現的洞
```javascript
/** 地鼠出現後存在時間，傳入最小&最大值，回傳一個區間亂數 */
function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

/** 地鼠出現的洞 */
function randomHole(holes) {
  // 取得地鼠洞數量區間內隨機一個洞
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  // 避免骰到相同的
  if (hole === lastHole) {
    return randomHole(holes);
  }
  // 紀錄最後一個出現的地鼠洞
  lastHole = hole;
  return hole;
}
```

### Step3. 地鼠出現的主程式
```javascript
/**  地鼠出現 */
function peep() {
  // 取得存在時間
  const time = randomTime(300, 1000);
  // 取得出現的洞
  const hole = randomHole(holes);
  // 移除已槌標記
  hole.querySelector('.mole').classList.remove('bonked');
  // 增加出現的動畫class
  hole.classList.add('up');
  // 設定存在時間到的時候移除出現動畫，且若遊戲時間未結束就繼續跑下一run
  setTimeout(() => {
    hole.classList.remove('up');
    if (!timeUP) peep();
  }, time)
}
```

### Step4. 打地鼠
```javascript
/** 打地鼠 */
function bonk(e) {
  // isTrusted防止腳本操作，class有bonked代表已被搥過，若符合上述兩者則不進行
  if(!e.isTrusted || this.classList.contains('bonked')) return;
  // 替被打到的地鼠加上bonked的樣式避免連續點擊得分
  this.classList.add('bonked'); 
  // 打到就移除出現的動畫
  this.classList.remove('up');
  // 加分
  score++;
  // 更新顯示分數
  scoreBoard.textContent = score;
}
```

### Step5. 開始遊戲設定，並綁定打地鼠動作到每個地鼠身上
```javascript
/** 開始遊戲 */
function startGame() {
  // 時間重置
  timeUP = false;
  // 分數歸零
  scoreBoard.textContent = 0;
  score = 0;
  // 執行地鼠出現函式
  peep();
  // 設定十秒後把時間押為結束
  setTimeout(() => timeUP = true, 10000);
}

// 替每個地鼠加上click事件綁定bonk（打地鼠）
moles.forEach(mole => mole.addEventListener('click', bonk));
```

## 程式備註
** Event.isTrusted **
可以透過此屬性來判斷事件物件是否由使用者操作來產生，而非透過程式觸發的操作。
>參閱：[MDN-Event.isTrusted](https://developer.mozilla.org/en-US/docs/Web/API/Event/isTrusted)

## 探索
寫在上面了，原本可以連續點擊得分，加上個class做標記來防止連續點擊得分:D

## 其他
終於把這系列練習完了！接著這週找時間整理全系列文章在丟回作者的github連結內:D!!