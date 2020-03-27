<template>
  <div class="stickyContainer">
      <addSticky class="addSticky" v-on:addSticky="addSticky" style="position:fixed;"/>
      <div class="titleArea">
          <p>Sticky Notes</p>
          <img class="more" src="@/assets/more.svg" alt="">
      </div>
      <div class="notesContainer">
          <div class="sticky" v-bind:key="sticky.id" v-for="sticky in notes">
              <note v-bind:note="sticky" v-on:updateNote="updateNote"/>
          </div>
      </div>
      <confirmDelete v-on:deleteSticky="deleteSticky"/>
        <addBt/>
  </div>
</template>

<script>
import note from '@/components/note.vue'
import addSticky from '@/components/addSticky.vue'
import addBt from '@/components/addBt.vue'
import confirmDelete from '@/components/confirmDelete.vue'
export default {
    name:"stickys",
    methods:{
        addSticky(newNote){
            this.notes.unshift(newNote)
            // this.notes = [...this.notes,newNote]
            console.log(this.notes);
            let notesStorage = JSON.parse(localStorage.getItem('stickynotes'));
            if(notesStorage){
                notesStorage = [...this.notes]
                localStorage.setItem('stickynotes',JSON.stringify(notesStorage));

            }else{
                const newStickyStorage = [newNote];
                localStorage.setItem('stickynotes',JSON.stringify(newStickyStorage));
            }
        },
        deleteSticky(id){
            this.notes = this.notes.filter(note=>note.id != id);
            let notesStorage;
            notesStorage = [...this.notes]
            localStorage.setItem('stickynotes',JSON.stringify(notesStorage));
        },
        updateNote(){
            const targetSticky = document.querySelector('.expand');
            const updatedNote = targetSticky.querySelector('textarea').value
            const id = targetSticky.querySelector('#noteId').textContent;
            this.notes.forEach((note)=>{
                if(note.id === id){
                    note.note = updatedNote
                }
            })

            document.body.classList.remove('note-expanded')
            document.querySelector('.expand').classList.remove('expand');

            let notesStorage;
            notesStorage = [...this.notes]
            localStorage.setItem('stickynotes',JSON.stringify(notesStorage));

        }
    },
    created(){
        const stickies = JSON.parse(localStorage.getItem('stickynotes'));
        this.notes = [...stickies];
    },
    data(){
        return{
            notes:[

            ]
        }
    },
    components:{
        note,
        addSticky,
        confirmDelete,
        addBt
    },

}
</script>

<style>
    .stickyContainer{
        position: relative;
    }
    .titleArea{
        height: 45px;
        position: fixed;
        width: 100%;
        top:0;
        z-index: 2;
        background: #f5008f;
        box-shadow: 2px 2px 10px rgba(61, 61, 61, 0.582);
        padding-bottom: 2px;
    }
    .titleArea p{
        color: rgb(255, 255, 255);
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        position: absolute;
        left: 10px;
        font-size: 1.5rem;
        top:8px;
        font-weight: 300;

    }
    .notesContainer{
        margin-top: 50px;
        /* margin-bottom: 90px; */
    }
    .more{
        width: 50px;
        position: absolute;
        right: 10px;
        top:18px;
        display: none;
    }
    .addSticky{
        top:-800px;      
        transition: 0.3s ease all;
        z-index: 7;
    }
    .deleteTarget{
        animation: slideright;
        animation-duration: 0.4s;
        animation-delay: 0.4s;
        animation-fill-mode: forwards;
    }
    @keyframes slideright {
        0%{
            margin-left: 10px;
            opacity: 1;
        }
        100%{
            margin-left: 100%;
            opacity: 0;
        }
    }
</style>