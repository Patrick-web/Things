<template>
<div>
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
</template>

<script>
export default {
props:['items']
}
</script>

<style>

</style>