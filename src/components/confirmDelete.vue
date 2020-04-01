<template>
  <div class="confirm">
      <p class="question">Continue To Delete ?</p>
      <div class="option-btns">
          <div class="iconWrapper">
            <img src="@/assets/cancel.svg" v-on:click="hideConfirmBox" alt="" class="btn">
          </div>
          <div class="iconWrapper">
              <img src="@/assets/yes.svg" v-on:click="deleter" alt="" class="btn">
          </div>
      </div>
  </div>
</template>

<script>
export default {
    methods:{
        deleter(){
            document.querySelector('.confirm').style.right = "-200px"
            document.querySelector('.confirm').style.display = "block"
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
                    },1100)//delay is to allow fade out animation
                }else if(cls == "view=Shopping"){
                    
                    const confirmBox = document.querySelector('.confirm')
                    const question = confirmBox.querySelector('.question');
                    if(question.textContent =="Delete this Shopping List ?" ){
                        const targetList = document.querySelector('.expandedList')
                        const indexOfTarget = targetList.querySelector('#listIndex').textContent;
                        this.$emit('deleteShopping__',indexOfTarget);

                    }else{
                        this.$emit('deleteShopping__');
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
    /* display: none; */
    transform: translateY(-50%);
    transition: 0.1s;
    text-align: center;
    width: 45vw;
    background:linear-gradient(150deg,#d1037b,#750092);
    border-radius: 10px;
    height: 40vh;
    box-shadow: 0px 0px 5px #BDBDBD;

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
    left: 60% ;
    transform:translateX(-50%)
}
.iconWrapper{
    background: rgba(255, 255, 255, 0.212);
    width: 45px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
}
.btn{
    width: 38px;
    height: 38px;
    padding: 8px;
}
</style>