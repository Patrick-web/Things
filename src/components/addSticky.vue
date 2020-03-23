<template>
  <div class="saveStickyContainer">
      <p class="containerTitle">Add Sticky Note</p>
      <p class="nt">Sticky</p>
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
            document.body.classList.toggle('addNoteToggled')
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
    background:linear-gradient(150deg,#ffffff,rgb(255, 255, 255));
    height: 360px;
    width: 94vw;
    margin: auto;
    margin-left: 10px;
    padding: 0px;
    border-radius: 2px;
    text-align: center;
}
.containerTitle{
    background: rgb(146, 0, 243);
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1.3rem;
    color: white;
    padding: 8px;
    border-radius: 0px;
    font-weight: 300;
    width: 100%;
    margin: 0px;
    margin-top: 0px;
}
.nt{
    color: rgb(49, 49, 49);
    margin-bottom: 5px;
    font-size: 1.3rem;
    text-align: left;
    margin-top: 5px;
    margin-left: 10px;
    font-weight: 300;
}
#noteEntry{
    width: 94%;
    height: 60%;
    background: rgb(216, 216, 216);
    border-radius: 0px;
    padding: 10px;
    color: rgb(34, 34, 34);
    font-size: 1.2rem;
    outline: none;
    border: none;
    font-weight: 300;

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