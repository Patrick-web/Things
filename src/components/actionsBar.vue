<template>
    <div class="actionsContainer">
      <img src="@/assets/trash.svg" id="deleteNote" @click="confirmDelete" alt="">
      <img src="@/assets/save.svg" id="updateNote" @click="$emit('updateNote')" alt="">
      <img src="@/assets/back.svg" id="colapse" alt="">
    </div>
</template>

<script>
export default {
  methods:{
    confirmDelete(){
      document.querySelector('.confirm').style.right="10px";
    }
  },
created(){
  setTimeout(()=>{
    const delBt = document.querySelector('#deleteNote');
    const colapseBt = document.querySelector('#colapse');

    colapseBt.addEventListener('click',(e)=>{
      document.body.classList.remove('expanded')
      document.querySelector('.expand').classList.remove('expand')
      const updateBt = document.querySelector('#updateNote');
      updateBt.style.transform = "scale(0)"

      document.querySelector('.confirm').style.right = "-200px"


    })

    delBt.addEventListener('click',()=>{
       const targetNote = document.querySelector('.expand');
       const noteId = targetNote.querySelector('#noteId').textContent
    })
      },0)
}
}
</script>

<style>
#updateNote{
  transform: scale(0);
  transition: 0.1s;
}
</style>