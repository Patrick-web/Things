<template>
    <div  accept-charset="utf-8" class="formArea">
      <label for="to-do" style="font-weight:300">Task</label>
      <input tyle="font-weight:300" v-on:keyup.enter="addOrEdit"  type="text" name="todo" id="todo" value="" />
      <p v-on:click="addTodo" id="addBt" class="bt">Add</p>
      <p id="editBtn" v-on:click="saveEdit" class="bt">Save Edit</p>
    </div>
</template>

<script>
export default {

}
</script>

<style>

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
</style>