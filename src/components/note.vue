<template>
  <div class="note">
      <div class="bar">
          <p class="info date">{{note.date}}</p>
          <p class="info time">{{note.time}}</p>
      </div>
      <div class="content">
          <div class="textareaCover"></div>
          <p class="previewBox txtArea">{{note.note}}</p>
          <p id="noteId">{{note.id}}</p>
          <textarea class="txtArea"  name="" id="" cols="30" rows="20">
              
          </textarea>

      </div>
  </div>
</template>

<script>
export default {
name:'note',
props:["note"],
created(){
    setTimeout(()=>{
        const notes = document.querySelectorAll('.note');
        const textareas = document.querySelectorAll('.txtArea');
        notes.forEach((note)=>{
            note.querySelector('textarea').addEventListener('click',()=>{
                const preview = note.querySelector('.previewBox');
                const textarea = note.querySelector('textarea');
                textarea.value = preview.textContent;
                console.log(textarea.value);
                preview.style.display = "none";

                document.querySelector('.confirm').style.right = "-200px"


            })
            note.querySelector('textarea').addEventListener('keyup',()=>{
                if(note.querySelector('textarea')===document.activeElement){
                    alert("textarea active")
                }
                const updateBt = document.querySelector('#updateNote');
                updateBt.style.transform = "scale(1)"
            })
            note.querySelector('.txtArea').addEventListener('click',()=>{
                const preview = note.querySelector('.previewBox');
                const textarea = note.querySelector('textarea');
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
    .previewBox{
        --font-size: 1.2rem;
        width: 100%;
        height: 100%;
        background: yellow;
        border: none;
        color: rgb(31, 31, 31);
        padding: 10px;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        font-weight: 100;
        font-size: var(--font-size);
        line-height: 1.4rem;
    }
    .note{
        margin: 10px;
        background: rgb(255, 255, 255);
        position: relative;
        height: 19.5vh;
        overflow: hidden;
        transition:0.1s;
        box-shadow: 2px 2px 5px rgb(168, 168, 168);
    }
    .expand{
        position: fixed;
        height: 94vh;
        width: 96vw;
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
        margin-left: 8px;
        box-shadow: none;
        top:0;
        margin-top: 0;
        z-index: 2;
    }
    .expand .bar{
        height: 35px;
    }
    .expand .txtArea{
        height: 100%;
        background: white;
        color: black;
    }
    .expand .previewBox{
        height: 480px;
        background: white;
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
        height: 100%;
        background: none;
        border: none;
        color: rgb(2, 2, 2);
        padding: 10px;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        font-weight: 300;
        font-size: var(--font-size);
        line-height: 1.4rem;
        outline: none;
    }
</style>