import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import router from './router'
import { db /*FieldValue */ } from "@/firebase";

Vue.use(Vuex);

var store =  new Vuex.Store({
state : {
 currentDay : 0,
 currentTask : 'randomName',
 currentTaskTiming : '0:00',
 currentTaskState : false,
 currentUser: null,
 displayUsername : null,
 totalTasks: 0,
 dayProgress : 0,
 totalTodos : 0,
 totalTodosActive : 0,
 notifications : 0,
 loading : false,
 showNotes : false,
 todoPannel : false,
 taskName : '',
 taskTiming : '',
 taskState : '',
 takingTour : false,
},
getters : {
   totalTodos(state) {
      return state.totalTodos;
   },
   totalTodosActive(state) {
      return state.totalTodosActive;
   },
   currentDay (state) {
      return state.currentDay
   },
   currentUser(state){
      return state.currentUser;
   },
   displayUsername(state){
      return state.displayUsername;
   },
   notifications(state) {
      return state.notifications
   },
   currentTask(state) {
      return state.currentTask;
   },
   dayProgress(state){
      return state.dayProgress;
   },
   loading(state) {
      return state.loading;
   },
   totalTasks(state) {
      return state.totalTasks;
   },
   currentTaskTiming(state){
      return state.currentTaskTiming;
   },
   currentTaskState(state){
      return state.currentTaskState;
   },
   showNotes (state) {
      return state.showNotes
   },
   todoPannel (state) {
      return state.todoPannel
   },
   taskName(state) {
      return state.taskName;
   },
   taskTiming(state){
      return state.taskTiming;
   },
   taskState(state) {
      return state.taskState;
   },
   takingTour(state) {
      return state.takingTour;
   }

},
mutations : {
 currentDay(state,currentDay){
    state.currentDay = currentDay;
 },
 currentTask (state , currentTask) {
    state.currentTask = currentTask
 },
 currentTaskState(state,param) {
   state.currentTaskState = param;
 },
 currentTaskTiming(state,param) {
   state.currentTaskTiming = param;
 },
 displayUsername(state,param) {
   state.displayUsername = param;
 },
 totalTodos( state , totalTodos) {
    state.totalTodos =  parseInt(totalTodos)
 },
 totalTodosActive( state , totalTodosActive) {
   state.totalTodosActive =  parseInt(totalTodosActive)
},
 dayProgress(state,dayProgress) {
    state.dayProgress  = parseInt(dayProgress)
 },
 signout() {
   firebase.auth().signOut();
 },
 takingTour(state,phase){
    switch(phase) {
       case 0 : 
       state.takingTour = 0;
       break;
       case 1 :
         router.push({name : 'calendar' , params : {userid : state.currentUser}});
         setTimeout(() => {
            state.takingTour = 1;
         }, 2000);
         break;
         case 2 : 
         state.takingTour = 2;
         break;
         case 3 : 
         state.takingTour = 100;
         setTimeout(() => {
            state.takingTour = 3;
         }, 2000);
         router.push({name : 'days' , params : {userid : state.currentUser , id : state.currentDay}});
         break;
         case 4 : 
         state.takingTour = 4;
         break;
         case 5 : 
        
      
            state.takingTour = 5;
        
         break;
         case 6 : 
         state.takingTour = 100;
         setTimeout(() => {
            state.takingTour = 6;
         }, 2000);
         break;
         case 7 : 
         state.takingTour = 7;
         break;
         case 8 : 
         state.takingTour = 8;
         break;
         case 9 : 
         state.takingTour = 9;
         break;
         case 10 : 
         state.takingTour = 100;
         router.push({name : 'main' , params : {userid : state.currentUser }});
         setTimeout(() => {
            state.takingTour = 10;
         }, 1500);
         break;

    }
  
 },
 loading(state) {
   state.loading = !state.loading;
 },
 currentUser(state,username) {
   state.currentUser = username;
},
 notifications(state,notifications){
   state.notifications = notifications;
 },
 totalTasks(state,totalTasks) {
   state.totalTasks = totalTasks;
 },
 showNotes(state) {
   state.showNotes = !state.showNotes;
 },
 todoPannel(state) {
   state.todoPannel = !state.todoPannel;
 },
 addGlobalTodo(state,[taskName,taskTiming]) {
      var date = new Date()
      var howManyDaysInCurrentMounth= new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
      var dataObj = {
         taskName: taskName,
         taskTiming: taskTiming ,
         taskState: false
       }
      for(let i=1 ;i <= howManyDaysInCurrentMounth ; i++) {
         db.collection("users").doc(state.currentUser).collection('days').doc('day '+i).collection('tasks').doc(taskName).set(dataObj)
         db.collection("users").doc(state.currentUser).collection('days').doc('day '+i).get().then(doc=> {
            if(!doc.exist) {
               db.collection("users").doc(state.currentUser).collection('days').doc('day '+i).set({dayProgress :0 , totalTodos  : 0})
            }
         })
      }
    

 },
 resetUserData(state,user){
   var days = {};
   db.collection("users")
   .doc(user)
   .collection("days")
   .get()
   .then(snapshot => {
     snapshot.forEach(day => {
       days[day.id] = { tasks: {} };
       db.collection("users")
         .doc(user)
         .collection("days")
         .doc(day.id)
         .collection("tasks")
         .get()
         .then(tasks => {
           tasks.forEach(task => {
             days[day.id].tasks[task.id] = task.id;
           });
         })
         .then(() => {
           for (let day in days) {
             var tis = days[day].tasks;
             for (let t in tis) {
               db.collection("users")
                 .doc(user)
                 .collection("days")
                 .doc(day)
                 .collection("tasks")
                 .doc(t)
                 .delete();
             }
             db.collection("users")
               .doc(user)
               .collection("days")
               .doc(day)
               .delete();
           }
         });
     });
   })
 }
},
actions : {
   signout(context) {
      context.commit('signout')
   },
   addGlobalTodo(context,[taskName , taskTiming]){
      context.commit('addGlobalTodo' , [taskName ,taskTiming])
   },
   resetUserData(context,user){
      context.commit('resetUserData',user)
   }
}
})


export default store;