# 17 - Sort Without Articles
>首次上傳：2017/10/04

## **主題**
介紹如何將陣列在排除部分文字的情況下排序。

[[BLOG]](https://guahsu.io/2017/10/JavaScript30-17-Sort-Without-Articles/)  
[[DEMO]](http://guahsu.io/JavaScript30/17_Sort-Without-Articles/index-GuaHsu.html)  

## **步驟**
### Step1. 建立篩選的function
使用`replace`搭配正規表示式來將包含了`a, the, an`開頭的文字替換為空白。
```javascript
function strip(bandName) {
    return bandName.replace(/^(a |the |an )/i, '').trim();
}
```

### Step2. 對目標陣列進行篩選與排序
這裡將原本的寫法與簡寫放在一起，可以發現整體簡潔不少。
```javascript
//原本的寫法
const sortedBands = bands.sort(function(a, b){
    if(strip(a) > strip(b)) {
        return 1;
    }else {
        return -1;
    }
})
//利用箭頭函數與三元運算式的簡寫：
const sortedBands = bands.sort((a, b) => (strip(a) > strip(b)) ? 1 : -1);
```

### Step3. 把排序完的渲染到HTML中
使用`map`與`join`來組成`<li>`元素放置
```javascript
document.querySelector('#bands').innerHTML = 
      sortedBands.map(band => `<li>${band}</li>`).join('');
```
>使用join('')修改連結符號為空白, 否則原先陣列的分隔符號是`,`也會一併渲染在html中。

## 其他
這篇相對比較簡單一些，  
運用到都是之前有練習過的語法:D
