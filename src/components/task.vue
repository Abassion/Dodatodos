<template>
  <div class="Task">
    <div class="Task__name" :class="{animatedOutline : $store.getters.takingTour == 7}">
      <h2>{{ $store.getters.currentTask }}</h2>
      <div class="Task__status">
        <button class="btna btna--primary" @click="addcard = !addcard " :class="{animatedOutline : $store.getters.takingTour == 7}">
          <p class="button__text"> Add a card</p>
         
          <span class="Task__done">
            <svg>
              <use xlink:href="../assets/symbol-defs.svg#icon-plus-square"></use>
            </svg>
          </span>
        </button>
        <div class="Task__status__addcard" v-show="addcard">
        
          
            <button
              @click="TaskTypes.push({name : 'checklist' , lines: [] , newData : true}) ; addcard = !addcard; updatethedb()"
              :style="{backgroundColor : TaskTypes.find(x=>x.name == 'checklist') ? '#ccc' : '#fff' , pointerEvents : TaskTypes.find(x=>x.name == 'checklist') ? 'none' : ''}"
            >Checklist  <svg>
              <use xlink:href="../assets/symbol-defs.svg#icon-clipboard-list"></use>
            </svg>
            </button>
        
      
            <button
              @click="TaskTypes.push({name : 'description' , lines: [{name : '' , checked : false}]}) ; addcard = !addcard ;updatethedb() "
              :style="{backgroundColor : TaskTypes.find(x=>x.name == 'description') ? '#ccc' : '#fff' , pointerEvents : TaskTypes.find(x=>x.name == 'description') ? 'none' : ''}"
            >Desciption  <svg>
              <use xlink:href="../assets/symbol-defs.svg#icon-edit-3"></use>
            </svg>
            </button>
      
      
            <button
              @click="TaskTypes.push({name : 'notes' , lines : [] , newData : true}) ; addcard = !addcard; updatethedb()"
              :style="{backgroundColor : TaskTypes.find(x=>x.name == 'notes') ? '#ccc' : '#fff', pointerEvents : TaskTypes.find(x=>x.name == 'notes') ? 'none' : '' }"
            >Notes  <svg>
              <use xlink:href="../assets/symbol-defs.svg#icon-note"></use>
            </svg>
            </button>
         
        </div>
        <button class="btna btna--fortiary" @click="changeData" :class="{animatedOutline : $store.getters.takingTour == 7}">
          <p class="button__text">Done</p>
          <span class="Task__delete">
            <svg>
              <use xlink:href="../assets/symbol-defs.svg#icon-checkmark"></use>
            </svg>
          </span>
        </button>
        <button class="btna btna--tertiary" @click="deletee" :class="{animatedOutline : $store.getters.takingTour == 7}">
          <p class="button__text">   Delete</p>
  
          <span class="Task__delete">
            <svg>
              <use xlink:href="../assets/symbol-defs.svg#icon-bin"></use>
            </svg>
          </span>
        </button>
      </div>
    </div>
    <div class="Task__main" ref="body" :style="{filter : addcard ? 'blur(2px)' : 'blur(0px)'}" v-show="($store.getters.takingTour >=6 || !$store.getters.takingTour )&& $store.getters.takingTour!==7">
      <div class="countdown" title="todo couldown" :class="{animatedOutline : $store.getters.takingTour == 9}">
   
        {{countdown}}</div>
      <div class="Task__placeholder" v-if="TaskTypes.length == 0">
        <h1>There are no cards to show</h1>
        <p>you can add a cards by clicking 'Add a card' button above</p>
      </div>
      <div class="Task__wrapper" v-if="!TaskTypes.length == 0">
        <div
          class="Task__type"
          v-for="(type,index) in TaskTypes"
          :key="index"
          :style="{flexBasis : type.name == 'notes'? '95%' : '50%' , order :   type.name == 'notes'? 3 : 0}"
        >
          <div class="Task__type__card" v-if="type.name =='checklist'" :class="{animatedOutline : $store.getters.takingTour == 8}">
            <div class="card__header">
              <p>Checklist</p>
              <div class="svgs">
                <svg :style="{fill : '#137ee2'}" title="add an item" @click="type.newData=true ">
                  <use xlink:href="../assets/symbol-defs.svg#icon-add-solid"></use>
                </svg>
                <svg :style="{fill : 'red'}" @click="TaskTypes.splice(index,1) ; updatethedb()">
                  <use xlink:href="../assets/symbol-defs.svg#icon-bin"></use>
                </svg>
                <svg>
                  <use xlink:href="../assets/symbol-defs.svg#icon-dots-three-horizontal"></use>
                </svg>
              </div>
            </div>
            <ul class="Task__type__body">
              <li class="Task__type__p" v-for="(line,i) in TaskTypes[index].lines" :key="i">
                <input
                  class="input1"
                  type="checkbox"
                  v-model="line.checked"
                  @click=" line.checked = !line.checked
                updatethedb()
                "
                >

                <span>{{line.name}}</span>

                <svg class="svg1" @click="splice(index,i , TaskTypes[index].name , line.name )">
                  <use xlink:href="../assets/symbol-defs.svg#icon-bin"></use>
                </svg>

                <svg class="svg2">
                  <use xlink:href="../assets/symbol-defs.svg#icon-checkmark"></use>
                </svg>
              </li>
              <li
                class="Task__type__p"
                style="padding : 0 !important"
                v-show="TaskTypes[index].newData"
                @keypress.enter="
                 TaskTypes[index].newData = !TaskTypes[index].newData 
                 TaskTypes[index].lines.push({ name: input2, checked: false }); 
                  updatethedb(true)           
                  input2 = ''"
              >
                <input
                ref="input"
                  type="text"
                  class="input2"
                  id="input2"
                  v-model="input2"
                  placeholder="add an objectif"
                >
              </li>
            </ul>
          </div>
          <div class="Task__type__description" v-if="type.name =='description'" :class="{animatedOutline : $store.getters.takingTour == 8}">
            <div class="card__header">
              <p>Description</p>
              <div class="svgs">
                <svg :style="{fill : 'red'}" @click="TaskTypes.splice(index,1) ; updatethedb()">
                  <use xlink:href="../assets/symbol-defs.svg#icon-bin"></use>
                </svg>
                <svg>
                  <use xlink:href="../assets/symbol-defs.svg#icon-dots-three-horizontal"></use>
                </svg>
              </div>
            </div>
            <div class="card__body">
              <textarea
                name="des"
                id="des"
                rows="auto"
                placeholder="write something..."
                v-model="TaskTypes[index].lines[0].name"
                @input="updatethedb()"
              ></textarea>
            </div>
          </div>
          <div class="Task__type__notes" v-if="type.name =='notes'" :class="{animatedOutline : $store.getters.takingTour == 8}">
            <div class="card__header">
              <p>Notes</p>
              <div class="svgs">
                <svg :style="{fill : '#137ee2'}">
                  <use
                    xlink:href="../assets/symbol-defs.svg#icon-add-solid"
                    @click="type.newData=true"
                  ></use>
                </svg>
                <svg :style="{fill : 'red'}" @click="TaskTypes.splice(index,1) ; updatethedb()">
                  <use xlink:href="../assets/symbol-defs.svg#icon-bin"></use>
                </svg>
                <svg>
                  <use xlink:href="../assets/symbol-defs.svg#icon-dots-three-horizontal"></use>
                </svg>
              </div>
            </div>
            <div class="stickersWrapper">
              <div class="stickers" v-for="(note,n) in type.lines" :key="n">
                <textarea type="text" class="input3" v-model="note.name" :style="{}"></textarea>
                <div class="delete" @click="type.lines.splice(n,1) ;updatethedb()">
                  <svg :style="{fill : 'red'}">
                    <use xlink:href="../assets/symbol-defs.svg#icon-bin"></use>
                  </svg>
                </div>
                
              </div>
              <div
               ref="textarea"
                class="stickers"
                v-show="type.newData"
                @keypress.enter="
                 TaskTypes[index].newData = !TaskTypes[index].newData 
                 TaskTypes[index].lines.push({ name: input3, checked: false }); 
                 updatethedb()           
                  input3 = ''"
              >
                <textarea
                  type="text"
                  class="input3"
                  id="input3"
                  v-model="input3"
                  placeholder="add an note"
                ></textarea>
                <p>click ENTER to save</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db, FieldValue } from "@/firebase";
import firebase from "firebase";

export default {
  data() {
    return {
      TaskTypes: [],
      input2: "",
      input3: "",
      descinput: "",
      CheckboxInput: false,
      progressOpacity: 0,
      addcard: false,
      blur : false,
      countdown : null,
    };
  },
  mounted() {
  
    var currentTime = new Date()
    currentTime =currentTime.getHours()*3600 + currentTime.getMinutes()*60 + currentTime.getSeconds() 
 
    var howMuchLeft = this.$store.getters.currentTaskTiming !== '0:00' ?   this.$store.getters.currentTaskTiming .split(':') : [0,0]
   
    howMuchLeft = (parseInt(howMuchLeft[0])*3600 + parseInt(howMuchLeft[1])*60);
     
      if(this.$store.getters.takingTour){
        howMuchLeft = 86100;
      }
    howMuchLeft = howMuchLeft - currentTime;
  
    if(howMuchLeft > 0) {
        var int = setInterval(() => {
      howMuchLeft--
      var hours = Math.floor(howMuchLeft/3600);
      var mins = Math.floor((howMuchLeft%3600)/60)
      var secs  = Math.floor((howMuchLeft%3600)%60)
      this.countdown = `${hours> 9 ? hours : '0' + hours} : ${mins> 9 ? mins : '0' + mins} : ${secs> 9 ? secs : '0' + secs}`
      if(howMuchLeft ==0) {
        clearInterval(int)
      }
    }, 1000);
    }else {
      this.countdown = '0:00:00'
    }
  
  },

  created() {
    if(!this.$store.getters.takingTour){
         var tasks = db
      .collection("users")
      .doc(this.$store.getters.currentUser)
      .collection("days")
      .doc(`day ${this.$store.getters.currentDay}`)
      .collection("tasks");
    tasks
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          if (doc.id == this.$store.getters.currentTask)
           var data = doc.data();
          for (let key in data) {
            if (!key.match(/^task/)) {
              var lines = [];
              for (let i in data[key]) {
                lines.push({ name: i, checked: data[key][i].checked });
              }
              this.TaskTypes.push({ name: key, lines: lines, newData: false });
            }
          }
        });
      }) 
    }else {
        this.TaskTypes.push({ name: 'checklist', lines: [{name : 'Go to gym' , checked : false}], newData: false });
        this.TaskTypes.push({ name: 'description', lines: [{name : 'I must go to another gym today' , checked : false}], newData: false });
        this.TaskTypes.push({ name: 'notes', lines: [{name : 'oh! The new gym was so much better' , checked : false}], newData: false });
    }
 
  },

  methods: {
    focus(element){
        this.$nextTick(function(){
        element.focus();
       });
    },

    updatethedb(isItTrue) {
      var send = {};
      for (let el in this.TaskTypes) {
        var obj = {};
        for (let line in this.TaskTypes[el].lines) {
          var obj1 = {};
          obj1.checked = this.TaskTypes[el].lines[line].checked;
          obj[this.TaskTypes[el].lines[line].name] = obj1;
        }
        send[this.TaskTypes[el].name] = obj;
      }
      if (isItTrue) {
        this.$store.commit("totalTodos", this.$store.getters.totalTodos + 1);
      }

      send.taskName = this.$store.getters.currentTask;
      send.taskTiming = this.$store.getters.currentTaskTiming;
      send.taskState = this.$store.getters.currentTaskState;
     
      db.collection("users")
        .doc(this.$store.getters.currentUser)
        .collection("days")
        .doc(`day ${this.$store.getters.currentDay}`)
        .update({ totalTodos: this.$store.getters.totalTodos });

      db.collection("users")
        .doc(this.$store.getters.currentUser)
        .collection("days")
        .doc(`day ${this.$store.getters.currentDay}`)
        .collection("tasks")
        .doc(`${this.$store.getters.currentTask}`)
        .set(send);
    },
    deletee() {
      db.collection("users")
        .doc(this.$store.getters.currentUser)
        .collection("days")
        .doc(`day ${this.$store.getters.currentDay}`)
        .collection("tasks")
        .doc(`${this.$store.getters.currentTask}`)
        .delete();
      this.$router.go(-1);
    },
    changeData() {
      var progress = (1 / this.$store.getters.totalTasks) * 100;
      db.collection("users")
        .doc(this.$store.getters.currentUser)
        .collection("days")
        .doc(`day ${this.$store.getters.currentDay}`)
        .collection("tasks")
        .doc(`${this.$store.getters.currentTask}`)
        .update({ taskState: true });
      db.collection("users")
        .doc(this.$store.getters.currentUser)
        .collection(`days`)
        .doc(`day ${this.$store.getters.currentDay}`)
        .update({
          dayProgress: this.$store.getters.dayProgress
        });
      this.$router.go(-1);
    },
    splice(i1, i, taskname, linename) {
      if (this.TaskTypes[i1].lines.length > 1) {
        this.TaskTypes[i1].lines.splice(i, 1);
        var obj = {};
        var obj1 = {};
        for (let j = 0; j < this.TaskTypes[i1].lines.length; j++) {
          var obj2 = {};
          obj2.checked = this.TaskTypes[i1].lines[j].checked;
          obj1[this.TaskTypes[i1].lines[j].name] = obj2;
        }
        obj[taskname] = obj1;
        db.collection("users")
          .doc(this.$store.getters.currentUser)
          .collection("days")
          .doc(`day ${this.$store.getters.currentDay}`)
          .collection("tasks")
          .doc(`${this.$store.getters.currentTask}`)
          .update(obj);
      } else {
        this.TaskTypes.splice(i1, 1);
        var obj = {};
        obj[taskname] = FieldValue.delete();
        db.collection("users")
          .doc(this.$store.getters.currentUser)
          .collection("days")
          .doc(`day ${this.$store.getters.currentDay}`)
          .collection("tasks")
          .doc(`${this.$store.getters.currentTask}`)
          .update(obj);
      }
      obj[taskname] = obj1;
      this.$store.commit("totalTodos", this.$store.getters.totalTodos - 1);
      db.collection("users")
        .doc(this.$store.getters.currentUser)
        .collection("days")
        .doc(`day ${this.$store.getters.currentDay}`)
        .set({ totalTodos: this.$store.getters.totalTodos });
    },
  }
};
</script>

<style lang="scss" scoped>
.Task {

  &__placeholder {
    padding: 1rem 2rem 5rem 2rem;
    text-align: center;
    color: rgb(119, 119, 119);
    font-size: 1.2rem;
  }
  &__name {
    display: flex;
    align-items: center;
    padding: 3rem 5rem;
     border-bottom: 1px solid rgba(51,51,51,0.25);
    box-shadow: 1rem 0 4rem rgba(51,51,51,0.40);
           @media screen and (max-width:600px) {
           
           padding: 2rem 1.5rem;
        
           
      }
    h2 {
      font-size: 3.5rem;
      text-transform: uppercase;
      letter-spacing: 4px;
             @media screen and (max-width:400px) {
           
           font-size: 2.5rem;
        
           
      }

    }
    button {
          @media screen and (max-width:600px) {
            padding: 0;
            height: 4rem;
            width: 4rem;
           margin-right: 1rem;
           position: relative;
           span {
             position: absolute;
             left: 50%;
             top: 46%;
             transform: translate(-50%,-50%)
           }
      }
    }
  }

  &__main {
    min-height: 85vh;
    padding-top: 2rem;
    background-image: linear-gradient(to right bottom, rgba(#92d187,0.4), rgba(#40d8a8,0.4));
    border-radius: 5px;
  }

  &__wrapper {
    display: flex;
    flex-wrap: wrap;
    padding: 3rem;
    margin: 0 auto;
  }

  &__status {
    margin-left: auto;
    position: relative;
    svg {
      height: 1.75rem;
      width: 1.75rem;
      fill: #fff;
      position: absolute;
      right: 1rem;
      bottom: 28%;
          @media screen and (max-width:600px) {
          position: static;
          }
    }
    &__addcard {
    
      position: absolute;
      width: 25rem;
      top: 5rem;
      right: 15rem;
      padding: 1rem 2rem;
      border-radius: 10px;
      font-size: 1.5rem;
       @media screen and (max-width:600px) {
          right: 3rem;
          }
      z-index: 2;
      span {
        font-size: 1.6rem;
        font-family: inherit;
      }
      button {
         background-color: #fff;
         color: black;
         padding: 1rem 2rem;
          border-radius: 5px;
          border: 1px solid #5f9655;
          display: flex;
          width: 15rem;
          align-items: center;
          justify-content: space-between;
          svg {
            height: 2rem;
            width: 2rem;
            fill: rgb(51,51,51);
            justify-self: end;
            position: static;
          }
      }
      & > * {
        margin: 2rem 2rem;


      }
     
    }
  }

  &__type {
    flex: 0 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 3rem;
    padding: 0 2rem;
        @media screen and (max-width:600px) {
          flex-basis: 100% !important;
          padding: 0;
      }
    & > * {
      border: 1px solid #40d8a8 ;
      border-radius: 10px;
      background-color: #fff;
    }
    &__body {
      min-height: 5.5rem;
    }
    
    .card__header {
      width: 100%;
      height: 3.5rem;
      display: flex;
      align-items: center;
      font-size: 2rem;
      border-bottom: 1px solid #40d8a8 ;
      padding: 0.5rem 1.5rem;
      justify-content: space-between;
      p {
        margin: 0;
        padding: 0;
      }
      svg {
        height: 1.7rem;
        width: 1.7rem;
        &:not(:last-child) {
          margin-right: 1.5rem;
        }
        margin-top: -0.5rem;
      }
      .svgs {
        position: relative;
      }
    }
    .card__body {
      display: flex;
      flex-wrap: wrap;
      min-height: 5rem;
    }
    &__notes {
      min-height: 20rem;
      border-radius: 10px;
      .stickers {
        min-height: 15rem;
        min-width: 15rem;
        max-width: 20rem;
        flex: 0 0 25%;
        display: flex;
        justify-content: center;
        padding: 1em;
        padding: 0.8rem;
        font-size: 1.5em;
        margin: 3rem;
        transform: rotate(-10deg);
        transition: all 0.5s;
        background: rgb(255, 255, 120);
        position: relative;
        p {
          position: absolute;
          top: 80%;
          left: 50%;
          transform: translateX(-50%);
          font-size: 1rem;
        }
          @media screen and (max-width:600px) {
          min-width: 16rem;
        }
           @media screen and (max-width:400px) {
          width: 80%;
          font-size: 2rem;
        }
    
        .delete {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          z-index: 1;
          background-color: rgba(red, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          opacity: 0;
          cursor: pointer;
          svg {
            height: 5rem;
            width: 5rem;
            fill: rgba(red, 0.8);
          }
        }
        &:hover {
          transform: rotate(0);
          & .delete {
            opacity: 1;
          }
        }
      }
    }
    &__card {
      width: 100%;

      border-radius: 10px;
    }
    &__description {
      width: 100%;
      overflow: hidden;
      textarea {
        width: 100%;
        height: 100%;
        padding: 1rem;
        font-size: 2rem;
        font-family: "Open Sans";
        font-weight: 500;
        border: none;
      }
    }

    &__header {
      display: flex;
      position: relative;
      margin-right: 4rem;
      margin-bottom: 1rem;
      &__input {
        background-color: transparent;
        border: none;
        font-size: 2rem;
        color: rgb(19, 126, 226);
      }

      &__svgadd {
        height: 1.5rem;
        width: 1.5rem;
        fill: rgb(19, 126, 226);
        position: absolute;
        left: 80%;
        top: 20%;
      }

      &__svgmodify {
        height: 2rem;
        width: 2rem;
        fill: rgb(19, 126, 226);
        position: absolute;
        pointer-events: none;
        left: 95%;
      }
    }

    &__body {
      margin: 2rem auto;
      list-style: none;
      width: 80%;

      li {
        font-size: 1.8rem;
        width: 80%;
        margin: 0 auto;
        border-bottom: 0.5px solid rgb(230, 230, 230);
        padding-bottom: 1rem;
        margin-bottom: 1.5rem;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .input1 {
          position: absolute;
          left: -3rem;
          top: 50%;
          transform: translateY(-70%);

          &:checked ~ span {
            text-decoration: line-through;
          }
          &:checked ~ .svg1 {
            display: none;
            opacity: 0;
          }
          &:checked ~ .svg2 {
            display: initial;
            opacity: 1;
          }
        }
        .input2 {
          height: 3rem;
          width: 100%;
          font-size: inherit;
          border: none;
        }

        svg {
          height: 1.55rem;
          width: 1.55rem;

          opacity: 0.25;
          right: -5rem;

          transition: all 0.5s;
          &:hover {
            opacity: 1;
          }
        }

        .svg1 {
          fill: red;
        }
        .svg2 {
          fill: rgb(61, 179, 61);
          display: none;
          opacity: 0;
        }
      }
    }
  }


}
.input3 {
  width: 90%;
  background-color: inherit;
  border: none;
  height: 100%;
  margin: 0 auto;
}
.button__text {
  margin: 0;
      @media screen and (max-width:600px) {
          display: none;;
      }
}
.stickersWrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.countdown {
  position: absolute;
  top: 1rem;
  right: 2rem;
  font-size: 2.1rem;
  letter-spacing: 3px;
  color: rgba(0, 0, 0, 0.397);
  
}
</style>
