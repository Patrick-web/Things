<template>
    <div id="nav" class="current-sticky">
      <button @click="goToShopper" class="nav-bt" :class="{activeNav: currentRoute=='shopping'}"> 
        <shopping-bag-icon size="2x" class="custom-class"></shopping-bag-icon> 
        <p>Shopping</p>
      </button/> 
       <button @click="goToTasks" class="nav-bt" :class="{activeNav: currentRoute=='todo'}">
        <check-square-icon size="2x" class="custom-class"></check-square-icon> 
        <p>Todos</p>
      </button/> 
    </div>
</template>

<script>
import { ShoppingBagIcon } from 'vue-feather-icons'
import { CheckSquareIcon } from 'vue-feather-icons'
import { BookmarkIcon } from 'vue-feather-icons'
export default {
  data(){
      return {
          currentRoute: "todo"
        }
    },
  components:{
      ShoppingBagIcon,
      CheckSquareIcon,
      BookmarkIcon
    },
  watch:{
    $route (to, from){
        console.log("Routing to: ")
        console.log(to)
        this.currentRoute = to.name
    }
  },
  methods:{
    goToShopper(){
      document.body.classList.add('view=Shopping');
      document.body.classList.remove('view=Notes');
      document.body.classList.remove('view=Tasks');
      document.body.classList.remove('addingSomething');
      
      if(this.currentRoute!=="shopping"){
        this.$router.replace('/shopping')
      }
    },
    goToNotes(){
      document.body.classList.add('view=Notes');
      document.body.classList.remove('view=Shopping');
      document.body.classList.remove('view=Tasks');
      document.body.classList.remove('addingSomething');
      console.log(this.$router.currentRoute.path);
      if(this.currentRoute!=="notes"){
        this.$router.replace('/notes')
      }

    },
    goToTasks(){
      document.body.classList.add('view=Tasks');
      document.body.classList.remove('view=Notes');
      document.body.classList.remove('view=Shopping');
      document.body.classList.remove('addingSomething');
      if(this.currentRoute!=="todo"){
        this.$router.replace('/')
      }

    },

  },

}
</script>

<style>
#nav{
  overflow: hidden;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom:0px;
  height: 70px;
  width: 100%;
  bottom: 5px;
  z-index: 5;
  transition: 0.3s ease-out all;
  display:flex;
  box-shadow: 0px -2px 8px rgba(128, 128, 128, 0.623);
}
.addingTask #nav{
  display: none;
}
.note-expanded #nav{
  bottom:-20%;
}
#nav .icon{
  width:12%;
  fill:white;
  position:absolute;
}
.nav-bt{
  display: flex;
  flex-direction: column;
  gap:5px;
  align-items:center;
  justify-content: center;
  height:100%;
  width:50%;
  background:white;
  border:none;
}
.activeNav{
    filter: invert(1)
}
.activeNav p {
    font-weight: 700;
  }
.current-shopping #shoppingIcon{
  position:absolute;
  /* width:13%; */
  animation: wiggle;
  animation-duration: 0.3s;
} 
.current-tasks #tasksIcon{
  position:absolute;
  /* width:13%; */
  animation: wiggle;
  animation-duration: 0.3s;
} 
.current-notes #notesIcon{
  position:absolute;
  /* width:13%; */
  animation-name: wiggle;
  animation-duration: 0.3s;
} 

@keyframes wiggle{
  0%{
    transform: rotate(0deg);
  }
  25%{
    transform: rotate(25deg);
  }
  50%{
    transform: rotate(-20deg);
  }
  75%{
    transform: rotate(10deg);

  }
  100%{
    transform: rotate(0deg);
  }
}

#shoppingIcon{
  left:15px;
}
#tasksIcon{
  right:15px;
}
.indicatorBar{
  position: absolute;
  width: 52px;
  height: 100%;
  top:-5px;
  bottom: 5px;
  background: rgba(255, 255, 255, 0.137);
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  transition: 0.2s;
  left: 50%;
  transform: translateX(-50%);
}
.current-shopping .indicatorBar{
  border-top-left-radius: 0px;
  border-bottom-right-radius: 25px;
  border-top-right-radius: 25px;
  border-bottom-left-radius: 0px;
  height: 80%;
  width: 70px;
  left: 8.5%;
  top:5px;

} 
.current-tasks .indicatorBar{
  height: 80%;
  top:5px;
  left: 91%;
  width: 68px;
  border-top-right-radius: 0px;
  border-bottom-left-radius: 25px;
  border-top-left-radius: 25px;
  border-bottom-right-radius: 0px;


} 
.current-notes .indicatorBar{
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  top:-5px;
  height: 100%;
  left: 50%;
} 
</style>
