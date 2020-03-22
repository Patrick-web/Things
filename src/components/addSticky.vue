<template>
  <div class="saveStickyContainer">
      <p class="containerTitle">Add Sticky Note</p>
      <p class="nt">Note</p>
        <textarea v-model="note" name="" id="noteEntry" cols="30" rows="10"></textarea>
    
      <div class="options">
          <div class="save" v-on:click="saveNote">
              <p>Save</p>
              <img src="@/assets/save-white.svg" alt="">
          </div>
      </div>
  </div>
</template>

<script>
import { uuid } from 'uuidv4'
export default {
    name:"addSticky",
    data(){
        return{
            note:'',
        }
    },
    methods:{
        saveNote(){
            console.log(uuid());
            const today = new Date();
            const date = `${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()}`
            const timeOfDay = (today.getHours())>12 ? 'PM' : "AM";
            const hour = (today.getHours())>12 ? today.getHours() - 12 :today.getHours();
            const minutes = (today.getMinutes())<10 ? `0${today.getMinutes()}` : today.getMinutes(); 
            const time = `${hour}:${minutes} ${timeOfDay}`
            const newNote = {
                note:this.note,
                date:date,
                time:time,
                id:uuid()
            }
            document.body.classList.toggle('addToggled')
            document.querySelector('#noteEntry').value = '';
            if(this.note != ''){
                this.$emit('addSticky',newNote);
            }
        }
    }
}
</script>

<style>
.saveStickyContainer{
    background:#010325fd;
    height: 350px;
    width: 94vw;
    margin: auto;
    margin-left: 10px;
    top:60px;
    padding: 10px;
    border-radius: 10px;
}
.containerTitle{
    background: rgb(45, 137, 150);
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1.5rem;
    color: white;
    position: absolute;
    padding: 10px;
    border-radius: 30px;
    left:50%;
    margin-top: 8px;
    top:-60px;
    width: 195px;
    transform: translateX(-50%);
    font-weight: 300;

}
.nt{
    color: rgb(255, 255, 255);
    margin-bottom: 5px;
    font-size: 1.3rem;
}
#noteEntry{
    width: 100%;
    height: 68%;
    background: linear-gradient(150deg,rgba(103, 103, 121, 0.301),rgba(5, 5, 26, 0.288));
    border-radius: 3px;
    padding: 10px;
    color: white;
    font-size: 1.5rem;
    outline: none;
    border: none;
    font-weight: 100;

}
.save{
    padding: 5px;
    width: 120px;
    background: rgb(1, 180, 120);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.6rem;
    color: white;
    border-radius: 20px;
    text-align: center;
}
.options{
    position: relative;
    margin-top: 10px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
}
.save img{
    width: 25px;
    margin-left: 10px;
}

</style>