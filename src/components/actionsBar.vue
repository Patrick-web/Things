<template>
    <div class="actionsContainer">
      <img src="@/assets/trash.svg" id="deleteBt" @click.stop="confirmDelete" alt="">
      <img src="@/assets/editIcon.svg" class="editBts" id="editBt" @click.stop="showListAddBox" alt="">
      <img src="@/assets/back.svg" v-on:click.stop="collapseNote" class="colapse" alt="">
    </div>
</template>

<script>
export default {
  methods:{
    showListAddBox(){
      if(document.body.classList.contains('view=Shopping')){

        const targetList = document.querySelector('.expandedList');
        let listName = targetList.querySelector('.listTitle').textContent;      
        let listBudget = targetList.querySelector('.listBudget').textContent;
        const listIndex = targetList.querySelector('#listIndex').textContent;
        localStorage.setItem('tlIndex', JSON.stringify(listIndex));

        document.querySelector('#shoppingListName').value = listName;      
        document.querySelector('#budget').value = listBudget;      
        document.body.classList.toggle('addingSomething');
        // this.$emit('editShoppingList')
        document.body.classList.add("edittingList")
        document.querySelector('.expandedList').classList.remove('expandedList')
        document.body.classList.remove('listExpanded');
        document.querySelector('.actions-visible').classList.remove('actions-visible')

      // this.collapseNote()
      // console.log(addBox);
      }
    },
    confirmDelete(){
      if(document.body.classList.contains('view=Shopping')){
         const confirmBox = document.querySelector('.confirm')
         confirmBox.style.right="10px";
         confirmBox.style.display="block";
         const question = confirmBox.querySelector('.question');
         question.textContent = "Delete this Shopping List ?"
      }else if(document.body.classList.contains('view=Notes')){
         const targetNote = document.querySelector('.expand');
         const noteId = targetNote.querySelector('#noteId').textContent
         document.querySelector('.confirm').style.right="10px";
      }
    },
    collapseNote(){
      if(document.body.classList.contains('view=Shopping')){
        
        document.querySelector('.expandedList').classList.remove('expandedList')
        document.body.classList.remove('listExpanded');
        document.querySelector('.actions-visible').classList.remove('actions-visible')

      }else if(document.body.classList.contains('view=Notes')){
        document.querySelector('.note-expanded').querySelector('.saveEditBt').style.transform = "scale(0)"
        document.body.classList.remove('note-expanded')
        document.querySelector('.expand').classList.remove('expand');
        
        // const updateBt = document.querySelector('#updateNote');
        // updateBt.style.transform = "scale(0)"
        document.querySelector('.confirm').style.right = "-200px"
      }
    }
  },
created(){
  setTimeout(()=>{
    if(document.body.classList.contains('view=Notes')){
      document.querySelectorAll('.editBts').forEach((bt)=>{bt.style.opacity="0"});
    }
  },0)
}
}
</script>

<style>
#updateNote{
  transform: scale(0);
  transition: 0.1s;
}
.actionsContainer{
  /* position: fixed; */
  display: none;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background:#cbeaf7;
  text-align: center;
  padding: 10px;
  border-radius: 3px;
  left:50%;
  transform: translateX(-50%);
  
}
.expand .actionsContainer{
  display: flex;
}
.actionsContainer img{
  width: 13%;
}
.addNoteToggled .actionsContainer{
  display: none;
}
#deleteBt{
  position: absolute;
  left: 10px;
  /* width: 10%; */
}
#saveNote{
  /* width: 13%; */

}
#editBt{
  width: 15%;
  margin-bottom: -5px;
}
.colapse{
  position: absolute;
  right: 10px;
  /* width: 8%; */
}
</style>