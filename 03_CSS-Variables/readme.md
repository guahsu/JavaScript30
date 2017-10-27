# **03 - CSS Variables**
>首次上傳：2017/05/18  

![](https://guahsu.io/2017/05/JavaScript30-03-CSS-Variables/demo3.png)

## **主題**
用JS與CSS搭配製作一個即時的濾淨效果，
特效為調整內距、模糊、邊框色。  
[[BLOG]](https://guahsu.io/2017/05/JavaScript30-03-CSS-Variables/)  
[[DEMO]](https://guahsu.github.io/JavaScript30/03_CSS-Variables/index-GuaHsu.html)  

## **步驟**
#### Step1
利用CSS variable來定義CSS的變數(有點像sass的感覺)
#### Step2
利用addEventLinstener來綁HTML的控制桿，  
並更新值到CSS變數中來達到即時調整的效果。

## **Javascript語法&備註**
### **dataset**
用`dataset`可以取出對象的`data-*`屬性，也等同於`getAttribute`
````javascript
<div id="test" data-no="123"></div>
document.querySelector('#test').dataset.no // 輸出123
document.querySelector('#test ').getAttribute('data-no'); // 輸出123
````
### **style.setProperty()**
等同於style.cssPropertyName
````javascript
style.setProperty('padding', '15px');
/* 等同於 */
style.padding = '15px';
````
但在實際應用中，前者的做法會很方便帶參數進去。
>參照:[MDN-setProperty](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/setProperty)

## **CSS語法&備註**
### **filter:blur()**
CSS3的濾鏡功能，blur是高斯模糊，參數越高越模糊。
>參照:[MDN-filter](https://developer.mozilla.org/en-US/docs/Web/CSS/filter)

## 探索
依樣畫葫蘆的新增了`grayscale()`的效果，  
在CSS中要使用兩個以上的濾鏡效果寫再一起就好，  
如果分開來的話會變成覆蓋：
````css
/* 這樣會變成覆蓋，剩下garyscale的效果 */
img {
    filter: blur(10px);
    filter: grayscale(10%);
}
/* 寫在同一處，才能吃到兩個效果 */
img {
    filter: blur(10px) grayscale(10%);
}
````