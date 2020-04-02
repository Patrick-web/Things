<template>
  <div class="mainTodoContainer">
    <titleBar title="Tasks"/>

    <div  accept-charset="utf-8" class="formArea">
      <label for="to-do" style="font-weight:300">Task</label>
      <input style="font-weight:300" v-on:keyup.enter="addOrEdit"  type="text" name="todo" id="todo" value="" />
      <p v-on:click="addTask" id="addBt" class="bt">Add</p>
      <p id="editBtn" v-on:click="saveEdit" class="bt">Save Edit</p>
    </div>
    <datetime type="time" 
      use12-hour
     v-model="date">
    </datetime>
    <datetime type='date' 
    :format="{ year: 'numeric', month: 'numeric', day: 'numeric',}"
    v-model="time">
    </datetime>
    <div class="todosContainer">
     <transition-group name="slideIn" enter-active-class="animated faster lightSpeedIn" leave-active-class="animated fast hinge">
      <div :key="task.id" v-on:click.stop=showActions($event) v-for="(task,index) in tasks" v-bind:class="{todoCompleted:task.isDone}" class="todo">
        <div class="leftContainer">
          <p class="id">{{task.id}}</p>
          <p class="todoName">{{task.task}}</p>
        </div>
        
        <div v-on:click.stop="markAsDone(task.id,$event)" v-bind:class="{completed:task.isDone}" class="rightContainer">
          <div id="checker">
          </div>
          <div class="Info">
            <p v-bind:class="{shownInfo:task.isDone}" v-if="task.isDone" class="info info-done">Done</p>
            <p v-bind:class="{shownInfo:task.isPast}" class="info info-past">Past</p>
            <p v-bind:class="{shownInfo:task.isNear}" class="info info-near">Near</p>
          </div>
        </div>
        <div class="tactions">
          <img class="ticon" v-on:click.stop="addSubTask(index)" id="editI" src="@/assets/subtask.svg" alt="" />
          <img class="ticon" v-on:click.stop="editTask(index)" id="editI" src="@/assets/editIcon.svg" alt="" />
          <img class="ticon" v-on:click.stop="deleteTask(index)" id="delBt" src="@/assets/trashIcon.svg" alt="" />
        </div>
      </div>
     </transition-group>
    </div>

  </div>
</template>

<script>
import titleBar from '@/components/titleBar.vue'
// import { Datetime } from 'vue-datetime'

export default {
data(){
return{
    tasks:[],
    date:'',
    time:'',
    target:null
}},
components:{
  titleBar
},
methods:{
    addTask(){ 
      const task = document.querySelector("#todo");
      const newTask = {
        id: Date.now(),
        task: task.value,
        dueDate:'',
        dueTime:'',
        subtasks:[],
        isDone:false,
        isPast:false,
        isNear:false,
      }
      if(task.value!=''){
        this.tasks.unshift(newTask);
        localStorage.setItem('tasks', JSON.stringify(this.tasks))

      }
      task.value=''
    },
    addSubTask(indexOfParent){
      const newSubTask = {
        id: Date.now(),
        task: task.value,
        dueDate:'',
        dueTime:'',
        isDone:false,
        isPast:false,
        isNear:false,
      }
      this.tasks[indexOfParent].subtasks.unshift(newSubTask)
    },
    deleteTask(index){
      this.tasks.splice(index,1);
      if(document.querySelector('.editMode')){
        document.querySelector('.editMode').classList.remove('editMode')
      }
      document.querySelector("#todo").value = ''
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
    },
    editTask(index){
      this.target = index
      const input = document.querySelector("#todo")
      input.value = this.tasks[index].task
      document.querySelector('.formArea').classList.add('editMode')
      document.querySelector('#todo').focus()
    },
    saveEdit(){
      const editedTodo = document.querySelector("#todo");
      this.tasks[this.target].task = editedTodo.value;
      editedTodo.value='';
      document.querySelector('.editMode').classList.remove('editMode')
      document.querySelector('.showActions').classList.remove('showActions')
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
    },
    addOrEdit(){
      if(document.querySelector('.formArea').classList.contains('editMode')){
        this.saveEdit()
      }else{
        this.addTask()
      }
    },
    markAsDone(id,e){
      const targetID= this.tasks.map(task=>task.id).indexOf(id)
      this.tasks[targetID].isDone=!this.tasks[targetID].isDone;
      e.currentTarget.parentElement.classList.toggle('task-completed')  
      console.log(e.currentTarget.parentElement);
      console.log(this.tasks[targetID].isDone)
      localStorage.setItem('tasks', JSON.stringify(this.tasks))

    },
    showActions(e){
      let task = e.currentTarget;
       task.classList.toggle('showActions')
    }
  },
  created(){
    setTimeout(()=>{
      const taskInput = document.querySelector('#todo');
      taskInput.addEventListener('focus',()=>{
        document.body.classList.add('addingTask')
      })
      taskInput.addEventListener('focusout',()=>{
        document.body.classList.remove('addingTask')
      })
    },0)
    if(JSON.parse(localStorage.getItem("tasks"))){
      this.tasks = JSON.parse(localStorage.getItem("tasks"))
    }

  }
}
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box
}
body{
  background: #EDE7F6;
}
.todoCompleted .rightContainer{
  border-left: 0.8px solid rgba(157, 166, 168, 0.212);

}
.rightContainer{
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 1px solid rgba(157, 166, 168, 0.61);
  height: 100%;
  position: relative;
  padding: 10px;
}
.leftContainer{
  padding: 10px;
}
.Info{
  text-align: center;
  position: absolute;
  font-size: 0.8em;
  bottom: 0px;
  width: 100%;
  background: rgb(20, 179, 145);
  padding: 2px;
  color: white;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  transform: scaleY(0);
  transform-origin: bottom;
  transition: 0.2s;
  transition-delay: 0.15s;
}
.info{
  display: none;
}
.shownInfo{
  display: block;
}
.completed .Info{
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  transform: scaleY(1);
}
#checker{
  width: 25px;
  height: 25px;
  border: 2px solid #8E24AA;
  border-radius:100%;
  transition: 0.2s;
}
.completed #checker{
  margin-top: -15px;
  /* border-radius: 5%; */
  background: #8E24AA;
}
.todosContainer{
  width:100%;
  display: block;
  padding-bottom: 55px;
}
.mainTodoContainer{
  position: relative;
  width: 100%;
  height: 100vh;
  padding: 0;
  margin: 0 !important;
}
input{
  display: block;
  padding: 5px;
  font-size: 1.2em;
  outline: none;
  border: none;
  border-bottom: 0.5px solid #757575;
  margin-left: 5px;
  background: #EEEEEE;
  width: 96%;
  margin-top: 5px;
}
label{
  font-size: 1.2em;
  margin-left: 5px;

}
.formArea{
  margin: 10px;
  margin-top: 60px;
  padding: 5px;
  padding-bottom:10px;
  background: white;
  box-shadow: 2px 2px 5px #BDBDBD;
  border-radius:10px;
  min-height: 100px;
  position: relative;
}
.bt{
  background: #8E24AA;
  padding: 5px;
  font-size: 1.2em;
  text-align: center;
  border-radius: 3px;
  width: 98%;
  margin:auto;
  margin-top: 10px;
  text-align: center;
  color: white;
  transition: 0.2s ease;
}
#editBtn{
  transform: scaleY(0);
  display: none;
}
#addBt{
  transform: scaleY(1);
  display: block;
}
.editMode #editBtn{
  transform: scaleY(1);
  display: block;
}
.editMode #addBt{
  transform: scaleY(0);
  display: none;
}
.todo{
  background: white;
  border-radius: 2px;
  display: grid;
  grid-template-columns: 4fr 1fr;
  margin: 10px;
  position: relative;
  font-size: 1.2em;
  font-weight: 300;
  box-shadow: 2px 2px 5px #BDBDBD;
  min-height: 60px; 
  align-items: center;
  margin-bottom:10px;
  transition: 0.2s ease;
  padding: 0px;
}
.todoCompleted .todoName{
  color: gray;
}
.todoCompleted{
  border-bottom: 2.5px solid rgb(20, 179, 145);
}
.id{
  display: none;
}
.tactions{
  position: absolute;
  bottom: -50px;
  right: 0px;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  background: white;
  box-shadow: 5px 5px 5px #BDBDBD;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  transform: scaleY(0);
  transform-origin: top;
  transition: 0.15s;
  padding-right: 5px;
  padding-left: 5px;
}
.todoCompleted .tactions{
  border-bottom: 2.5px solid rgb(20, 179, 145);
}
.showActions{
  margin-bottom:60px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  border-bottom-left-radius: 15px;
  box-shadow: 5px 5px 5px #BDBDBD;

}
.showActions .Info{
  border-radius: 10px;
  font-size: 0.65em;
  width: 90%;
  bottom: 3px;
}
.showActions .tactions{
  transform: scaleY(1);
}
.showActions .ticon{
  opacity: 1;
  transform: scale(1)
}
.ticon{
  width: 45px;
  border-radius: 10px;
  padding: 5px;
  transform: scale(0);
  transform-origin:center;
  opacity: 0;
  transition: 0.2s all;
}


</style>