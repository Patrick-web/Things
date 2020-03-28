<template>
  <div class="shoppingContainer ">
      <addShoppingList v-on:addNewList="saveNewList"/>


      <div class="titleArea view">
          <p>Shopping List</p>
      </div>
    <confirmDelete v-on:deleteShoppingItem="deleteItem"/>
   <div style="margin-top:55px" class="listsContainer">


        <div class="addItemBox">
            <div class="fgroup">
                <label for="itemName">Item</label>
                <input type="text" v-model="itemName" id="itemName">
            </div>
            <div class="fgroups">
                <div class="fgroup">
                    <label for="">Price</label>
                    <input v-model="price" inputmode="numeric" type="text"  id="price">
                </div>
                <div class="fgroup">
                    <label for="">Amount</label>
                    <input v-model="howMany" inputmode="numeric" type="text"  id="amount">
                </div>
            </div>
            <div id="saveItemBt" v-on:click="addNewItem()" ><p style="margin-top:-20px">Add</p> 
                <img src="@/assets/yes.svg" style="margin-top:20px;width:27px;display:block;position:absolute" alt="">
            </div>
            <div id="updateItemBt" v-on:click="editItem()" ><p style="margin-top:-20px">Save</p> 
                <img src="@/assets/yes.svg" style="margin-top:20px;width:27px;display:block;position:absolute" alt="">
            </div>
       </div>
      <div v-bind:key="list.id" v-on:click.stop="toggleExpansion($event)" v-for="(list,index) in shoppingLists" class="shopping-list">
          <p id="listIndex" style="display:none">{{index}}</p>
          <p id="listId" style="display:none">{{list.id}}</p>
          <p class="listTitle">{{list.name}}</p>
          <div class="btWrapper" style="display:flex;align-items:center;justify-content:center">
            <img class="addShoppingItem" v-on:click="showAddBox(list.id,$event)" src="@/assets/plus.svg" alt="">
          </div>
          <div  class="itemsContainer">

              <div  v-bind:key="item.id" v-for="(item,index) in list.items" class="item">
                <p style="display:none">{{index}}</p>
              <div class="options">
                  <img v-on:click="showEditBox(item.id,list.id)" src="@/assets/editIcon.svg" alt="">
                  <img v-on:click="showConfirmBox(item.id,list.id)" src="@/assets/trashIcon.svg" alt="">
              </div>
                <div v-on:click="showOptions($event)"  class="leftContainer">

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
                    <div class="doneBt" v-on:click="toggleState(list.id,item.id,$event)"></div>
                    <p style="display:none" id="isAcquired">{{item.isAcquired}}</p>
                    <p style="display:none" class="acquired">Acquired</p>
                </div>
              </div>
          </div>
          <actionsBar id="actionBar"/>
          <img src="@/assets/triangle.svg" v-on:click="showActionsBar" width="20px" id="actionBarToggle" alt="">
          <div class="bottomInfo">
              <div class="pillsContainer">
                  <div id="total" style="margin-right:30px" class="pill">
                    <div  class="pill-name" style="padding-left: 8px">Total</div>
                    <div class="pill-value">{{list.items.map(item=>item.price*item.howMany).reduce((total,totalCost)=>total+totalCost,0)}}</div>
                  </div>
                  <div id="total" style="margin-left:-10px"  class="pill">
                    <div class="pill-name">Remaining</div>
                    <div class="pill-value">{{list.budget - list.items.map(item=>item.price*item.howMany).reduce((total,totalCost)=>total+totalCost,0)}}</div>
                  </div>
              </div>
          </div>
      </div>
   </div>
   <addBt/>
  </div>
</template>



<script>
import { uuid } from 'uuidv4'
import confirmDelete from '@/components/confirmDelete.vue'
import addShoppingList from '@/components/addShoppingList.vue'
import actionsBar from '@/components/actionsBar.vue'
import addBt from '@/components/addBt.vue'

export default {
components:{
    confirmDelete,
    addShoppingList,
    addBt,
    actionsBar
},
data(){
    return{
        itemName:'',
        price:'',
        howMany:'',
        indexOfTargetItem:0,
        indexOfTargetList:0,
        targetList:'',
        shoppingLists:[
          {
            test:"",
            id:26226652,
            name:"Chandler's Birthday Cake",
            date:"22-08-2020",
            budget:1500,
            items:[
                {
                  id:1515156,
                  itemName:"Backing Powder",
                  price:50,
                  howMany:2,
                  isAcquired:false
                },
                {
                  id:151556,
                  itemName:"Backing Powder",
                  price:50,
                  howMany:2,
                  isAcquired:false
                },
                {
                  id:15556,
                  itemName:"Backing Powder",
                  price:50,
                  howMany:2,
                  isAcquired:false
                },
                {
                  id:1516,
                  itemName:"Backing Powder",
                  price:50,
                  howMany:2,
                  isAcquired:false
                },
                {
                  id:1556,
                  itemName:"Backing Powder",
                  price:50,
                  howMany:2,
                  isAcquired:false
                },
                {
                  id:156,
                  itemName:"Backing Powder",
                  price:50,
                  howMany:2,
                  isAcquired:false
                },
                {
                  id:15,
                  itemName:"Backing Powder",
                  price:50,
                  howMany:2,
                  isAcquired:false
                },
    
                ]
          }, 
          {
            test:"",
            id:266652,
            name:"Back to school",
            date:"22-08-2020",
            budget:3000,
            remaining:0,
            items:[
                {
                  id:1556156,
                  itemName:"Bic pen",
                  price:25,
                  howMany:2,
                  isAcquired:false
                },
    
                ]
          }   
      ]
    }},
    methods:{
        showActionsBar(e){
            e.target.parentElement.classList.toggle('actions-visible')
        },
        toggleExpansion(e){
            const list = e.currentTarget;
            list.classList.add('expandedList')
            document.body.classList.add('listExpanded')
        },
        saveNewList(newList){
            this.shoppingLists.unshift(newList)
        },
        showAddBox(listID,e){
            this.targetList = listID
            document.querySelector('#updateItemBt').style.zIndex = "-1";
            document.body.classList.toggle('addingItem')
            e.target.classList.toggle('closeAddBox');
        },
        showOptions(e){
            const itemSelected = event.currentTarget.parentElement;
            console.log(itemSelected);
            const alreadyOpenItem = document.querySelector('.showOptions');
            itemSelected.classList.toggle('showOptions')
            
            if(alreadyOpenItem!=undefined){
                alreadyOpenItem.classList.remove('showOptions')
            }
        },
        showConfirmBox(itemID,listID){
          document.querySelector('.confirm').style.right="10px";

            //Get index of target list
            //get index of target item
            //splice out the item at that index
            const targetListID = this.shoppingLists.map(list=>list.id)
            .indexOf(listID)
            this.indexOfTargetList = targetListID
            
            const targetItemID  = this.shoppingLists[targetListID].items.map(item=>item.id)
            .indexOf(itemID)
            
            this.indexOfTargetItem = targetItemID
        },
        deleteItem(){
            this.shoppingLists[this.indexOfTargetList].items.splice(this.indexOfTargetItem,1)
        },
        showEditBox(itemID,listID){
            document.body.classList.toggle('addingItem');
            document.querySelector('#updateItemBt').style.zIndex = "3";
            const tg = document.querySelector('.expandedList');
            const tgAddBt  = tg.querySelector('.addShoppingItem');
            tgAddBt.classList.toggle('closeAddBox')            
            const targetListIndex = this.shoppingLists.map(list=>list.id)
            .indexOf(listID)
            const targetItemIndex  = this.shoppingLists[targetListIndex].items.map(item=>item.id)
            .indexOf(itemID)

            this.indexOfTargetList = targetListIndex;
            this.indexOfTargetItem = targetItemIndex;

            const itemName = this.shoppingLists[targetListIndex].items[targetItemIndex].itemName
            const price = this.shoppingLists[targetListIndex].items[targetItemIndex].price
            const howMany = this.shoppingLists[targetListIndex].items[targetItemIndex].howMany

            this.itemName = itemName
            this.price = price
            this.howMany = howMany
            document.querySelector('#itemName').value = itemName;
            document.querySelector('#amount').value = howMany
            document.querySelector('#price').value = price

        },
        editItem(){
            this.shoppingLists[this.indexOfTargetList].items[this.indexOfTargetItem].itemName = this.itemName;
            this.shoppingLists[this.indexOfTargetList].items[this.indexOfTargetItem].price = this.price;
            this.shoppingLists[this.indexOfTargetList].items[this.indexOfTargetItem].howMany = this.howMany;
            this.clearData()
            const tg = document.querySelector('.expandedList');
            const tgAddBt  = tg.querySelector('.addShoppingItem');
            tgAddBt.classList.remove('closeAddBox') 
        },
        clearData(){
          document.querySelector('#itemName').value = '';
          this.itemName = ''
          document.querySelector('#amount').value = ''
          this.howMany = ''
          document.querySelector('#price').value = ''
          this.price = ''
          document.body.classList.remove('addingItem')
        },
      toggleState(listID,itemID,event){
          const itemSelected = event.target.parentElement.parentElement;
          const acquiredState = itemSelected.querySelector('#isAcquired').textContent;
          if(acquiredState=="true"){
                    itemSelected.classList.remove('itemAcquired');
                    itemSelected.querySelector('#isAcquired').textContent ='false'
          }else{
                    itemSelected.classList.add('itemAcquired')
                    itemSelected.querySelector('#isAcquired').textContent ='true'
          }

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
      },
      addNewItem(){
        let targetList;
          this.shoppingLists.forEach((list)=>{
              if(list.id == this.targetList){
                  targetList = list;
              }
          })
          const newItem = {
              id:uuid(),
              itemName:this.itemName,
              howMany:parseInt(this.howMany),
              price:parseInt(this.price),
              isAcquired:false
          }
          targetList.items.unshift(newItem)
          this.clearData()  
          document.querySelector('.closeAddBox').classList.remove('closeAddBox')
      }
  },
  created(){
      setTimeout(()=>{
        //   const addItemBt = document.querySelector('.addShoppingItem');
        //   addItemBt.addEventListener('click',()=>{
        //       document.querySelector('#updateItemBt').style.zIndex = "-1";
        //       document.body.classList.toggle('addingItem')
        //   })

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

}
</script>

<style>
    .shopping-list{
        background: white;
        width: 95%;
        margin: auto;
        position: relative;
        margin-bottom: 10px;
        margin-top: 10px;
        transition: 0.4s ease;
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
    .itemsContainer{
        height: 0;
        overflow-y: scroll;
        position: absolute;
        width: 100%;
        bottom: 10%;
        margin-top: 10px;
        /* margin-bottom: 25px; */
    }
    #actionBar{
        box-shadow: 0px 0px 30px rgba(141, 141, 141, 0.452);
        position:absolute;
        width:90%;
        background:#f0f0f0;
        border-radius:50px;
        display: block;
        bottom:0%;
        opacity: 0;
        transition: 0.2s ease-in;
        transform: scaleY(0);
        left:50%;
        transform: scaleY(0) translateX(-50%);
   }
   #actionBarToggle{
       position: absolute;
       bottom: 10%;
       left:50%;
       transform: translateX(-50%) rotate(0deg);
       transform-origin:center;
       transition: 0.2s;
       display: none;
   }
   .actions-visible #actionBar{
       bottom: 13%;
       opacity: 1;
       transform: translateX(-50%) scaleY(1);
   }
   .actions-visible #actionBarToggle{
       transform: translateX(-50%) rotate(180deg);
   }
   .expandedList #actionBarToggle{
       display: block;
   }
    .expandedList{
        position: fixed;
        top:0;
        right: 0;
        left: 0;
        bottom: 0;
        z-index: 6;
        margin-top: 0;
        margin-bottom: 0;
    }
    .expandedList .itemsContainer{
        height: 82%;
    }
    .listExpanded #addBt{
        display: none;
    }
    .listExpanded #nav{
        display: none;

    }
    .item{
        display: grid;
        grid-template-columns: 4fr 1fr;
        padding: 5px;
        background: lavender;
        margin: 5px;
        position: relative;
        margin-bottom: 5px;
        transition: 0.1s ease-in-out;
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
        position: absolute;
        bottom: 0;
        width: 100%;
        border-top: purple 1px solid;
        background: rgba(128, 0, 128, 0.315);
        padding: 10px;
        display: none;
        height: 10%;
    }
    .expandedList .bottomInfo{
        display: block;
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
        width: 0px;
        right: 10px;
        border-radius: 100%;
        background: linear-gradient(150deg,rgb(255, 0, 255),rgb(76, 0, 255));
        padding: 0px;
        box-shadow: 0px 0px 15px rgb(50, 60, 71);
        /* transform-origin: top; */
    }
    .expandedList .addShoppingItem{
        width: 40px;
        padding: 5px;
    }
    .closeAddBox{
        transform: rotate(135deg);
        background:rgb(255, 0, 106) ;
    }
    .addingItem .addItemBox{
        transform: scale(1);
    }
    .addItemBox{
        box-shadow: 0px 0px 15px rgb(50, 60, 71);
        transform: scale(0);
        transform-origin: right;
        transition: 0.2s ease-in-out;
        border-radius: 20px;  
        z-index: 7;
        position: fixed;
        top:26%;
        width: 85%;
        right:10px;
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
        font-size: 1.2em;
        font-weight: 300;
    }
    .addItemBox label{
        font-size: 1.3rem;
    }
    #itemName{
        width: 83%;
    }
    .fgroups{
        margin-top: 10px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        margin-right: 10px;
    }
    #saveItemBt,#updateItemBt{
        position: absolute;
        right:0px;
        top:0px;
        height: 100%;
        background: linear-gradient(150deg,magenta,orange);
        color: white;
        font-size: 1.4rem;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5px;
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
        width: 50px;
    }
    #updateItemBt{
        z-index: -1;
    }
    .updating-item #updateItemBt{
        z-index: 2;

    }
    .options{
        position: absolute;
        z-index: 2;
        right: 0%;
        /* transform: translateX(-50%); */
        bottom:-44px;
        padding: 2px;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        background: lavender;
        /* width: 100%; */
        transform: scaleY(0);
        transform-origin: top;
        transition: 0.1s ease-in;
    }
    .options img{
        width: 40px;
        margin-right: 5px;
        margin-left: 5px;
        transform: scale(0);
        transition: 0.25s ease-in-out;
    }
    .showOptions .options{
        transform: scaleY(1);
        transform-origin: top;
    }
    .showOptions .options img{
        transform: scale(1);
    }
    .showOptions{
        margin-bottom: 48px;
    }
</style>