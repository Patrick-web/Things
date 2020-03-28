<template>
  <div class="confirm">
      <p class="question">Continue To Delete ?</p>
      <div class="option-btns">
          <img src="@/assets/cancel.svg" v-on:click="hideConfirmBox" alt="" class="btn">
          <img src="@/assets/yes.svg" v-on:click="deleter" alt="" class="btn">
      </div>
  </div>
</template>

<script>
export default {
    methods:{
        deleter(){
            document.querySelector('.confirm').style.right = "-200px"
            const bodyClasses = Array.from(document.body.classList)

            bodyClasses.forEach((cls)=>{
                if(cls=="view=Notes"){
                    const targetSticky = document.querySelector('.expand');
                    const id = targetSticky.querySelector('#noteId').textContent;
                    document.body.classList.remove('note-expanded')
                    document.querySelector('.expand').classList.add('deleteTarget');
                    document.querySelector('.expand').classList.remove('expand');


                    setTimeout(()=>{
                        this.$emit('deleteSticky',id);
                        const updateBt = document.querySelector('#updateNote');
                        updateBt.style.transform = "scale(0)"
        
                    },1100)//delay is to allow fade out animation
                }else if(cls == "view=Shopping"){
                    
                    const confirmBox = document.querySelector('.confirm')
                    const question = confirmBox.querySelector('.question');
                    if(question.textContent =="Delete Shopping List ?" ){
                        const targetList = document.querySelector('.listExpanded')
                        const indexOfTarget = targetList.querySelector('#listIndex').textContent;
                        this.$emit('deleteShoppingList',indexOfTarget);
                    }else{
                        this.$emit('deleteShoppingItem');
                        
                    }

                    // alert("deleting shopping item")
                }else if(cls == "view=Tasks"){
                    alert("deleting a task")
                }
            })


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
    z-index: 8;
    top:50%;
    right: -200px;
    transform: translateY(-50%);
    transition: 0.1s;
    text-align: center;
    width: 45vw;
    background:linear-gradient(150deg,#96004b,#920086);
    border-radius: 10px;
    height: 40vh;
}
.question{
    color: white;
    margin: 5px;
    font-size: 1.5rem;
    font-family: Arial, Helvetica, sans-serif;
}
.option-btns{
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 10px;
    position: absolute;
    bottom: 10px;
    left: 65% ;
    transform:translateX(-50%)
}
.btn{
    width: 30px;
}
</style>