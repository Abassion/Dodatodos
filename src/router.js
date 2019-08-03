import Vue from "vue";
import VueRouter from "vue-router";
import Firebase from "firebase";
import calendar from "./components/calendar.vue";
import day from "./components/day.vue";
import task from "./components/task.vue";
import profile from "./components/profile.vue";
import home from "./components/home.vue";
import main from "./components/main.vue";
import about from "./components/about.vue";
import store from "./store";
import NProgress from "nprogress";
import {db} from './firebase';
import { networkInterfaces } from "os";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      component: home,
      name: "home",
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/profile",
      component: profile,
      name: "profile",
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/users/:userid/calendar",
      component: calendar,
      name: "calendar",
      props: true,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: "/users/:userid/days/:id",
      component: day,
      name: "days",
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/users/:userid/days/:id/tasks/:taskid",
      component: task,
      name: "task",
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/users/:userid",
      name: "main",
      component: main,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/about",
      name: "about",
      component: about,
      props: false,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(route => route.meta.requiresAuth);
  const doesExist = to.matched.some(route => route.name == to.name)
  var counter = 0;

  if(to.name == 'days' || to.name == 'task' ){
      store.commit('currentDay',to.path.match(/\d+/g)[0])
  }
  if(to.name=='days' && (to.path.match(/\d+/g)[0]>31 || (to.path.match(/\d+/g)[0]==0 && !store.getters.takingTour))) {
    next('/')
    return
  }


  if(to.path == '/') {
    next()
    return
  }
  if(to.name == 'main' && store.getters.takingTour < 2) {
    store.commit('takingTour',0);
  }
  var fn = setInterval(() => {
    var currentUser = Firebase.auth().currentUser;
    if (currentUser || counter > 1000) {
      db.collection("users")
        .doc("currentUser")
        .get()
        .then(snapshot => {
          store.commit("currentUser", snapshot.data().username);
          store.commit("displayUsername", snapshot.data().displayUsername);
        }).then(()=>{
            if (requiresAuth && currentUser && doesExist) {
                if (to.name == "days" || to.name =="task" || to.name =="calendar") {     
                    db.collection("users")
                      .doc(store.getters.currentUser)
                      .collection("days")
                      .doc(`day ${store.getters.currentDay}`)
                      .get()
                      .then(doc => {
                          if(doc.exists){
                            store.commit(
                              "dayProgress",
                              doc.data().dayProgress 
                            );
                          }else {
                            store.commit(
                              "dayProgress",
                              0
                            );
                          }             
                      }).then(()=> {
          
                        if (to.name == "task") {
                 
                          store.commit('currentTask',to.path.match(/\w+$/)[0])
                          db.collection("users")
                            .doc(store.getters.currentUser)
                            .collection("days")
                            .doc(`day ${store.getters.currentDay}`)
                            .collection('tasks')
                            .doc(store.getters.currentTask)
                            .get()
                            .then(doc => {
                                if(doc.exists){    
                                    store.commit(
                                        "currentTaskTiming",
                                        doc.data().taskTiming 
                                      );
                                      
                                      store.commit(
                                        "currentTaskState",
                                        doc.data().taskState 
                                    );
                                }
                            }).then(()=>{
                              next();
                            });;
                        }else {
                          next()
                        }
                      })
                
                  }else {
                    next()
                  }
              } else if ((requiresAuth && !currentUser) || !doesExist) {
                next('/');
               
              } else {
                next();
              }
              clearInterval(fn);
        });
    }
    counter += 50;
  }, 50);

 
});
router.afterEach((to)=> {
  window.scrollTo(0,0)

  // if(store.getters.takingTour == 1) 
})
export default router;
