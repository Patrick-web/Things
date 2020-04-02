<template>
    <div class="titleArea">
          <p id="pageTitle">{{title}}</p>
          <img class="more" src="@/assets/more.svg" alt="">
    </div>

</template>

<script>
export default {
props:['title']
}
</script>

<style>    
.titleArea{
        height: 45px;
        position: fixed;
        width: 100%;
        top:0;
        z-index: 2;
        background: #690183;
        box-shadow: 2px 2px 10px rgba(61, 61, 61, 0.582);
        padding-bottom: 2px;
    }
    .titleArea p{
        color: rgb(255, 255, 255);
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        position: absolute;
        left: 10px;
        font-size: 1.5rem;
        top:8px;
        font-weight: 300;

    }

</style>