# **02 - JS and CSS Clock**
>首次上傳：2017/05/17  

![](https://guahsu.io/2017/05/JavaScript30-02-JS-and-CSS-Clock/demo2.png)

## **主題**
用JS與CSS搭配製作一個實時的時鐘效果。  
[[BLOG]](https://guahsu.io/2017/05/JavaScript30-02-JS-and-CSS-Clock/)  
[[DEMO]](https://guahsu.io/JavaScript30/02_JS-and-CSS-Clock/index-GuaHsu.html)  

## **步驟**
#### Step1. 製作時針、分針、秒針  
利用class`hand`樣式來表現出時分秒針的樣式  
#### Step2. 設定定時器
利用` setInterval(setDate, 1000);`每秒取得當前時間
#### Step3. 利用當前時間來取得對應角度
將每秒取得的時間在`setData`裡面取出，並計算出對應角度  
再透過`element.style.tranform`來變更CSS效果，產生位移的感覺。

## **Javascript語法&備註**
### **let & const**
對於ES6新增的區域變數宣告與常數宣告  
我知道的是const需要的是一開始就指定值，且不可再被指定  
但在之前的經驗裡，function內我還是會放let來做變數的宣告，  
實際上若該值不會再被變動，應該是用const做宣告比較好的。

### **Date()**
取得時間的函數，一定要搭配new來使用`new Date()`  
`date.getSeconds()`：取得當前秒  
`date.getMinutes()`：取得當前分鐘  
`date.getHours()`：取得當前小時  

### **setInterval()**
定時器，有兩個參數`setInterval(callback, time)`  
第一個是要執行的function，第二個是時間(毫秒)


## **CSS語法&備註**
### **transform-origin**
變形的軸心，預設為物件的中心點，  
在這個範例中，設定為100%(right)可以使其從時鐘面的中心點開始旋轉。

### **transform:rotate()**
旋轉物件，數值後方要加上角度`deg`，  
可超過360度，正值為順時針轉，負值為逆時針旋轉。

### **transition-timing-function: cubic-bezier()**
設定動畫轉場所依據的貝茲曲線，可以透過chrome的開發者工具來進行可視化調整。

>參閱：[MDN-transform](https://developer.mozilla.org/en-US/docs/Web/CSS/transform?v=control)

## 探索
### 轉了個角度，調了點指針
為了要讓指針從12點方向(0點)開始計算，  
作者將指針`.hand`都加上了rotate(90deg)來轉，  
並在計算時間的function內最終結果也都+90，  
我是改成到clock-face直接將整個區塊轉90度，  
這樣在計算時就不用+90，可以用最大360來做計算了。

另外也把時分秒針調整粗細度．．就這樣ＸＤ

### transform:rotate的彈跳問題 
作者最後有提到一個小問題，若指針在354度切到0度時，  
會使指針往前彈回去，這是因為有使用transtion，在角度做切換時會加上的動畫效果，  
354→0度會認為是往前，而非轉一圈回到起點，所以動畫先往前轉到0。  
為了避免這個反彈的怪現象，我加上了一個function來處理角度
````javascript
function setRotate(deg) {
if (deg === 0) {
     document.querySelector('.hand').style.transition = 'all 0s';
} else {
     document.querySelector('.hand').style.transition = 'all 0.05s';
}
return `rotate(${deg}deg)`;
}
````
當計算角度為0時，把動畫效果關閉，這樣就可以避免了！
