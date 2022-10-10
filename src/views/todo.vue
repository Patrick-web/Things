<template>
  <div class="mainTodoContainer">
    <div accept-charset="utf-8" class="formArea">
      <div v-on:click="resetAll" class="formResetBt">Cancel</div>
      <input
        style="font-weight: 300"
        v-on:keyup.enter="enterTrigger"
        type="text"
        name="todo"
        id="todo"
        v-model="todoText"
        placeholder="Enter a todo"
      />
      <div v-if="todoText">
        <p v-on:click="addTask" id="addBt" class="bt">Add</p>
        <p id="editBtn" v-on:click="saveEdit" class="bt">Save Edit</p>
        <p id="subEditBtn" v-on:click="saveSubtaskEdit" class="bt">Save Edit</p>
        <p id="addSubBt" v-on:click="addSubTask" class="bt">Add Subtask</p>
      </div>
    </div>
    <div class="todosContainer">
      <transition-group
        name="slideIn"
        enter-active-class="animated faster lightSpeedIn"
        leave-active-class="animated fast hinge"
      >
        <div
          :key="task.id"
          v-on:click.stop="showActions($event)"
          v-for="(task, index) in tasks"
          class="todo"
        >
          <div v-bind:class="{ todoCompleted: task.isDone }" class="maintodo">
            <div class="leftContainer">
              <p class="id">{{ task.id }}</p>
              <p class="taskIndex" style="display: none">{{ index }}</p>
              <p class="todoName">{{ task.task }}</p>
            </div>

            <div
              v-on:click.stop="markTaskAsDone(index, $event)"
              v-bind:class="{ completed: task.isDone }"
              class="rightContainer"
            >
              <div id="checker"></div>
              <div class="Info">
                <p
                  v-bind:class="{ shownInfo: task.isDone }"
                  v-if="task.isDone"
                  class="info info-done"
                >
                  Done
                </p>
              </div>
              <p
                v-bind:class="{ shownAlert: task.isPast }"
                class="alert alert-past"
              >
                Past
              </p>
              <p
                v-bind:class="{ shownAlert: task.isNear }"
                class="alert alert-near"
              >
                Near
              </p>
            </div>
            <div class="tactions">
              <img
                class="ticon"
                v-on:click.stop="prepareSubAdd(index)"
                id="editI"
                src="@/assets/subtask.svg"
              />
              <img
                class="ticon"
                v-on:click.stop="editTask(index)"
                id="editI"
                src="@/assets/editIcon.svg"
              />
              <img
                class="ticon"
                v-on:click.stop="deleteTask(index)"
                id="delBt"
                src="@/assets/trashIcon.svg"
              />
            </div>
          </div>

          <div class="subTasksContainer">
            <transition-group
              name="slideIn"
              enter-active-class="animated faster lightSpeedIn"
              leave-active-class="animated fast hinge"
            >
              <div
                :key="subtask.id"
                v-on:click.stop="showActions($event)"
                v-for="(subtask, index) in task.subtasks"
                v-bind:class="{ todoCompleted: subtask.isDone }"
                class="todo todo-sub"
              >
                <div class="leftContainer">
                  <p class="id">{{ subtask.id }}</p>
                  <p class="todoName">{{ subtask.task }}</p>
                </div>

                <div
                  v-on:click.stop="markSubAsDone(index, $event)"
                  v-bind:class="{ completed: subtask.isDone }"
                  class="rightContainer"
                >
                  <div id="checker"></div>
                  <div class="Info">
                    <p
                      v-bind:class="{ shownInfo: subtask.isDone }"
                      v-if="subtask.isDone"
                      class="info info-done"
                    >
                      Done
                    </p>
                  </div>
                  <p
                    v-bind:class="{ shownAlert: subtask.isPast }"
                    class="alert alert-past"
                  >
                    Past
                  </p>
                  <p
                    v-bind:class="{ shownAlert: subtask.isNear }"
                    class="alert alert-near"
                  >
                    Near
                  </p>
                </div>
                <div class="tactions">
                  <img
                    class="ticon"
                    v-on:click.stop="editSubTask(index, $event)"
                    id="editI"
                    src="@/assets/editIcon.svg"
                    alt=""
                  />
                  <img
                    class="ticon"
                    v-on:click.stop="deleteSubTask(index, $event)"
                    id="delBt"
                    src="@/assets/trashIcon.svg"
                    alt=""
                  />
                </div>
              </div>
            </transition-group>
          </div>
          <!-- subTasksContainer -->
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import titleBar from "@/components/titleBar.vue";
// import { Datetime } from 'vue-datetime'

export default {
  data() {
    return {
      tasks: [],
      date: "",
      time: "",
      target: null,
      targetTsk: null,
      targetMaintask: null,
      targetSubtask: null,
      subtasksPreviousState: [],
      todoText: "",
    };
  },
  components: {
    titleBar,
  },
  methods: {
    removeFocus() {
      document.querySelector("#todo").blur();
    },
    persistToStorage() {
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },
    resetAll() {
      this.removeSubAddMode();
      this.removeEditSubMode();
      this.removeMainTaskEditMode();
      document.querySelector("#todo").value = "";
      if (document.querySelector(".showActions")) {
        document.querySelector(".showActions").classList.remove("showActions");
      }
      if (document.querySelector(".colapseSubs")) {
        document.querySelector(".colapseSubs").classList.remove("colapseSubs");
      }
    },
    addTask() {
      const task = document.querySelector("#todo");
      const newTask = {
        id: Date.now(),
        task: task.value,
        dueDate: "",
        dueTime: "",
        subtasks: [],
        isDone: false,
        isPast: false,
        isNear: false,
      };
      if (task.value != "") {
        this.tasks.unshift(newTask);
        this.persistToStorage();
      }
      task.value = "";
    },
    prepareSubAdd(index) {
      this.targetTsk = index;
      document.querySelector(".formArea").classList.add("subAddMode");
      document.querySelector("#todo").focus();
      document.querySelector("#todo").value = "";
      this.removeMainTaskEditMode();
      this.removeEditSubMode();
    },
    addSubTask() {
      const newSubTask = {
        id: Date.now(),
        task: this.getInput(),
        dueDate: "",
        dueTime: "",
        isDone: false,
        isPast: false,
        isNear: false,
      };
      if (this.getInput()) {
        this.tasks[this.targetTsk].subtasks.unshift(newSubTask);
        this.tasks[this.targetTsk].isDone = false;
        this.reset();
        this.persistToStorage();
        this.removeFocus();
      }
    },
    removeSubAddMode() {
      if (
        document.querySelector(".formArea").classList.contains("subAddMode")
      ) {
        document.querySelector(".formArea").classList.remove("subAddMode");
      }
    },
    removeEditSubMode() {
      if (
        document
          .querySelector(".formArea")
          .classList.contains("editModeSubtask")
      ) {
        document.querySelector(".formArea").classList.remove("editModeSubtask");
      }
    },
    removeMainTaskEditMode() {
      if (document.querySelector(".formArea").classList.contains("editMode")) {
        document.querySelector(".formArea").classList.remove("editMode");
      }
    },
    deleteTask(index) {
      this.tasks.splice(index, 1);
      if (document.querySelector(".editMode")) {
        document.querySelector(".editMode").classList.remove("editMode");
      }
      document.querySelector("#todo").value = "";
      this.persistToStorage();
    },
    deleteSubTask(subIndex, e) {
      const mainTaskIndex =
        e.target.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector(
          ".taskIndex"
        ).textContent;
      this.tasks[mainTaskIndex].subtasks.splice(subIndex, 1);
      this.persistToStorage();
    },
    editTask(index) {
      this.target = index;
      const input = document.querySelector("#todo");
      input.value = this.tasks[index].task;
      document.querySelector(".formArea").classList.add("editMode");
      document.querySelector("#todo").focus();
      this.removeSubAddMode();
      this.removeEditSubMode();
    },
    editSubTask(subIndex, e) {
      const mainTaskIndex =
        e.target.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector(
          ".taskIndex"
        ).textContent;
      this.targetMaintask = mainTaskIndex;
      this.targetSubtask = subIndex;
      const subtask = this.tasks[mainTaskIndex].subtasks[subIndex];
      const input = document.querySelector("#todo");
      input.value = subtask.task;

      // document.querySelector('.formArea').classList.add('editMode')
      document.querySelector(".formArea").classList.add("editModeSubtask");
      if (document.querySelector(".formArea").classList.contains("editMode")) {
        document.querySelector(".formArea").classList.remove("editMode");
      } else if (
        document.querySelector(".formArea").classList.contains("subAddMode")
      ) {
        document.querySelector(".formArea").classList.remove("subAddMode");
      }
      document.querySelector("#todo").focus();
    },
    saveEdit() {
      if (this.getInput()) {
        this.tasks[this.target].task = this.getInput();
        this.persistToStorage();
        this.removeFocus();
        this.reset();
      }
    },
    saveSubtaskEdit() {
      if (this.getInput()) {
        this.tasks[this.targetMaintask].subtasks[this.targetSubtask].task =
          this.getInput();
        this.persistToStorage();
        this.removeFocus();
        this.reset();
      }
    },
    getInput() {
      const editedTodo = document.querySelector("#todo");
      return editedTodo.value;
    },
    reset() {
      const todoInput = document.querySelector("#todo");
      todoInput.value = "";
      if (document.querySelector(".editMode")) {
        document.querySelector(".editMode").classList.remove("editMode");
      }
      if (document.querySelector(".editModeSubtask")) {
        document
          .querySelector(".editModeSubtask")
          .classList.remove("editModeSubtask");
      }
      if (document.querySelector(".subAddMode")) {
        document.querySelector(".subAddMode").classList.remove("subAddMode");
      }
      if (document.querySelector(".showActions")) {
        document.querySelector(".showActions").classList.remove("showActions");
        document.querySelector(".colapseSubs").classList.remove("colapseSubs");
      }
    },
    enterTrigger() {
      if (document.querySelector(".formArea").classList.contains("editMode")) {
        this.saveEdit();
      } else if (
        document.querySelector(".formArea").classList.contains("subAddMode")
      ) {
        this.addSubTask();
      } else if (
        document
          .querySelector(".formArea")
          .classList.contains("editModeSubtask")
      ) {
        this.saveSubtaskEdit();
      } else {
        this.addTask();
      }
    },
    markTaskAsDone(taskIndex, e) {
      this.tasks[taskIndex].isDone = !this.tasks[taskIndex].isDone;

      if (this.tasks[taskIndex].isDone) {
        setTimeout(() => {
          const completedtask = this.tasks[taskIndex];
          this.tasks.splice(taskIndex, 1);
          this.tasks.push(completedtask);
        }, 500);
        this.tasks[taskIndex].subtasks.forEach((subtask) => {
          subtask.isDone = true;
        });
      }
      this.persistToStorage();
    },
    markSubAsDone(subIndex, e) {
      const mainTaskindex =
        e.target.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector(
          ".taskIndex"
        ).textContent;
      this.tasks[mainTaskindex].subtasks[subIndex].isDone =
        !this.tasks[mainTaskindex].subtasks[subIndex].isDone;

      if (this.tasks[mainTaskindex].subtasks[subIndex].isDone) {
        setTimeout(() => {
          const completedtask = this.tasks[mainTaskindex].subtasks[subIndex];
          this.tasks[mainTaskindex].subtasks.splice(subIndex, 1);
          this.tasks[mainTaskindex].subtasks.push(completedtask);
        }, 500);
      }

      let allSubsDone = true;
      this.tasks[mainTaskindex].subtasks.forEach((sub) => {
        if (!sub.isDone) {
          allSubsDone = false;
        }
      });
      if (!allSubsDone) {
        this.tasks[mainTaskindex].isDone = false;
      } else {
        this.tasks[mainTaskindex].isDone = true;
      }

      this.persistToStorage();
    },
    showActions(e) {
      let task = e.currentTarget.querySelector(".maintodo");
      if (task) {
        //Handles showing actions for Maintasks
        task.classList.toggle("showActions");
        task.parentElement.classList.toggle("colapseSubs");
      } else {
        //Handles showing actions for subtasks
        task = e.currentTarget;
        task.classList.toggle("showActions");
      }
    },
  },
  created() {
    setTimeout(() => {
      const taskInput = document.querySelector("#todo");
      taskInput.addEventListener("focus", () => {
        document.body.classList.add("addingTask");
      });
      taskInput.addEventListener("focusout", () => {
        document.body.classList.remove("addingTask");
      });
    }, 0);
    if (JSON.parse(localStorage.getItem("tasks"))) {
      this.tasks = JSON.parse(localStorage.getItem("tasks"));
    }
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  background: #ede7f6;
}
.todoCompleted .rightContainer {
  border-left: 0.8px solid rgba(157, 166, 168, 0.212);
}
.pickerArea {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  padding-right: 10px;
  padding-left: 10px;
}
.picker {
  position: relative;
}
.picker img {
  position: absolute;
  pointer-events: none;
  width: 40px;
}
.vdatetime-input {
  opacity: 0;
}
.pickerArea input {
  height: 30px;
  width: 30px;
  display: none !important;
}
.rightContainer {
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 1px solid rgba(157, 166, 168, 0.61);
  height: 100%;
  position: relative;
  padding: 10px;
}
.leftContainer {
  padding: 10px;
}
.colapseSubs {
  margin-bottom: 60px !important;
}
.colapseSubs .subTasksContainer {
  /* transform: scaleY(0); */
  opacity: 0.5;
  margin-top: -60px;
  border-top-left-radius: 10px;
  pointer-events: none;
  /* height:0; */
}
.subTasksContainer {
  margin-top: -10px;
  margin-left: 10px;
  display: flex;
  justify-content: flex-end;
  width: 97%;
  background: linear-gradient(180deg, lavender, rgba(255, 248, 218, 0.397));
  transition: 0.2s all;
  transform-origin: bottom;
}
.mainTodoContainer,
.subTasksContainer span {
  width: 100%;
}
.Info {
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
.alert {
  position: absolute;
  top: -25px;
  color: white;
  padding: 2px;
  width: 50px;
  text-align: center;
  right: 0;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  /* display: none; */
}
.alert-past {
  background: rgb(240, 12, 171);
  display: none;
  transform: scaleY(0);
}
.alert-near {
  background: rgb(250, 186, 9);
  transform: scaleY(0);
}
.nearing {
  border-bottom: 2.5px solid rgb(250, 186, 9);
}
.nearing .alert-near {
  transform: scaleY(1);
}
.pastDueDate {
  border-bottom: 2.5px solid rgb(240, 12, 171);
}
.pastDueDate .alert-past {
  transform: scaleY(1);
}
.completed .Info {
  border-top-left-radius: 15px;
  border-top-right-radius: 0px;
  transform: scaleY(1);
}
#checker {
  width: 25px;
  height: 25px;
  border: 2px solid rgb(20, 179, 145);
  border-style: dotted;
  border-radius: 100%;
  transition: 0.2s;
}
.completed #checker {
  margin-top: -15px;
  background: rgb(20, 179, 145);
}
.todosContainer {
  width: 100%;
  display: block;
  padding-bottom: 55px;
}
.mainTodoContainer {
  position: relative;
  width: 100%;
  height: 100vh;
  padding: 0;
  margin: 0 !important;
}
input {
  display: block;
  padding: 10px;
  font-size: 1.2em;
  outline: none;
  border: none;
  border-radius: 10px;
  margin-left: 5px;
  background: #eeeeee;
  width: 96%;
  margin-top: 5px;
}
label {
  font-size: 1.2em;
  margin-left: 5px;
}
.formArea {
  padding: 5px;
  padding-bottom: 10px;
  background: white;
  box-shadow: 2px 2px 5px #bdbdbd;
  position: relative;
}
.bt {
  background: black;
  padding: 10px 0px;
  font-size: 1.2em;
  text-align: center;
  border-radius: 20px;
  width: 98%;
  margin: auto;
  margin-top: 10px;
  text-align: center;
  color: white;
  transition: 0.2s ease;
}
#addSubBt {
  display: none;
}
#editBtn {
  display: none;
}
#subEditBtn {
  display: none;
}
#addBt {
  display: block;
}
.subAddMode #addSubBt {
  display: block;
}
.subAddMode #editBtn {
  display: none;
}
.subAddMode #addBt {
  display: none;
}
.subAddMode #subEditBtn {
  display: none;
}
.editModeSubtask #editBtn {
  display: none !important;
}
.editModeSubtask #addBt {
  display: none;
}
.editModeSubtask #subEditBtn {
  display: block;
}

.editMode #editBtn {
  display: block;
}
.editMode #addBt {
  display: none;
}
.todo {
  margin-right: 10px;
  margin-top: 0px;
}
.maintodo {
  background: white;
  border-radius: 2px;
  display: grid;
  grid-template-columns: 4fr 1fr;
  margin: 10px;
  position: relative;
  font-size: 1.2em;
  font-weight: 300;
  box-shadow: 2px 2px 5px #bdbdbd;
  min-height: 60px;
  align-items: center;
  margin-bottom: 10px;
  transition: 0.2s ease;
  padding: 0px;
  margin-top: 5px;
  margin-right: 0px;
}

.todo-sub {
  background: white;
  border-radius: 2px;
  display: grid;
  grid-template-columns: 4fr 1fr;
  margin: 10px;
  position: relative;
  font-size: 1.2em;
  font-weight: 300;
  box-shadow: 2px 2px 5px #bdbdbd;
  min-height: 60px;
  align-items: center;
  margin-bottom: 10px;
  transition: 0.2s ease;
  padding: 0px;
  margin-top: 8px;
  margin-right: 0px;
  font-size: 1.1em;
}
.todoCompleted .todoName {
  color: gray;
}
.todoCompleted {
  border-radius: 15px;
  overflow: hidden;
}
.id {
  display: none;
}
.tactions {
  position: absolute;
  bottom: -50px;
  right: 0px;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  background: white;
  box-shadow: 5px 5px 5px #bdbdbd;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  transform: scaleY(0);
  transform-origin: top;
  transition: 0.15s;
  padding-right: 5px;
  padding-left: 5px;
  z-index: 3;
}
.todoCompleted .tactions {
  border-bottom: 2.5px solid rgb(20, 179, 145);
}
.showActions {
  margin-bottom: 60px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  border-bottom-left-radius: 15px;
  box-shadow: 5px 5px 5px #bdbdbd;
}
.showActions .Info {
  border-radius: 10px;
  font-size: 0.65em;
  width: 90%;
  bottom: 3px;
}
.showActions .tactions {
  transform: scaleY(1);
}
.showActions .ticon {
  opacity: 1;
  transform: scale(1);
}
.ticon {
  width: 45px;
  border-radius: 10px;
  padding: 5px;
  transform: scale(0);
  transform-origin: center;
  opacity: 0;
  transition: 0.2s all;
}
.formResetBt {
  position: absolute;
  right: 12px;
  background: rgb(255, 0, 119);
  color: white;
  padding: 2px;
  padding-left: 5px;
  padding-right: 5px;
  border-radius: 2px;
  transform: scaleY(0);
  transition: 0.2s;
}
.subAddMode .formResetBt {
  transform: scaleY(1);
}
.editMode .formResetBt {
  transform: scaleY(1);
}
.editModeSubtask .formResetBt {
  transform: scaleY(1);
}
</style>
