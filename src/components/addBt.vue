<template>
    <div v-on:click="showAddArea" id="addBt" class="add-note">
        <img class="addImg" src="@/assets/plus.svg" alt="">
    </div>
</template>

<script>
export default {
methods:{
  showAddArea(){
    document.body.classList.toggle('addingSomething');
  }
}
}
</script>

<style>
#addBt{
  border-radius: 80%;
  background: rgb(123, 0, 238);
  padding: 10px;
  position: fixed;
  top:79%;
  left:50%;
  transform: translateX(-50%);
  z-index: 10;
  width: 50px;
  height: 50px;
  transition: 0.2s ease-in-out all;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 20px rgba(68, 68, 68, 0.753);
}
.addingSomething #addBt{
  background: rgb(255, 0, 157);;
  top:4.8%;
  left:88%;
  width: 45px;
  height: 45px;

}
#addBt::after{
  content: '';
  position: absolute;
  top:-5px;
  bottom:-5px;
  right: -5px;
  left: -5px;
  border-radius: 100%;
  background: transparent;
  z-index: -1;
  /* border: 5px solid #100f41; */
}
#addBt img{
  width: 30px;
  height: 30px;

  transition: 0.3s all ease-in-out;
}
</style>