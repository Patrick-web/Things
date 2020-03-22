<template>
  <div class="confirm">
      <p class="text">Continue To Delete ?</p>
      <div class="option-btns">
          <img src="@/assets/cancel.svg" v-on:click="hideConfirmBox" alt="" class="btn">
          <img src="@/assets/yes.svg" v-on:click="deleteSticky" alt="" class="btn">
      </div>
  </div>
</template>

<script>
export default {
    methods:{
        deleteSticky(){
            const targetSticky = document.querySelector('.expand');
            const id = targetSticky.querySelector('#noteId').textContent;
            document.body.classList.remove('expanded')
            document.querySelector('.expand').classList.add('deleteTarget');
            document.querySelector('.expand').classList.remove('expand');
            document.querySelector('.confirm').style.right = "-200px"
            setTimeout(()=>{
                this.$emit('deleteSticky',id);
                const updateBt = document.querySelector('#updateNote');
                updateBt.style.transform = "scale(0)"

            },1100)

        },
        hideConfirmBox(){
            document.querySelector('.confirm').style.right = "-200px"

        }
    }
}
</script>

<style>
.confirm{
    position: fixed;
    z-index: 3;
    top:50%;
    right: -200px;
    transform: translateY(-50%);
    transition: 0.1s;
    text-align: center;
    width: 45vw;
    background:#d8d8d8;
    border-radius: 10px;
    height: 40vh;
}
.text{
    color: rgb(51, 51, 51);
    margin: 5px;
    font-size: 1.5rem;
    font-family: Arial, Helvetica, sans-serif;
}
.option-btns{
    margin-top: 50px;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 10px;
    position: absolute;
    bottom: 5px;
    left: 10px;
    right: 10px;
}
.btn{
    width: 50px;
}
</style>