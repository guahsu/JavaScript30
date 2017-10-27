# **06 - Type Ahead**
>首次上傳：2017/05/22  

![](https://guahsu.io/2017/05/JavaScript30-06-Type-Ahead/demo6.png)

## **主題**
利用`fetch()`來取回json檔案，並透過`filter()`及`RegExp()`等語法來製作搜尋即時顯示關聯效果！  
[[BLOG]](https://guahsu.io/2017/05/JavaScript30-06-Type-Ahead/)  
[[DEMO]](https://guahsu.io/JavaScript30/06_Type-Ahead/index-GuaHsu.html) 
 
## **步驟**
#### Step1
預設已經有建立了一個城市的.json清單，  
先建立一個空的陣列`cities`並透過fetch來取得json資料存進去。

#### Step2
建立`function findMatches(wordToMatch, cities)`  
裡面建立了一個`RegExp`用於match來進行字串比對

#### Step3
建立`displayMatches()`並用`addEventListener`來監測輸入框的`change`&`keyup`，  
每次鍵盤輸入時都會觸發`displeyMatches()`來處理比對，  
將比對結果用map來return 組合的HTML的`<li>`資料，  

## **Javascript語法&備註**
### **fetch()**
操作心得待補...
>我原先只用過XMLHttpRequest來取資料，關於promise及fetch的操作目前並不熟悉。  
>參閱：[MDN-fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

### **RegExp()**
正規表達式，這個真的非常複雜...  
我有做紀錄的就是參數後面`g`代表全部, `i`代表不分大小寫..
>參閱:[MDN-RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)

#### **.join()**
將陣列資料用參數內的字串連接轉為一個字串，  
範例中上了`join('')`來避免map回傳的陣列有`,`產生。

## **CSS語法&備註**
### **nth-child()**
範例中利用`nth-child(odd)`與`nth-child(even)`來抓li的奇偶數
>參閱：[MDN-:nth-child](https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child)

## **探索**
### 加個排序
最簡單的小調整，加個`.sort()`讓搜尋結果進行排序顯示
````javascript
function displayMatches() {
    const matchArray = findMatches(this.value, cities);
    const html = matchArray.map(place => {
    const regex = new RegExp(this.value, 'gi');
    const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
    const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
    return `<li>
                <span class="name">${cityName}, ${stateName}</span>
                <span class="population">${numberWithCommas(place.population)}</span>
            </li>`;
    }).sort().join('');
    suggestions.innerHTML = html;
}
````

