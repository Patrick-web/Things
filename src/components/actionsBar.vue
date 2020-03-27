<template>
    <div class="actionsContainer">
      <img src="@/assets/trash.svg" id="deleteNote" @click.stop="confirmDelete" alt="">
      <img src="@/assets/save.svg" id="updateNote" @click.stop="$emit('updateNote')" alt="">
      <img src="@/assets/back.svg" v-on:click.stop="collapseNote" class="colapse" alt="">
    </div>
</template>

<script>
export default {
  methods:{
    confirmDelete(){
       const targetNote = document.querySelector('.expand');
       const noteId = targetNote.querySelector('#noteId').textContent
       document.querySelector('.confirm').style.right="10px";
    },
    collapseNote(){
      document.body.classList.remove('note-expanded')
      document.querySelector('.expand').classList.remove('expand')
      const updateBt = document.querySelector('#updateNote');
      updateBt.style.transform = "scale(0)"
      document.querySelector('.confirm').style.right = "-200px"

    }
  },
created(){
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
  transition: 0.3s ease-in all;


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
#deleteNote{
  position: absolute;
  left: 10px;
  /* width: 10%; */
}
#saveNote{
  /* width: 13%; */

}
.colapse{
  position: absolute;
  right: 10px;
  /* width: 8%; */
}
</style>