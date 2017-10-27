# **05 - Flex Panel Gallery**
>首次上傳：2017/05/20  

![](https://guahsu.io/2017/05/JavaScript30-05-Flex-Panel-Gallery/demo5.png)

## **主題**
用CSS與JS來製作一個點擊後會動畫展開的圖片展示效果，  
運用到了CSS的flex、transform、transition.. 這篇比較偏向css知識！  
[[BLOG]](https://guahsu.io/2017/05/JavaScript30-05-Flex-Panel-Gallery/)  
[[DEMO]](https://guahsu.io/JavaScript30//05_Flex-Panel-Gallery/index-GuaHsu.html)  

## **步驟**
#### Step1
由於整體HTML的tag是由1個`panels`包覆5個`panel`，  
為了使其設定為flex，先在外層容器`panels`加上`display: flex`  
接著為每個`panel`加上`flex: 1`來使各子元件最大占比為1  
也就會變成同容器中的5個元件都設1，那就是每個元件最大占比為20%。  
(因對flex並不熟悉，我是用占比來理解，若有錯請在指正..感謝@@)

#### Step2
在為`panel`加上`justify-content: center`使其水平置中，  
並在加上了`display: flex`及`flex-direction: column`，  
再加上一層`display: flex`可以使`panel`底下的元件也變成flex控管

#### Step3
對panel底下的`first-child`及`last-child`做位移效果，  
使其能在預設狀態於可視範圍外，並設計`open-active`  
當觸發時，配合`transition`產生移回原位的動畫，  
也在`.panel.open`中新增了`flex: 5`使其觸發時會有展開的動畫。 

#### Step4
編寫JS先取得所有panel的節點，  
接著設計toggle function使執行的物件藉由`.classList.toggle`來新增/移除動畫class  
並透過addEventListener來監測當`click`&`transitionend`時觸發toggle function。  
>`.classList`&`transitionend `&`toggle`在>[第一篇](https://github.com/guahsu/JavaScript30/tree/master/01_Java-Script-Drum-Kit)<剛好有提到。

## **Javascript語法&備註**
### **e.propertyName & includes()**
在範例中，觸發動畫效果的順序為：
1. `click`其中一張圖(panel)觸發`addEventLinstner`中的`toggleOpen`
2. 為其增加`.open`，增加`Flex: 5`的效果，同時也是使用了`.panel`中的`transition: flex`這段
3. 當`.open`的`transition`結束時，觸發了`transitionend`來作動`toggleActive`
4. 為其增加`.open-active`效果，讓原本可是範圍外的`p`文字滑入

在`順序:4`時有個判斷，
````javascript
function toggleActive(e) {
    if (e.propertyName.includes('flex')) {
        this.classList.toggle('open-active');
    }
}
````
e.propertyName可以抓到觸發`transitionend`的屬性名稱，  
而`.open`中觸發的`transition`屬性有兩個，分別為`font`與`flex`    
要使其在`flex`之後在觸發的話，就要判斷進來的是不是`flex`   
但因為`transition: flex 0.7s..`這段在sarafi是`flex`，而其他瀏覽器為`flex-grow`  
所以不能用`e.property === 'flex'`來寫，會使其中一方瀏覽器抓不到值，  
作者提到因為兩者都有flex的字眼，所以利用`.includes('flex')來判斷，  
只要`e.property`有包含到flex的字串就使其通過判斷，加入動畫效果。
>參閱:[MDN-String.prototype.includes()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes)

## **CSS語法&備註**
### **flex**
flex我目前還不熟，他還在我的待讀清單中XD
僅依據目前這篇使用到的做筆記：
#### display: flex
把該容器設定為flex模式，可以在其他flex中設定(角色為子元素時)
#### flex: flex-grow flex-shrink flex-basis
flex的簡寫，第一個為占比、第二個為壓縮值、第三個為默認尺寸
#### flex-direction
flex排列的方向，`colume`(垂直向)或`row`(水平向)，預設為`row`
>行與列的中文用法，我自己有點混淆
像是我會說`第314行要加個分號喔`，也會說`工具列上第3個icon`
兩者都是在描述水平向，但我卻用了不同的字去形容囧
#### justify-content & align-items
依據flex-direction設定的主/側軸來決定排列方式，
例如設定`flex-direction: row`那麼
`justify-content: center`就指水平置中，
而`align-items: center`代表垂直置中。
>參閱：[MDN-CSS Flexible Box Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout)

### **:first-child() & :last-child()**
CSS的`:偽類別`，分別可以選取first(第一個)/last(最後一個)子元素，  
在範例的panel中，除了主圖的大字外，上下各有一個`p`包含了點擊後進場的動畫文字：
````html
<div class="panel panel1">
<p>Hey</p>
<p>Let's</p>
<p>Dance</p>
</div>
````
透過`panel > *:first-child`選取`Hey`
透過`panel > *:last-child`選取`Dance`

## **探索**
當展開其中一個時，在點其他的`panel`並不會關閉第一個已展開的效果，  
若要達到每次點擊都是一個聚焦效果(關閉其他已展開的)的感覺得話，  
我是這麼做的：
````javascript
//宣告一個上次點擊的Panel，預設先給他panels
let lastClickPanel = document.querySelector('.panels');

function toggleOpen() {
    //每次檢查進入的element與上次進入的element是不是相同
    //若不相同，則把上次點擊的element移除opev效果
    //再把lastClickPanel指向為這次的elment
    if (this !== lastClickPanel) {
        lastClickPanel.classList.remove('open');
        lastClickPanel = this;
    }
this.classList.toggle('open');
}
````




