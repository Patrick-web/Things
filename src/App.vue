<template>
  <div class="main-container">
    <div class="view-container">
      <!-- <stickys class="stickyView"/> -->
      <shoppingLists class="shoppingView"/>
    </div>
    <div class="cover"></div>
    <navbar/>
  </div>
</template>

<script>
import stickys from '@/views/stickys.vue'
import shoppingLists from '@/views/shopping.vue'
import navbar from '@/components/navbar.vue'
export default {
  components:{
    stickys,
    shoppingLists,
    navbar
  },
  methods:{
    goToReminders(){
    },
    goToStickys(){

    },
  },
  created() {
    
    setTimeout(()=>{
    const addBtNote = document.querySelector('.add-note');

    addBtNote.addEventListener('click',(e)=>{
      document.body.classList.toggle('addNoteToggled');
      // alert("addBt clicked")
    })
    },0)
  }

}
</script>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-weight: 100;
  font-family: Arial, Helvetica, sans-serif;
}
body{
  background: rgb(218, 216, 216);
  position: relative;
  height: 100vh;
}

#deleteNote{
  position: absolute;
  left: 10px;
  width: 10%;
}
#saveNote{
  width: 13%;

}
#colapse{
  position: absolute;
  right: 10px;
  width: 8%;
}


.addNoteToggled .addImg{
  transform: rotate(225deg);
}
.addNoteToggled #nav{
  display: none;
}
#alert,#sticky{
  position: absolute;
  width: 40px;
  padding: 5px;
}
#alert{
  left: 10px;
}
#sticky{
  right: 10px;
  width: 50px;
}
.cover{
  position: fixed;
  top:0;
  height: 100vh;
  background: rgba(0, 0, 0, 0.849);
  width: 100%;
  transform: scaleY(0);
  transform-origin: bottom;
  transition: 50ms;
}
.note-expanded .cover{
  transform: scaleY(1);

}
.note-expanded #addBt{
  display: none;
}
.addNoteToggled .cover{
  transform: scaleY(1);
}
.addNoteToggled .addSticky{
  top:10px;
}
</style>