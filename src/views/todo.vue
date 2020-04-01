<template>
  <div class="mainTodoContainer">
      <div class="titleArea">
          <p>Tasks</p>
          <img class="more" src="@/assets/more.svg" alt="">
      </div>

    <div  accept-charset="utf-8" class="formArea">
      <label for="to-do" style="font-weight:300">Task</label>
      <input tyle="font-weight:300" v-on:keyup.enter="addOrEdit"  type="text" name="todo" id="todo" value="" />
      <p v-on:click="addTodo" id="addBt" class="bt">Add</p>
      <p id="editBtn" v-on:click="saveEdit" class="bt">Save Edit</p>
    </div>

    <div class="todosContainer">
     <transition-group name="slideIn" enter-active-class="animated faster lightSpeedIn" leave-active-class="animated fast hinge">
      <div :key="todo.id" v-on:click.stop=showActions($event) v-for="(todo,index) in todos" class="todo">
        <p class="id">{{todo.id}}</p>
        <p class="todoName">{{todo.todo}}</p>
        <div v-on:click="markAsDone(todo.id)" v-bind:class="{completed:todo.isDone}" id="checker">
        </div>
        <div class="tactions">
          <img class="ticon" v-on:click="editTodo(index)" id="editI" src="@/assets/editIcon.svg" alt="" />
          <img class="ticon" v-on:click="deleteTodo(index)" id="delBt" src="@/assets/trashIcon.svg" alt="" />
        </div>
      </div>
     </transition-group>
    </div>

  </div>
</template>

<script>
export default {
data(){
return{
    todos:[],
    target:null
}},
  methods:{
    addTodo(){ 
      const todo = document.querySelector("#todo");
      const newTodo = {
        id: Date.now(),
        todo: todo.value,
        isDone:false
      }
      if(todo.value!=''){
        this.todos.unshift(newTodo);
        localStorage.setItem('tasks', JSON.stringify(this.todos))

      }
      todo.value=''
    },
    deleteTodo(index){
      this.todos.splice(index,1);
      if(document.querySelector('.editMode')){
        document.querySelector('.editMode').classList.remove('editMode')
      }
      document.querySelector("#todo").value = ''
      localStorage.setItem('tasks', JSON.stringify(this.todos))
    },
    editTodo(index){
      this.target = index
      const input = document.querySelector("#todo")
      input.value = this.todos[index].todo
      document.querySelector('.formArea').classList.add('editMode')
      document.querySelector('#todo').focus()
    },
    saveEdit(){
      const editedTodo = document.querySelector("#todo");
      this.todos[this.target].todo = editedTodo.value;
      editedTodo.value='';
      document.querySelector('.editMode').classList.remove('editMode')
      document.querySelector('.showActions').classList.remove('showActions')
      localStorage.setItem('tasks', JSON.stringify(this.todos))
    },
    addOrEdit(){
      if(document.querySelector('.formArea').classList.contains('editMode')){
        this.saveEdit()
      }else{
        this.addTodo()
      }
    },
    markAsDone(id){
      const targetID= this.todos.map(todo=>todo.id).indexOf(id)
      this.todos[targetID].isDone=!this.todos[targetID].isDone
      console.log(this.todos[targetID].isDone)
      localStorage.setItem('tasks', JSON.stringify(this.todos))

    },
    showActions(e){
      let todo;
      if(e.target.classList.contains('todo')){
        todo = e.target; 
        todo.classList.toggle('showActions')

      }else if(e.target.classList.contains('todoName')){
        todo=e.target.parentElement;      
        todo.classList.toggle('showActions')

      }

    }
  },
  created(){
    if(JSON.parse(localStorage.getItem("tasks"))){
      this.todos = JSON.parse(localStorage.getItem("tasks"))
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
#checker{
  width: 25px;
  height: 25px;
  border: 2px solid #8E24AA;
  border-radius:100%;
  transition: 0.2s ease-out;
  display: inline-block;
  position: absolute;
  right: 10px;
  top:50%;
  transform: translateY(-50%)
}
.completed{
  border-radius: 5%;
  background: #8E24AA;
  transform: scale(2)
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
  display: flex;
  margin: 10px;
  padding: 10px;
  position: relative;
  font-size: 1.2em;
  font-weight: 300;
  box-shadow: 2px 2px 5px #BDBDBD;
  min-height: 60px; 
  align-items: center;
  margin-bottom:10px;
  transition: 0.2s ease;

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
.showActions{
  margin-bottom:60px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  border-bottom-left-radius: 15px;
  box-shadow: 5px 5px 5px #BDBDBD;

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