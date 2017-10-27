# 15 - LocalStorage
>首次上傳：2017/09/06

![](https://guahsu.io/2017/09/JavaScript30-15-LocalStorage/demo15.png)

## **主題**
這篇介紹LocalStorage的用法，  
透過一個小菜單來透過localstorage做資料增刪功能。

[[BLOG]](https://guahsu.io/2017/09/JavaScript30-15-LocalStorage/)  
[[DEMO]](https://guahsu.io/JavaScript30/15_LocalStorage/index-GuaHsu.html)

## **步驟**
### Step1. 基礎設定
作者已經設定好這篇練習用的html與css，  
主要的架構由一個`div`包著`ul`與`from`，  
類似Todo-List的清單(ul)與輸入欄位(form)。
### Step2. 撰寫輸入欄位新增功能
首先取得`form`元素及`ul`，並宣告一個空陣列來存放新增資料。
````javascript
  const addItems = document.querySelector('.add-items');
  const itemsList = document.querySelector('.plates');
  const items = [];
````
接著撰寫一個`addItem`，參照備註:
````javascript
  function addItem(e) {
    // 加上preventDefault()避免每次submit都會重整網頁
    e.preventDefault();
    // 利用再次querySelector來選取form中的input欄位值
    const text = this.querySelector('[name=item]').value;
    // 宣告新增要存入的物件，是輸入的文字與是否勾選的狀態(done)
    const item = {
      text,
      done: false
    }
    console.log(item);
    // 清空輸入欄位
    this.reset();
  }

  // 監聽submit按鈕
  addItems.addEventListener('submit', addItem);
````
這樣每次submit後`items`就會新增在輸入欄位中的物件了！  
可透過console.log來查看新增的物件狀態。

### Step3. 顯示新增的清單
在上一個步驟中所做的只有存於宣告的陣列中，  
並沒有抓出來顯示在HTML中，所以要寫一個function來顯示：
````javascript
  // ES6可在function中的參數直接設定參數預設值
  function populateList(plates = [], platesList) {
    // 使用map搭配join來組成字串，並顯示在html的清單ul中
    platesList.innerHTML = plates.map((plate, i) => {
      return `
        <li>
          <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''}/>
          <label for="item${i}">${plate.text}</label>
        </li>
      `;
    }).join('');
  }
````
然後要記得回到`addItem`中把`platesList`放在`items.push(item)`後面，
讓每次輸入送出後都會執行這個function重新列出組成的物件字串。

### Step4. 加入LocalStorage
當完成了新增功能後，就要進入主軸`LocalStorage`了，  
這可以讓瀏覽器存取你設定在這個頁面的資訊，  
所以首先在`addItem`中修改加入這段：
````javascript
function addItem(e) {
//...略
    populateList(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items));
    this.reset();
//...略
}
````
這裡將items的資訊存在localStorage中一個叫做`items`的自訂物件中，  
注意的是存入的物件或陣列必須透過`JSON.stringify`轉為字串，  
因為localStorage中的值是string，否則直接存只會得到"object object"的字串。

接著修改最一開始宣告的`items`:
````javascript
  const items = JSON.parse(localStorage.getItem('items')) || [];
````
讓頁面在重整後，先判斷localStorage中是否有存放`items`物件，沒有的話則給空陣列。

### Step5. 儲存checkbox狀態
這裡要新增一個function`toggleDone`並監聽`itemsList`的click動作，  
````javascript
  function toggleDone(e) {
    // 偵測進來的點擊是input(checkbox)才動作
    if (!e.target.matches('input')) return;
    // 取得checkbox的data-index值
    const el = e.target;
    const index = el.dataset.index;
    // 利用！來使done的狀態在true/false間切換
    items[index].done = !items[index].done;
    // 將更新後的狀態寫入localStorage中
    localStorage.setItem('items', JSON.stringify(items));
    // 更新列表
    populateList(items, itemsList);
  }
  // 監聽click
  itemsList.addEventListener('click', toggleDone);
````

### Step6. 增加刪除功能
到目前為止只有新增跟儲存的功能，來增加一個刪除按鈕吧，  
首先在`populateList`中字串組成中改成這樣：
````javascript
`
  <li>
    <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''}/>
    <label for="item${i}">${plate.text}</label>
    <span data-index=${i}>delete<span> 
  </li>
`
````
這會使每次輸出時多一個delete的文字在後方，  
然後調整`toggleDone`：
````javascript
  function toggleDone(e) {
    // 初始化一個存檔狀態
    let save = false;
    // 取得觸發元素的data-index值
    const el = e.target;
    const index = el.dataset.index;
    // 判斷觸發元素，如果是input則為checkbox的狀態切換
    if(e.target.matches('input')){
      items[index].done = !items[index].done;
      save = true;
    }
    // 如果是span則是透過splice刪除該物件
    if(e.target.matches('span')){
      items.splice(index, 1);
      save = true;
    }
    // 判斷上方有做事才存擋
    if(save){
      localStorage.setItem('items', JSON.stringify(items));
      populateList(items, itemsList);  
    }
  }
  ````

### Step7. 新增全選/全取消功能
在HTML的`form`元素後方加上這段HTML CODE:
````html
<style>
.checkMethod {
  padding: 0;
  text-align: left;
  list-style: none;
}
</style>
<ul class="checkMethod">
  <li>
    <input class="checkAll" type="checkbox">
    <label>Check All</label>
  </li>
</ul>
````
使其有多一個checkbox來操作全選/全取消，  
接著撰寫對應的功能：
````javascript
  // 取得操作元素
  const checkAllBtn = document.querySelector('.checkAll');
  // 全選/全取消
  const checkAll = function(e) {
    // 取得觸發當下全選按鈕是否已勾選
    const checkStatus = e.target.checked;
    // 透過迴圈將每個item的checkbox狀態改為與全選checobox狀態相同
    items.forEach(index => {
      index.done = checkStatus;
    });
    // 存檔
    localStorage.setItem('items', JSON.stringify(items));
    // 重整
    populateList(items, itemsList);
  }
  // 監聽操作元素動作
  checkAllBtn.addEventListener('click', checkAll);
````

## 探索
本次探索就是`Step6的刪除`及`Step7的新增全選/全取消功能`功能擴充，  
基本上所有語法都是之前有使用及寫下過的，  
LocalStorage很實用，之前做的兩個小練習也都有使用上：
1. [JavaScript練習-臺北市旅遊景點](http://demo.guastudio.com/jsTravelMap/)
2. [JavaScript-ETH-Linstener](http://guahsu.io/Javascript-ETH-Listener/index.html)

## 其他
終於JS30系列完成一半了，當初的目標就是把這系列先練習完，  
並強迫自己每篇都要擴充或調整原有功能並記錄心得，  
很多東西真的是在寫心得時會有重新領悟並加深印象的感覺:)。