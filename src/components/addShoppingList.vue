<template>
  <div class="mainCont">
      <p class="containerTitle saveTitle">Shopping List</p>
      <p class="containerTitle editTitle">Edit Shopping List</p>
      <div class="fgroup">
        <label class="nt">Name</label>
        <input v-on:keyup.enter="focusOnBudget"  name="listName" id="shoppingListName">
      </div>
      <div class="fgroup">
        <label class="nt">Budget</label>
        <input v-on:keyup.enter="emitList" inputmode="numeric" name="budget" id="budget">
      </div>
    
      <div class="stickyOptions">
          <div class="saveBtnn btnn" v-on:click="emitList">
              <p>Save</p>
              <img src="@/assets/save-white.svg" alt="">
          </div>
          <div class="editBtnn btnn" v-on:click="editList">
              <p>Edit</p>
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

        }
    },
    methods:{
        focusOnBudget(){
            document.querySelector('#budget').focus()
        },
        emitList(){
            const today = new Date();
            const date = `${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()}`
            const timeOfDay = (today.getHours())>12 ? 'PM' : "AM";
            const hour = (today.getHours())>12 ? today.getHours() - 12 :today.getHours();
            const minutes = (today.getMinutes())<10 ? `0${today.getMinutes()}` : today.getMinutes(); 
            const time = `${hour}:${minutes} ${timeOfDay}`;
            
            const listName = document.querySelector('#shoppingListName').value;
            const listBudget =  document.querySelector('#budget').value;
            const newList = {
                id:uuid(),
                name:listName,
                date:date,
                budget:parseInt(listBudget),
                items:[],

            }
            document.body.classList.toggle('addingSomething')
            document.querySelector('#shoppingListName').value = '';
            document.querySelector('#budget').value = '';
            if(listName != '' && listBudget != ''){
                this.$emit('addOrEditList',newList);
            }
            this.budget = '';
            this.listName = '';
        },
        editList(){
            document.body.classList.remove("edittingList")
            document.body.classList.remove("addingSomething")
            const newName = document.querySelector('#shoppingListName').value;
            const newBudget =  document.querySelector('#budget').value;
            const edittedList = {
                name: newName,
                budget: parseInt(newBudget)
            }
            const index = parseInt(JSON.parse(localStorage.getItem('tlIndex')));
            this.$emit('addOrEditList',edittedList,index);

        }
    }
}
</script>

<style>
.editTitle{
    display: none;
}
.mainCont{
    background:linear-gradient(150deg,#ffffff,rgb(255, 255, 255));
    height: 280px;
    width: 94vw;
    margin: auto;
    margin-left: 10px;
    padding: 0px;
    border-radius: 2px;
    text-align: center;
    z-index: 7;
    position: fixed;
    top:-500px;
    display: none;
    transition: 0.3s ease;
}
.addingSomething .mainCont{
    top:10px;
    display: block;
}
.containerTitle{
    background: rgb(146, 0, 243);
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1.4em;
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

}
.btnn{
    position: absolute;
    bottom: -40px;
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
.editBtnn{
    display: none;
}
.edittingList .editBtnn{
    display: flex;
}
.edittingList .editTitle{
    display: block;
}
.edittingList .saveTitle{
    display: none;
}
.editBtnn .saveBtnn{
    display: none;
}
.stickyOptions{
    position: relative;
    margin-top: 10px;
    text-align: center;
}
.btnn img{
    width: 25px;
    margin-left: 10px;
}
.fgroup {
    width: 100%;
    padding: 10px;
}
.fgroup label{
    display: block;
    margin-left: 0px;
    font-weight: 300;
}
.fgroup input{
    outline: none;
    font-weight: 300;
    width: 100%;
    display: block;
    background: white;
    border: none;
    font-size: 1.3rem;
    border-bottom: 1px solid rgb(119, 119, 119);
}
.overlay{
    z-index: 6;
    position: fixed;
    height: 100%;
    width: 100%;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background: rgba(48, 1, 56, 0.842);
}
</style>