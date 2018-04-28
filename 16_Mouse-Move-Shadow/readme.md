# 16 - Mouse Move Shadow
>首次上傳：2017/10/02

## **主題**
透過textShadow讓文字的陰影隨滑鼠位置偏移，  
並稍微帶到ES6的解構賦值的用法。  
[[BLOG]](https://guahsu.io/2017/10/JavaScript30-16-Mouse-Move-Shadow/)  
[[DEMO]](http://guahsu.io/JavaScript30/16_Mouse-Move-Shadow/index-GuaHsu.html)  

## **步驟**
### Step1. 設定目標區域與基本偏移量
1. 抓取HTML中的`hero`與`text`做為目標區域
2. 設定基本偏移基準`walk = 100`

### Step2. 建立觸發條件與事件
1. 設定`hero.addEventListener('mousemove', shadow)`
2. 觸發事件備註：
```javascript
function shadow(e) {
  // 透過解構賦值取得並設定資訊
  const { offsetHeight: height,
          offsetWidth: width } = hero;
  let { offsetX: x,
        offsetY: y  } = e;
  // 如果在目標區域外，則在加上目標座標值
  if (this !== e.target) {
    x = x + e.target.offsetLeft;
    y = y + e.target.offsetTop;
  }
  // 四捨五入最終偏移值
  const xWalk = Math.round((x / width * walk) - (walk/2));
  const yWalk = Math.round((y / height * walk) - (walk/2));
  console.log(xWalk, yWalk);
  // 使用textShadow來設定文字陰影
  text.style.textShadow = `
    ${xWalk}px ${yWalk}px 0px rgba(0, 0, 0, 0.5),
    ${xWalk * -1}px ${yWalk}px 0px rgba(0, 0, 0, 0.5),
    ${yWalk}px ${xWalk * -1}px 0px rgba(0, 0, 0, 0.5),
    ${yWalk * -1}px ${xWalk}px 0px rgba(0, 0, 0, 0.5)
    `
}
```

## **Javascript語法&備註**
**解構賦值(Destructuring assignment)**
透過解構賦值，可以把直接把物件/陣列中的值塞入變數中，  
擷取一小段程式碼做說明：
```javascript
// 下面這段等同於 const height = hero.offsetHeight;
const { offsetHeight: height } = hero;
// 下面這段等同於 let x = e.offsetX;
let { offsetX: x } = e;
```
>參閱:[MDN-Destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
關於解構賦值對我來說目前還是需要很用力的去閱讀才能讀懂，  
雖然可以簡寫並縮短不少程式碼，但使用上滿不直覺的，  
所以我自己目前還是會用舊的賦值寫法多，努力中。

**Math.round**
可以將內容的數值進行四捨五入的動作。
>參閱:[MDN-Math.round()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round)

## **CSS語法備註**
```css
/* offset-x | offset-y | blur-radius | color */
text-shadow: 1px 1px 2px black;
```
>參閱:[MDN-text-shadow](https://developer.mozilla.org/en-US/docs/Web/CSS/text-shadow)



