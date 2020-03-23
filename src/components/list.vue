<template>
  <div>
        <div v-bind:key="list.id" v-for="list in shoppingLists" class="shopping-list">
          <p id="listId" style="display:none">{{list.id}}</p>
          <p class="listTitle">{{list.name}}</p>
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
</template>

<script>
import items from '@/components/item.vue'
export default {
props:['shoppingLists'],
components:{
    items
}
}
</script>

<style>

</style>