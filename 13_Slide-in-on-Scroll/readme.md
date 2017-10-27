# 13 - Slide in on Scroll
>首次上傳：2017/08/06

![](https://guahsu.io/2017/08/JavaScript30-13-Slide-in-on-Scroll/demo13.gif)

## **主題**
這篇介紹當滾動視窗到定點時動畫滑入圖片的效果，  
而我在這裡替圖片增加了簡易的lazy load效果。

[[BLOG]](https://guahsu.io/2017/07/JavaScript30-13-Slide-in-on-Scroll/)  
[[DEMO]](https://guahsu.io/JavaScript30/13_Slide-in-on-Scroll/index-GuaHsu.html)

## **步驟**
### Step1. 基礎設定
作者已經在所有的圖片中加入了待會會用到的class : 
1. align-right / align-left : 滑入效果用（左/右）
2. slide-in : JavaScript抓取用
並已經將相關的動畫滑入效果寫好。

### Step2. 建立觸發條件,並監聽滾動事件
目的是使滾動視窗到定點時顯示效果，  
所以要監聽的是整個視窗，用`window`，事件選用`scroll`，  
但是如果單純使用`scroll`來操作的話，每次的畫面滾動都會有大量事件被觸發，  
會對效能上造成影響，所以作者多寫了一個`debounce`來使觸發間隔為20毫秒以上：
````javascript
function debounce(func, wait = 20, immediate = true) {
    var timeout;
    return function () {
    var context = this, args = arguments;
    var later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
    };
}
````
所以監聽事件就會寫成`window.addEventListener('scroll', debounce(checkSlide));`。  

### Step3. 設定觸發後的事件內容
在一開始先取得所有`.slide-in`的圖片元素，使用`querySelectorAll`，
````javascript
const sliderImages = document.querySelectorAll('.slide-in');
````
接著編寫每次`scroll`處發的`checkSlide` function:
````javascript
function checkSlide() {
    sliderImages.forEach(sliderImage => {
        // 取得圖片1/2高度的定位點（卷軸垂直位移量＋視窗高度）- 1/2圖片高度
        const slideInAt = (window.scrollY + window.innerHeight) - (sliderImage.height / 2);
        // 取得圖片底部定位點（利用圖片頂部定位點+圖片高度取得）
        const imageBottom = sliderImage.offsetTop + sliderImage.height;
        // 判斷視窗是否已經超過圖片高度一半
        const isHalfShown = slideInAt > sliderImage.offsetTop;
        // 判斷滾動範圍是否已經超過圖片底部（卷軸垂直位移量）
        const isNotScrolledPast = window.scrollY < imageBottom;
        // 判斷是否超過圖片一半高，且視窗尚未超過圖片底部來增加或移除css效果
        if (isHalfShown && isNotScrolledPast) {
          sliderImage.classList.add('active');
        } else {
          sliderImage.classList.remove('active');
        }
    });
}
````

## **探索**
學會了抓取視窗高度並當滾動至對應位置時載入/移除動畫效果，  
就想來試試看增加一個功能，當到對應位置時，才去做圖片的載入及動畫效果，  
就是`lazyload`的很簡易版應用，套用在這個練習上。

首先先把每個圖片改為用`data-imglink`來放圖片連結，像是這樣
````html
<img src="" data-imglink="http://unsplash.it/400/401" class="align-right slide-in">
````

接著來修改觸發的事件內容，因為原本的寫法只要重新讀到圖片1/2位置就會觸發，
我要做的只要第一次觸發效果就好，且是在讀取圖片頂端時觸發，
所以修改如下，新增的用備註註明：
````javascript
function checkSlide(e) {
    sliderImages.forEach(sliderImage => {
    // 取得圖片的定位點
    const slideInAt = (window.scrollY + window.innerHeight) - (sliderImage.height);
    // 判斷是否滾動到圖片的頂端
    const isImgTop = slideInAt > sliderImage.offsetTop;
    
    if (isImgTop) {
        // 透過dataset取得html裡面的data-imglink連結
        const imageLink = sliderImage.dataset.imglink;
        // 用setAttribute來設置取得的連結
        sliderImage.setAttribute('src', imageLink);
        // 增加一個事件，當圖片載入完成後套用css的動畫效果
        sliderImage.addEventListener('load', () => {
            sliderImage.classList.add('active');
        });
    }
    })
}
````

## **JavaScript語法備註**
**Window.scrollY**
目前瀏覽器視窗已滾動的Y軸（垂直位置）
>參閱：[MDN-Window.scrollY](https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY)

**Window.innerHeight**
目前瀏覽器視窗的高度
>參閱：[MDN-Window.innerHeight](https://developer.mozilla.org/en-US/docs/Web/API/Window/innerHeight)

**HTMLElement.offsetTop**
返回指定元素相對於有父元素`(offsetParent)`中的頂端位置，  
以此練習來說，`sliderImage`的父元素就是`window`。
>參閱：[MDN-Window.innerHeight](https://developer.mozilla.org/en-US/docs/Web/API/Window/innerHeight)

**HTMLElement.dataset**
透過`dataset`可以取回在HTML中設置的`data-*`內容，  
注意使用`dataset`時property不用再將加上`data-`開頭，例如：    
````html
<div class="test" data-greet="hi"></div>
````
````javascript
document.querySelector('.test').dataset.greet; // hi
````
>參閱：[MDN-HTMLElement.dataset](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dataset)