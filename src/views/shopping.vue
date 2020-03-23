<template>
  <div class="shoppingContainer ">
      <div class="titleArea view">
          <p>Shopping List</p>
      </div>
   
   <div style="margin-top:55px" class="listsContainer">
       <div class="addItemBox">
        <div class="fgroup">
            <label for="itemName">Item</label>
            <input type="text" id="itemName">
        </div>
        <div class="fgroups">
            <div class="fgroup">
                <label for="">Price</label>
                <input inputmode="number" type="text"  id="price">
            </div>
            <div class="fgroup">
                <label for="">Amount</label>
                <input inputmode="number" type="text"  id="amount">
            </div>
        </div>
       </div>

      <div v-bind:key="list.id" v-for="list in shoppingLists" class="shopping-list">
          <p id="listId" style="display:none">{{list.id}}</p>
          <p class="listTitle">{{list.name}}</p>
          <div class="btWrapper" style="display:flex;align-items:center;justify-content:center">
            <img class="addShoppingItem" src="@/assets/plus.svg" alt="">
          </div>
          <div class="itemsContainer">
              <div v-bind:key="item.id" v-for="item in list.items" class="item">
                <div class="leftContainer">

                    <p id="itemId" style="display:none">{{item.id}}</p>
                    <p id="listId" style="display:none">{{list.id}}</p>

                    <p class="item-name">{{item.itemName}}</p>
                    <div class="pillsContainer">
                        <div class="pill">
                            <p  class="pill-name">Price</p>
                            <p class="pill-value">{{item.price}}</p>
                        </div>
                        <div class="pill">
                            <p  class="pill-name">Items</p>
                            <p class="pill-value">{{item.howMany}}</p>
                        </div>
                    </div>
                </div>
                <div class="rightContainer">
                    <div class="doneBt" v-on:click="toggleState(list.id,item.id)"></div>
                    <p style="display:none" id="isAcquired">{{item.isAcquired}}</p>
                    <p style="display:none" class="acquired">Acquired</p>
                </div>
              </div>
          </div>
          <div class="bottomInfo">
              <div class="pillsContainer">
                  <div id="total" style="margin-right:30px" class="pill">
                    <div  class="pill-name" style="padding-left: 8px">Total</div>
                    <div class="pill-value">{{list.planedExpenditure}}</div>
                  </div>
                  <div id="total" style="margin-left:-10px"  class="pill">
                    <div class="pill-name">Remaining</div>
                    <div class="pill-value">2000</div>
                  </div>
              </div>
          </div>
      </div>
   </div>
  </div>
</template>



<script>
export default {
  methods:{
      toggleState(listID,itemID){
          let targetList;
          this.shoppingLists.forEach((list)=>{
              if(list.id == listID){
                  targetList = list;
              }
          })
          targetList.items.forEach((item)=>{
              if(item.id == itemID){
                  item.isAcquired = !item.isAcquired;
              }
          })
      }
  },
  created(){
      setTimeout(()=>{
          const addItemBt = document.querySelector('.addShoppingItem');
          addItemBt.addEventListener('click',()=>{
              document.body.classList.toggle('addingItem')
          })

          const items = document.querySelectorAll('.item');
          items.forEach((item)=>{
              let isAcquired = item.querySelector('#isAcquired').textContent;
              const doneBt = item.querySelector('.doneBt');
              const itemID = item.querySelector('#itemId').textContent
              const listID = item.querySelector('#listId').textContent
              if(isAcquired=="true"){
                    item.classList.add('itemAcquired');
                    isAcquired ='true'
              }else{
                    item.classList.remove('itemAcquired')
                    isAcquired ='false'
              }
              function toggler(){
                  if(isAcquired=="true"){
                        item.classList.remove('itemAcquired');
                        isAcquired ='false'
                  }else{
                      item.classList.add('itemAcquired')
                        isAcquired ='true'
                  }
              }
              doneBt.addEventListener('click',toggler)
          })
          
      },0)
  },
  data(){
  return{
    shoppingLists:[
      {
          id:26226652,
          name:"Chandler's Birthday Cake",
          date:"22-08-2020",
          planedExpenditure:1500,
          remaining:()=>{
              const totalExp=0;
              items.forEach(item => {
                  if(item.isAcquired){
                      totalExp+=item.price
                  }
              });
                      return 100;
          },
          items:[
              {
                  id:1515156,
                  itemName:"Backing Powder",
                  price:50,
                  howMany:2,
                  isAcquired:false
              },
              {
                  id:1515356,
                  itemName:"Wheat Flour",
                  price:200,
                  howMany:1,
                  isAcquired:false
              },
              {
                  id:15356,
                  itemName:"Cooking Oil",
                  price:500,
                  howMany:1,
                  isAcquired:false
              },
              {
                  id:15394156,
                  itemName:"Sugar",
                  price:1000,
                  howMany:10,
                  isAcquired:true
              },
              {
                  id:1539156,
                  itemName:"Candles",
                  price:101,
                  howMany:30,
                  isAcquired:false
              },

          ]
      }   
    ]
  }
}
}
</script>

<style>
    .shopping-list{
        background: white;
        width: 95%;
        margin: auto;
        position: relative;
    }
    .listContainer{
        position: relative;
    }
    .listTitle{
        --purple:rgb(147, 3, 204);
        background: var(--purple) ;
        padding: 10px;
        font-size:1.4rem ;
        color: white;
        overflow: hidden;
        font-weight: 400;
    }
    .item{
        display: grid;
        grid-template-columns: 4fr 1fr;
        padding: 5px;
        background: lavender;
        margin: 5px;
    }
    .item-name{
        font-size: 1.3rem;
        font-weight: 300;
    }
    .pillsContainer{
        display:grid;
        grid-template-columns: 1fr 1fr;
    }
    .pill{
        display: flex;
        margin: 3px;
        margin-right: 0px;
        align-items: center;
        justify-content: left;
        font-size: 1.2rem;
        background: rgba(174, 0, 255, 0.342);
        border-radius: 30px;
        /* border-top-right-radius: 0px;
        border-bottom-right-radius: 0px; */
        position: relative;
        /* width: 32vmin; */
    }
    .pill-name{
        color: purple;
        padding: 5px;
        border-radius: 30px;
        font-weight: 300;
        display: inline;

    }
    .pill-value{
        display: inline;
        color: white;
        padding: 5px;
        background: rgb(147, 3, 204);
        border-radius: 30px;

        position: absolute;
        right: 0px;
    }
    .rightContainer{
        margin-left: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-left: 1px solid rgb(157, 166, 168);
    }
    .bottomInfo{
        border-top: purple 1px solid;
        background: rgba(128, 0, 128, 0.315);
        padding: 5px;
    }
    #total{
        background: purple;
    }
    #total .pill-name{
        color: white;
        
    }
    .doneBt{
        background: linear-gradient(rgba(0, 76, 255, 0),rgba(0, 174, 255, 0));
        margin-left: 5px;
        height: 35px;
        width: 35px;
        border: 1px solid;
        border-color:rgb(0, 174, 255);
        border-radius: 100%;
        transition: 0.2s;
    }
    .itemAcquired .doneBt{
        background: linear-gradient(rgb(0, 76, 255),rgb(0, 174, 255));
        border-color:none;
        border-radius: 10%;

    }
    .btWrapper{
        position: absolute;
        transform: translateY(-50%);
        transition: 0.2s ease-in-out;
        z-index: 5;
        right: 10px;
    }
    .addShoppingItem{
        transition: 0.2s ease-in-out;
        width: 40px;
        right: 10px;
        border-radius: 100%;
        background: linear-gradient(150deg,rgb(255, 0, 255),rgb(76, 0, 255));
        padding: 5px;
        box-shadow: 0px 0px 15px rgb(50, 60, 71);
        /* transform-origin: top; */
    }
    .addingItem .addShoppingItem{
        transform: rotate(135deg);
    
    }
    .addingItem .addShoppingItem{
        background: rgb(255, 0, 106);
    }
    .addingItem .addItemBox{
        transform: scale(1);
    }
    .addItemBox{
        box-shadow: 0px 0px 15px rgb(50, 60, 71);
        transform: scale(0);
        transform-origin: right;
        transition: 0.2s ease-in-out;
        border-top-right-radius: 20px;
        z-index: 4;
        position: fixed;
        top:26%;
        width: 85%;
        right: 15px;
        /* height: 20vh; */
        background: linear-gradient(-150deg,#9900FF,#FF0080);
        color: white;
        padding: 10px;
    }
    .addItemBox input{
        display: block;
        height: 30px;
        width: 70%;
        outline: none;
        border: none;
        border-bottom: 1px solid white;
        background: none;
        color: white;
    }
    .addItemBox label{
        font-size: 1.3rem;
    }
    .fgroups{
        margin-top: 10px;
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
</style>