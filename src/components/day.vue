<template>
  <div class="dayContainer">
    <div class=" day__header " :class="{animatedOutline : $store.getters.takingTour == 4}">
      <div class="day__current">
        <span v-if="!$store.getters.showNotes">Todos</span>
        <span v-else>Notes</span>
      </div>
      <h1>Day {{$store.getters.currentDay}}</h1>
      <div class="day__props">
        <button
          class="btna btna--primary"
          @click="$store.commit('showNotes')"
          :style="{padding : '1rem 2rem'}"
        >
          <span v-if="!$store.getters.showNotes">Show notes</span>
          <span v-else>Show todos</span>
        </button>
        <svg
          @click="addDropdownMenu = !addDropdownMenu"
          :style="{fill : $route.name == 'days'? 'rgb(19, 126, 226)':'rgb(51,51,51)' , cursor : 'pointer'}"
        >
          <use xlink:href="../assets/symbol-defs.svg#icon-plus-square"></use>
        </svg>
        <div class="addDropdownMenu" v-if="addDropdownMenu">
          <span @click="show = !show ; addDropdownMenu = !addDropdownMenu">add a todo</span>
          <span @click="showNote = !showNote ; addDropdownMenu = !addDropdownMenu">add a note</span>
        </div>
        <transition name="fade">
          <div class="form" v-show="show">
            <svg @click="show = !show">
              <use xlink:href="../assets/symbol-defs.svg#icon-x-altx-alt"></use>
            </svg>
            <div class="form__header">
              <h4>add a new todo</h4>
            </div>
            <div class="form__body">
              <div class="form-group">
                <label for="taskName">Todo name</label>
                <input type="text" placeholder="add todo name" v-model="taskName" name="taskName">
              </div>
              <div class="form-group">
                <label for="taskTiming">Todo timing (optional)</label>
                <input
                  type="time"
                  placeholder="todo starting time (optional)"
                  v-model="taskTiming"
                  name="taskTiming"
                >
              </div>

              <p v-show="feedback">{{feedback}}</p>
              <button @click.prevent="Addtask()">ADD</button>
            </div>
          </div>
        </transition>
      </div>

      <div class="day__note" v-show="showNote">
        <textarea name="day__note" cols="30" rows="5" v-model="note"></textarea>
        <button
          class="day__button"
          @click="sendNote(note) ; notes.push(note) ; note = ''  ; showNote = !showNote"
        >add note</button>
        <svg @click="showNote = !showNote">
          <use xlink:href="../assets/symbol-defs.svg#icon-x-altx-alt"></use>
        </svg>
      </div>
    </div>
    <transition name="slidein" mode="out-in">
      <div
        class="body"
        :class="{blur : showNote || addDropdownMenu || show}"
        v-show="$store.getters.takingTour !==4"
      >
        <div class="main" v-if="!$store.getters.showNotes && tasks.length !== 0">
          <transition-group name="slidein" mode="out-in">
            <div
              v-for="task in tasks"
              class="task"
              :key="task.taskName"
              @click="$router.push({name : 'task' , params : {id : $store.getters.currentDay  , taskid : task.taskName , userid : $store.getters.displayUsername ,taskTiming : task.taskTiming ,taskState :task.taskState}})
             $store.commit('currentTask',  task.taskName)
             $store.getters.takingTour?  $store.commit('takingTour', $store.getters.takingTour +1) : ''
             "
              :class="{stateColor : task.taskState}"
              :style="{pointerEvents : $store.getters.takingTour == 5 ? 'all' : ''}"
            >
              <h3>{{ task.taskName }}</h3>
              <div class="task__priority">
                <svg>
                  <use xlink:href="../assets/symbol-defs.svg#icon-clock"></use>
                </svg>
                {{ task.taskTiming }}
              </div>
              <div
                class="task__time"
                @click.stop="task.taskState = !task.taskState ; updatethedb(task.taskState ,task.taskName) ; blinkit(task.taskState)"
              >
                <span v-show="task.taskState">
                  <svg>
                    <use xlink:href="../assets/symbol-defs.svg#icon-checkmark"></use>
                  </svg>
                </span>
              </div>
              <arrow
                class="day-arrow"
                :style="{top:'-7rem',left : '0%' }"
                v-if="$store.getters.takingTour ==5 && task.taskName == 'Example'"
              ></arrow>
            </div>
          </transition-group>
          <div
            class="task__done"
            :style="{opacity : taskdoneopa , transition : 'opacity 1s'}"
            v-if="thestate"
          >
            <p>task done</p>
          </div>
        </div>

        <div class="todo__text" v-if="!$store.getters.showNotes && tasks.length == 0">
          <h1>There are no todos to show</h1>
          <p>you can also add a todo by clicking on the (+) icon top right</p>
        </div>
        <transition name="fade">
          <div class="addtask" v-show="!$store.getters.showNotes && $store.getters.takingTour!==5" @click="show = true ">
            <p>add a new todo ...</p>
            <button>
              <svg :style="{fill : $route.name == 'days'? 'rgb(19, 126, 226)':'rgb(51,51,51)'}">
                <use xlink:href="../assets/symbol-defs.svg#icon-add-solid"></use>
              </svg>
            </button>
          </div>
        </transition>

        <div class="notes" v-if="$store.getters.showNotes">
          <div class="notes__text" v-show="notes.length == 0">
            <h1>There are no notes to show</h1>
            <p>you can add a note by clicking on the (+) icon above</p>
          </div>
          <div class="notes__note" v-for="(note,ind) in notes" :key="ind">
            <div class="notes__note__header">
              <h2>note</h2>
            </div>
            <div class="notes__note__body">
              <p>{{ note }}</p>
            </div>
          </div>
        </div>
        <div
          class="progresss-bar"
          :style="{ opacity : progressOpacity}"
          style="transition : opacity 1.5s"
        >
          <span>{{ $store.getters.dayProgress }} %</span>
          <div
            class="progresss-bar__inner"
            :style="{width : $store.getters.dayProgress  + '%' }"
            style="transition : width 2s"
          ></div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { db, FieldValue } from "@/firebase";
import arrow from "./arrow.vue";
export default {
  data() {
    return {
      tasks: [],
      show: false,
      taskName: "",
      taskTiming: null,
      taskState: null,
      showNote: false,
      notes: [],
      note: "",
      taskdoneopa: null,
      thestate: null,
      feedback: "",
      progressOpacity: 0,
      addDropdownMenu: false
    };
  },
  components: {
    arrow
  },
  methods: {
    Addtask() {
      if (this.taskName.match(/^\d+/) || this.taskName == "") {
        this.feedback =
          "make sure you fill the fields with the right informations";
        return;
      }
      this.feedback = "";
      this.show = !this.show;
      var obj = {
        taskName: this.taskName,
        taskTiming: this.taskTiming || "0:00",
        taskState: false
      };
      if (this.tasks.length == 0) {
        db.collection("users")
          .doc(this.$store.getters.currentUser)
          .collection(`days`)
          .doc(`day ${this.$store.getters.currentDay}`)
          .set({ totalTodos: 0, dayProgress: 0 });
      }
      db.collection("users")
        .doc(this.$store.getters.currentUser)
        .collection(`days`)
        .doc(`day ${this.$store.getters.currentDay}`)
        .collection("tasks")
        .doc(`${this.taskName}`)
        .set(obj)
        .then(() => {
          this.taskName = "";
          this.taskTiming = null;
        });
      this.tasks.push(obj);
      this.$store.commit("totalTasks", this.$store.getters.totalTasks + 1);
    },

    sendNote(note) {
      db.collection("users")
        .doc(this.$store.getters.currentUser)
        .collection("days")
        .doc(`day ${this.$store.getters.currentDay}`)
        .collection("notes")
        .add({ note: note });
    },
    updatethedb(taskState, task) {
      this.progressOpacity++;
      setTimeout(() => {
        this.progressOpacity--;
      }, 3500);
      taskState
        ? this.$store.commit(
            "dayProgress",
            this.$store.getters.dayProgress +
              (1 / this.$store.getters.totalTasks) * 100 <
              94
              ? this.$store.getters.dayProgress +
                  (1 / this.$store.getters.totalTasks) * 100
              : 100
          )
        : this.$store.commit(
            "dayProgress",
            this.$store.getters.dayProgress -
              (1 / this.$store.getters.totalTasks) * 100 >
              0
              ? this.$store.getters.dayProgress -
                  (1 / this.$store.getters.totalTasks) * 100
              : 0
          );
      db.collection("users")
        .doc(this.$store.getters.currentUser)
        .collection(`days`)
        .doc(`day ${this.$store.getters.currentDay}`)
        .update({
          dayProgress: this.$store.getters.dayProgress
        });

      db.collection("users")
        .doc(this.$store.getters.currentUser)
        .collection(`days`)
        .doc(`day ${this.$store.getters.currentDay}`)
        .collection("tasks")
        .doc(`${task}`)
        .update({
          taskState: taskState
        });
    },
    blinkit(state) {
      this.taskdoneopa = 0.8;
      this.thestate = state;
      setTimeout(() => {
        this.taskdoneopa = 0;
      }, 2500);
      setTimeout(() => {
        this.thestate = false;
      }, 3000);
    }
  },
  created() {
    var arr = [];
    var arr2 = [];
    var tt = 0;

    db.collection("users")
      .doc(this.$store.getters.currentUser)
      .collection("days")
      .doc(`day ${this.$store.getters.currentDay}`)
      .collection("tasks")
      .get()
      .then(function(doms) {
        doms.forEach(dom => {
          if (
            !arr.find(x => {
              x.taskName == dom.data().taskName;
            })
          )
            tt++;
          arr.push({
            taskName: dom.data().taskName,
            taskTiming: dom.data().taskTiming,
            taskState: dom.data().taskState
          });
        });
      })
      .then(() => {
        this.$store.commit("totalTasks", tt);
      });
    db.collection("users")
      .doc(this.$store.getters.currentUser)
      .collection("days")
      .doc(`day ${this.$store.getters.currentDay}`)
      .collection("notes")
      .get()
      .then(function(doms) {
        doms.forEach(dom => {
          arr2.push(dom.data().note);
        });
      });

    this.tasks = arr;
    this.notes = arr2;
    this.$store.getters.takingTour
      ? this.tasks.push({
          taskName: "Example",
          taskTiming: "23:55",
          taskState: false
        })
      : 0;
  }
};
</script>

<style lang="scss" >
$red: #ff4136;
$green: #42b745;

.main {
  transition: all 1s;
}
.dayContainer {
  transition: all 1s;
  position: relative;
  padding-bottom: 1rem;
  height: calc(100% - 6rem);
  background-color: rgba(skyblue, 0.25);
  .form {
    background-color: white;
    width: 60%;
    border: 2px solid rgb(19, 126, 226);
    padding: 1.5rem;
    border-radius: 10px;
    position: fixed;
    top: 60%;
    left: 50%;
    z-index: 5;
    transform: translate(-50%, -50%);
    @media screen and (max-width: 600px) {
      width: 80%;
    }

    input {
      padding: 0.75rem 2rem;
      border-radius: 5px;
      border: 1px solid #ccc;
      width: 45%;

      &::placeholder {
        font-weight: 600;
        text-transform: uppercase;
        color: rgb(126, 126, 126);
      }

      &:focus {
        border: 3px solid rgb(19, 126, 226);
      }
    }
    svg {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      height: 2rem;
      width: 2rem;
      fill: red;
    }
    button {
      width: 30%;
      margin: 1.5rem auto;
      margin-top: 3rem;
      padding: 1rem 2rem;
      background-color: rgb(19, 126, 226);
      border: none;
      border-radius: 100px;
      color: #fff;
      text-transform: uppercase;
      font-size: 2rem;
    }

    &__header {
      text-align: center;
      padding: 1rem 0;
      h4 {
        font-size: 2.5rem;
        margin-bottom: 2rem;
        text-transform: uppercase;
        color: rgb(19, 126, 226);
      }
    }

    &__body {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      position: relative;
      p {
        flex: 0 0 100%;
        text-align: center;
        color: red;
        font-weight: 600;
        font-size: 1.5rem;
        margin-top: 2rem;
      }
    }
    .form-group {
      flex: 0 0 50%;
      display: flex;
      flex-direction: column;

      padding: 0 3rem;
      @media screen and (max-width: 600px) {
        padding: 0 1rem;
      }

      label {
        display: block;
        font-size: 1.2rem;
        margin-bottom: 1rem;
      }
      input {
        width: 80%;
        @media screen and (max-width: 600px) {
          width: 90%;
        }
      }
    }
  }
}
.addtask {
  font-size: 2rem;
  background-color: #fff;
  width: 70%;
  margin: 0 auto;
  display: flex;
  padding: 1rem 2rem;
  align-items: center;
  border-radius: 10px;
  box-shadow: inset 0rem 0rem 1rem rgba(2, 116, 223, 0.2);
  border: 1px solid rgba(2, 116, 223, 0.4);
  justify-content: space-between;
  cursor: pointer;
  @media screen and (max-width: 600px) {
    width: 100%;
  }

  svg {
    height: 4rem;
    width: 4rem;
    fill: rgb(19, 126, 226);
  }
  p {
    text-transform: uppercase;
    font-family: sans-serif;
    padding-top: 0.8rem;
  }
  button {
    border: none;
    background-color: transparent;
  }
}
.body {
  position: relative;
  height: calc(100% - 12.5rem);
  padding: 4rem 2rem;
}
.task {
  width: 70%;
  margin: 0 auto;
  border-radius: 10px;
  display: flex;
  position: relative;
  justify-content: space-between;
  padding: 1rem 2rem;
  box-shadow: 0rem 1rem 2rem rgba(0, 0, 0, 0.247);
  background-color: rgba(2, 116, 223, 0.699);
  margin-bottom: 1.5rem;
  cursor: pointer;
  position: relative;
  @media screen and (max-width: 600px) {
    width: 100%;
  }
  h3 {
    font-size: 3rem;
    text-transform: uppercase;
    color: #fff;
    cursor: pointer;
  }

  svg {
    height: 2rem;
    width: 2rem;
    fill: #fff;
    margin-right: 1rem;
  }

  &__priority {
    position: absolute;
    left: 45%;
    top: 30%;
    display: flex;

    font-size: 1.5rem;
    color: #fff;
    align-self: center;
  }
  &__done {
    height: 4rem;
    background-color: $green;
    width: 20rem;
    margin: 0rem auto 1rem auto;
    transition: opacity 2s;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-family: "Open Sans";
    font-size: 1.6rem;
    text-transform: uppercase;
    border-radius: 25px;
    p {
      padding-top: 0.75rem;
    }
  }

  &__time {
    height: 4rem;
    width: 4rem;
    background-color: #fff;
    border-radius: 50%;
    position: absolute;
    right: 2rem;
    z-index: 5;
    cursor: pointer;
    span {
      height: 3rem;
      width: 3rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      background: $green;
      svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
}

.day {
  &__header {
    display: flex;
    background-color: white;
    color: black;
    padding: 1rem 2.5rem;
    align-items: center;
    justify-content: space-between;
    position: relative;
    border-bottom: 1px solid rgba(51, 51, 51, 0.25);
    box-shadow: 1rem 0 2rem rgba(51, 51, 51, 0.25);
    h1 {
      font-size: 3rem;
      text-transform: uppercase;
      letter-spacing: 5px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      letter-spacing: 10px;
    }

    svg {
      height: 4rem;
      width: 4rem;
      fill: black;
      margin-left: 2rem;
    }
  }

  &__note {
    position: absolute;
    top: 110%;
    left: 50%;
    z-index: 1;
    border: 3px solid rgb(19, 126, 226);
    border-radius: 5px;
    transform: translateX(-50%);
    textarea {
      font-family: "Open Sans";
      padding: 1rem;
      position: relative;
      border: none;
      width: 100%;
      font-size: 1.5rem !important;
    }
    svg {
      height: 1.5rem;
      width: 1.5rem;
      position: absolute;
      top: 0;
      right: 0;
      fill: $red;
      margin: 0.6rem;
    }
  }

  &__button {
    padding: 0.5rem 2rem;
    width: 100%;
    margin-top: auto;
    background-color: rgb(19, 126, 226);
    border-radius: 3px;
    border: none;
    color: #fff;
    font-size: 1.5rem;
  }

  &__props {
    display: flex;
    align-items: center;
    .btna {
      @media screen and (max-width: 600px) {
        display: none;
      }
    }
  }
  &__current {
    font-size: 3rem;

    font-family: inherit;
  }
}

.notes {
  padding: 2rem;
  position: relative;
  display: flex;
  &__text {
    position: absolute;
    top: 100%;
    left: 50%;
    padding: 2rem 4rem;
    width: 80%;
    transform: translate(-50%, -50%);
    color: rgb(51, 51, 51);
    background-color: #fff;
    text-align: center;
    border-radius: 25px;
    h1 {
      font-size: 3rem;
    }
    p {
      font-size: 1.3rem;
    }
  }

  &__note {
    background-color: #fff;
    margin: 1rem 1.5rem;
    border-radius: 5px;
    font-size: 2rem;
    &__header {
      text-align: center;
      background-color: rgb(19, 126, 226);
      color: #fff;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      font-size: 1.5rem;
      padding: 0 2rem;
    }

    &__body {
      padding: 1rem 2rem;
      font-family: "Srisakdi";
      font-weight: 700;
      line-height: 4rem;
    }
  }
}

.addDropdownMenu {
  position: absolute;
  right: 0.6rem;
  top: 7rem;
  z-index: 20;
  span {
    display: block;
    padding: 1rem 2rem;
    margin-bottom: 1rem;
    border-radius: 10px;
    font-size: 2rem;
    background-color: #fff;
    animation-name: comein;
    border: 1px solid rgba(2, 116, 223, 0.4);
    animation-duration: 1s;
    cursor: pointer;
  }

  @keyframes comein {
    from {
      opacity: 0;
      top: -2rem;
      transform: rotateX(-90deg);
    }
    to {
      opacity: 1;
      top: 7rem;
      transform: rotateX(0deg);
    }
  }
}
.todo__text {
  position: static;
  margin: 1rem auto;
  width: 70%;
  padding: 2rem 4rem;
  color: rgb(51, 51, 51);
  background-color: #fff;
  text-align: center;
  border-radius: 25px;
  border: 1px solid rgba(2, 116, 223, 0.4);
  h1 {
    font-size: 3rem;
  }
  p {
    font-size: 1.3rem;
  }
  @media screen and (max-width: 600px) {
    width: 100%;
  }
}
.progresss-bar {
  background-color: rgb(243, 243, 243);
  width: 60%;
  margin: 0 auto;
  margin-top: 0.5rem;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  font-size: 2rem;
  color: rgb(0, 0, 0);
  text-align: center;

  &__inner {
    padding: 1.5rem 0;
    background-color: rgb(61, 179, 61);

    width: 5%;
  }
  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0.9;
  }
}

.day-arrow {
  transform: rotate(180deg);

  @keyframes comeandgo {
    from {
      transform: rotate(45deg) translate(-30%, -20%);
    }
    to {
      transform: rotate(45deg) translate(0, 0);
    }
  }
  animation-name: comeandgo;
  @media screen and (max-width: 600px) {
    transform: rotate(270deg);
    @keyframes go {
      from {
        transform: rotate(270deg) translate(-150%, +250%);
      }
      to {
        transform: rotate(270deg) translate(-130%, +250%);
      }
    }
    animation-name: go;
  }
}
</style>
