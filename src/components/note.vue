<template>
  <div class="note">
      <div class="bar">
          <p class="info date">{{note.date}}</p>
          <p class="info time">{{note.time}}</p>
      </div>
      <div class="content">
          <div class="textareaCover"></div>
          <p id="previewBox" class="txtArea">{{note.note}}</p>
          <p id="noteId">{{note.id}}</p>
          <textarea v-model="note.note" v-on:keyup="showSaveIcon($event)" id="actualtxtarea" class="txtArea"  name="" cols="30" rows="20">
          </textarea>
          <actionsBar class="actions" v-on:updateNote.stop="$emit(updateNote)"/>
          <div class="saveEditBt" v-on:click="$emit('updateNote')" style="position:absolute;right:15px;top:45px">
            <img src="@/assets/save.svg"  alt="">
          </div>
      </div>
  </div>
</template>

<script>
import actionsBar from '@/components/actionsBar.vue'

export default {
name:'note',
components:{
    actionsBar
},
props:["note"],
methods:{
    showSaveIcon(e){
        const expanded = e.target.parentElement.parentElement;
        expanded.querySelector('.saveEditBt').style.transform = "scale(1)"
    }
},
created(){
    setTimeout(()=>{
        const notes = document.querySelectorAll('.note');
        const textareas = document.querySelectorAll('.txtArea');
        notes.forEach((note)=>{
            note.querySelector('#previewBox').addEventListener('click',()=>{
                const preview = note.querySelector('#previewBox');
                const textarea = note.querySelector('#actualtxtarea');
                textarea.style.display="block"
                textarea.value = preview.textContent;
                textarea.focus()
                console.log(textarea.value);
                preview.style.display = "none";

                document.querySelector('.confirm').style.right = "-200px"

        })
        })
        notes.forEach(note => {
        note.addEventListener('click',(e)=>{
            note.classList.add('expand')
            document.body.classList.add('note-expanded')
        })
        });
    },0)
}
}
</script>

<style>
    #noteId{
        display: none;
    }
    #previewBox{
        --font-size: 1.2rem;
        width: 100%;
        position: absolute;
        border: none;
        color: rgb(31, 31, 31);
        padding: 10px;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        font-weight: 300;
        font-size: var(--font-size);
        line-height: 1.4rem;
        overflow-y: scroll;
    }
    .saveEditBt{
        background: rgba(0, 128, 0, 0.171);
        width: 45px;
        height: 45px;
        /* padding: 10px; */
        border-radius: 100%; 
        display: flex;
        justify-content: center;
        align-items: center;
        transform: scale(0);
        transition: 0.2s;
    }
    .saveEditBt img{
        width: 25px;
    }
    .note{
        background:#f5f8fa;
        margin: 10px;
        position: relative;
        height: 19.5vh;
        overflow: hidden;
        transition:0.2s ease;
        box-shadow: 2px 2px 5px rgb(168, 168, 168);
    }
    .expand{
        position: fixed;
        height: 94vh;
        /* min-height: 500px; */
        width: 96vw;
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
        margin-left: 8px;
        box-shadow: none;
        top:0;
        margin-top: 0;
        z-index: 8;
        padding-bottom: 50px;
        margin-bottom: 0px;
    }
    .expand .bar{
        height: 35px;
    }
    .expand #previewBox{
        /* height: 480px; */
        /* background: white; */
    }
    .bar{
        --barBgColor: rgb(0, 153, 255);
        height: 20px;
        background: var(--barBgColor) ;
        transition: 0.3s all ease-in;
        display: flex;
        justify-content: center;
        align-content: center;
        position: relative;
        overflow: hidden;
        font-weight: 300;
    }
    .expand .textareaCover{
        display: none;
    }
    .textareaCover{
        z-index: 4;
        position: absolute;
        height: 100%;
        width: 100%;
    }
    .bar .info{
        color:white;
        font-family: Arial, Helvetica, sans-serif;
        margin: 2px;
        position: absolute;
        bottom: 20px;
        transition: 0.4s ease-in;
        font-size: 1.2rem;
    }
    .expand .info{
        bottom: 3px;
    }
    .time{
        right:10px;
    }
    .date{
        left:10px;

    }
    .note .txtArea{
        --font-size: 1.2rem;
        width: 100%;
        height: 82%;
        border: none;
        color: rgb(2, 2, 2);
        padding: 10px;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        font-weight: 300;
        font-size: var(--font-size);
        line-height: 1.4rem;
        outline: none;
        
    }
    #actualtxtarea{
        position: absolute;
        display: none;
    }
    .actions{
        position: absolute;
        width: 100%;
        bottom: 0px;
    }
</style>