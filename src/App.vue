<template>
  <div class="main-container">
    <div class="view-container">
      <transition name="slide" enter-active-class="animated fadeIn fast">
        <router-view/>
      </transition>

    </div>
    <div class="cover"></div>
    <navbar/>
  </div>
</template>

<script>
import titleBar from '@/components/titleBar.vue'
import navbar from '@/components/navbar.vue'
export default {
  components:{
    navbar,
    titleBar
  },
  methods:{

  },
  created() {
    // alert("rendered")
    if(this.$router.currentRoute.path != '/'){
      this.$router.push('/');
    }
    document.body.classList.add('view=Notes')
  }

}
</script>

<style>
@import "./assets/animate.css";
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, Helvetica, sans-serif;
}
body{
  background: rgb(218, 216, 216);
  position: relative;
  height: 100vh;
  width: 100%;
}




.addingSomething .addImg{
  transform: rotate(225deg);
}
.addingSomething #nav{
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
  z-index: 6;

}
.note-expanded .cover{
  transform: scaleY(1);

}
.note-expanded #addBt{
  display: none;
}
.addingSomething .cover{
  transform: scaleY(1);
}
.addingSomething .addSticky{
  top:10px;
}
</style>