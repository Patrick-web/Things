<template>
  <div class="main-container">
    <navbar/>


    <div class="view-container">
      <stickys class="stickyView"/>
    </div>
    <div class="cover"></div>
  </div>
</template>

<script>
import stickys from '@/views/stickys.vue'
import navbar from '@/components/navbar.vue'
export default {
  components:{
    stickys,
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
    const reminderBt = document.querySelector('#alert');
    const stickyBt = document.querySelector("#sticky");
    const indicator = document.querySelector('.indicatorBar');
    const addBt = document.querySelector('#addBt');


    reminderBt.addEventListener('click',(e)=>{
      indicator.style.left=  '-2%';
      indicator.style.width=  '10vh';
        indicator.style.transformOrigin=  'center';
      indicator.style.transform=  'scaleX(1)';
      setTimeout(()=>{
        indicator.style.left=  '1%';
      indicator.style.width=  '6.5vh';

      },400)
    })
    stickyBt.addEventListener('click',(e)=>{
      indicator.style.left=  '82.5%';
      indicator.style.width=  '8vh';
      setTimeout(()=>{
      indicator.style.transform=  'scaleX(1)';
      indicator.style.width=  '6vh';

      },400)

    })

    addBt.addEventListener('click',(e)=>{
      document.body.classList.toggle('addToggled')
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
  background: #010122;
  position: relative;
  height: 100vh;
}
.actionsContainer{
  position: fixed;
  margin-left: 15px;
  right: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  top: 100vh;/*78vh*/
  left: 0;
  background:#d8d8d8;
  text-align: center;
  padding: 10px;
  border-radius: 3px;
  z-index: 3;
  transition: 0.3s ease-in all;
  height: 10vh;

}
.expanded .actionsContainer{
  top:88vh;
}
.actionsContainer img{
  width: 40px;
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

#addBt{
  border-radius: 80%;
  background: rgb(8, 202, 144);
  padding: 10px;
  position: absolute;
  top:-25px;
  z-index: 1;
  width: 50px;
  height: 50px;
}
.addToggled #addBt{
  background: rgb(255, 0, 179);;

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
  border: 5px solid #100f41;
}
.addToggled #addBt::after{
    content: '';
  position: absolute;
  top:-5px;
  bottom:-5px;
  right: -5px;
  left: -5px;
  border-radius: 100%;
  background: transparent;
  z-index: -1;
  border: 5px solid #000008;
}
#addBt img{
  width: 30px;
  height: 30px;

  transition: 0.3s all ease-in-out;
}
.addToggled .addImg{
  transform: rotate(225deg);
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
.expanded .cover{
  transform: scaleY(1);

}
.addToggled .cover{
  transform: scaleY(1);
}
.addToggled .addSticky{
  top:60px;
}
</style>