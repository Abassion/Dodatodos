<template>
   <div class="appContainer" :style="{pointerEvents : $store.getters.takingTour ? 'none':''}">
         <div class="slider" :style="{left : showSlider ?  0 : '-500px'}">
             <ul>
                    <li v-if="$route.name == 'days'" class="notesShower" @click="$store.commit('showNotes') ; showSlider = !showSlider">
                         <svg class="svg">
                 <use xlink:href="./assets/symbol-defs.svg#icon-note"></use>
                  </svg>  
                     <p v-if="!$store.getters.showNotes">Show notes</p>
                     <p v-else>Show todos</p>
                     </li>
                 <li  @click="notification = !notification ">
                         <svg class="svg">
                 <use xlink:href="./assets/symbol-defs.svg#icon-bell"></use>
                  </svg>  
                     <p>notifications</p>
                     </li>
                      <li @click="showSlider = !showSlider ;$router.go(-1)">
                         <svg class="svg" >
                 <use xlink:href="./assets/symbol-defs.svg#icon-arrow-left"></use>
                  </svg>  
                     <p>Go back</p>
                     </li>
                      <li  @click="$store.commit('signout') ; $router.go('/')">
                         <svg class="svg">
                 <use xlink:href="./assets/symbol-defs.svg#icon-log-out"></use>
                  </svg>  
                     <p>log out</p>
                     </li>
             </ul>
         </div>
        <div class="header" v-if="$route.path !== '/'" :style="{backgroundColor : $route.name == 'days'? 'rgb(19, 126, 226)': $route.name == 'task' ? '#92d187' : 'rgb(51,51,51)' }">
            <svg @click="previous" class="svg svg--1" :style="{fill : $route.name == 'days'? 'rgb(19, 126, 226)': $route.name == 'task' ? '#92d187' : 'rgb(51,51,51)'}">
          <use xlink:href="./assets/symbol-defs.svg#icon-arrow-left"></use>
           </svg>
           <svg @click="showSlider = !showSlider" class="svg svg--2">
          <use xlink:href="./assets/symbol-defs.svg#icon-menu1"></use>
           </svg>
            <h1 class="header__h1" @click="$router.push({name :'main' , userid : $store.getters.currentUser})">Dodatodos</h1>
            <div class="header__icons">
                <button class="btn btn-outline-danger logout" @click="$store.dispatch('signout') ; $router.go('/')">Log out</button>
                <div class="header__icons__notification">
                    <span class="header__icons__notification__symbol" v-show="this.$store.getters.notifications.length > 0">{{ this.$store.getters.notifications.length }}</span>
                    <svg class="header__icons__notification__svg" @click="notification = !notification">
                 <use xlink:href="./assets/symbol-defs.svg#icon-bell"></use>
           </svg>  
                
                </div>

            </div>
        </div>
       <transition name="fadeRoute" mode="out-in">
        <router-view :class="{blur : $store.getters.todoPannel}"></router-view>
       </transition>
<notification class="notification" v-show="notification"></notification>  
 <transition name="fade">
             <div class="form" v-show="$store.getters.todoPannel">
              <svg @click="$store.commit('todoPannel')">
                <use xlink:href="./assets/symbol-defs.svg#icon-x-altx-alt"></use>
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
                  <input type="time" placeholder="todo starting time (optional)" v-model="taskTiming" name="taskTiming">
              </div>
               <p v-show="feedback">{{feedback}}</p>
              <button @click="addTask">ADD</button>
            </div>
          </div>
        </transition>
        <tour v-if="$store.getters.takingTour"></tour>
    </div>
</template>

<script>
import tour from './components/tour'
import notification from './components/notification.vue';
export default {
  name: 'app',
  data() {
      return {
          notification : false,
          showSlider : false,
          reset : null,
          taskName : '',
          taskTiming : null,
          taskState : '',
          feedback : '',
      }
  },
  methods : {
       previous () {
           this.$router.go(-1);
       },
       addTask() {
       
      
        if (this.taskName.match(/^\d+/) || this.taskName == "") {
        this.feedback =
          "make sure you fill the fields with the right informations";
        return;
      }
      this.feedback = '';
    
      this.$store.commit('todoPannel')
      this.$store.dispatch('addGlobalTodo',[this.taskName , this.taskTiming || '0:00'])  ; 
      this.taskName = '';
      this.taskTiming = null;
            }
   },
   components: {
       notification,
       tour
   },
   watch : {
       reset() {
           this.showSlider = false;
           this.notification = false;
       }
   },
    mounted() {
    this.$nextTick(() => {
      window.addEventListener(
        "resize",
        () => (this.reset = window.innerWidth)
      );
    });
  }
  
}
</script>

<style lang="scss">

@import url('https://fonts.googleapis.com/css?family=Open+Sans');
@import url('https://fonts.googleapis.com/css?family=Srisakdi');

$blue : rgb(19, 126, 226);
$red : #FF4136;
$green : #42b745;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
  font-family: 'Open Sans';
  box-sizing: border-box;
  height: 100%;
 
}
body {
    height: 100%;
    width:100%;
}
svg {
    cursor: pointer;
}
.appContainer {
    margin: 0 auto;
    position: relative;
    height: 100%;
}
.btna {
   padding: 1rem 2rem;
  border: none;
  border-radius: 100px;
  font-size: 1.5rem;
  font-weight: 500;
  font-family: inherit;
  position: relative;
  &:not(:last-child) {
    margin-right: 1.5rem;
  }
  &--primary {
  color: white;
  background-color: $blue;
   padding: 1rem 3.5rem 1rem 2rem;
  }

  &--secondary {
    color: $blue;
  background-color:white;
 
  }

  &--tertiary {
    color: white;
    background-color: $red;
     padding: 1rem 3.5rem 1rem 2rem;
  }

  &--fortiary {
    color: white;
    background-color: $green;
     padding: 1rem 3.5rem 1rem 2rem;
  }

}

.stateColor {
    background-color: $green !important;
}


.header {
   
    text-align: center;
    padding: 1.1rem 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    z-index: 3;
    box-shadow: 1rem 0 2rem rgba(51,51,51,0.60);
    transition: all 2s;
    &__h1 {
          font-size: 4.5rem;
          color: #fff;
          font-family: 'Srisakdi';
          font-weight: 600;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%,-50%);    
          cursor: pointer;
          }
    &__icons {
        display: flex;
        align-items: center;
         @media screen and (max-width: 600px){
                 display: none;
    }
        &__notification {
            position: relative;
             &__svg {
                 height: 3rem;
                 width: 3rem;
                 fill: #fff;
                 cursor:pointer;
             }
             &__symbol {
                 position: absolute;
                 background-color: orangered;
                 font-size: 1.25rem;
                 color: #fff;
                 height: 2rem;
                 width: 2rem;
                 padding: .25rem;
                 border-radius: 50%;
                 top: -3px;
                 right: -7px;
             }
        }
        .logout {
            padding: .7rem 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: 500;
            font-size: 1.5rem;
            border-color: white;
            color: white;
            margin-right: 2rem;
        }
    }
}

.choose-date {
    text-align: center;
    padding: 2rem;
}
.notification {
    position: absolute;
  
    box-shadow: 0rem 1rem 4rem rgba(51, 51, 51,.25);
}
.copyright {
    position: absolute  ;
    top: 94%;
    width: 100%;
    left: 50%;
    text-align: center;
    transform: translateX(-50%);
    font-family: 'Open Sans' ;
    font-size: 1.5rem;
    @media screen and (max-height: 500px) {
      display:none;
    }
}
 .svg {
        height: 3.5rem;
        width: 3.5rem;
        background-color: #fff;
        padding: .5rem;
        border-radius: 50%;
        cursor: pointer;
        &--1{
             @media screen and (max-width: 600px){
                 display: none;}
        }
        &--2 {
            display: none;
             @media screen and (max-width: 600px){
         display: inline;
    }
        }
    }
    .slider {
  height: 100%;
  width: 20rem;
  background-color: #fff;
  position: absolute;
  top:0;
  z-index: 2;
  transition: all .6s;
  border-right: 1px solid rgba(51, 51, 51,.25);
  padding-top: 10rem;
  ul {
    font-size: 2rem;
    font-family: inherit;
    margin-bottom: 0;
    li {
      display: flex;
      padding: 1rem 1rem;
      border-bottom : .01rem solid rgba(51, 51, 51,.25);
      cursor: pointer;
      svg {
        margin-right: .6rem;
      }
    }
  }
}
.notesShower {
       @media screen and (min-width: 600px){
                 display: none;
                 
                 }
        
}
  .fadeRoute-enter{
    opacity: 0;
  }
  .fadeRoute-enter-to {
    opacity: 1;
    transition: all 1s;
  }
  .fadeRoute-leave-to {
    opacity: 0;
     transition: all 1s;
  }
  
  .fade-enter {
  transform: translateY(-200px);
  opacity: 0;
}
.fade-enter-to {
  transform: translateY(0px);
  opacity: 1;
  transition: all 0.5s;
}

.fade-leave-to {
  transform: translateY(-200px);
  opacity: 0;
  transition: all 1s;
}

.slidein-enter {
  transform: translate(-100px);
  opacity: 0;
}


.slidein-enter-to {
  transform: translate(0px);
  opacity: 1;
  transition: 0.5s;
}

.slidein-leave-active {
  transition: 0.5s;
  transform: translate(500px);
  opacity: 0;
}

.blur {
  filter: blur(2px);
}
.form {
    background-color: white;
    width: 60%;
    border: 2px solid rgb(19, 126, 226);
    padding: 1.5rem;
    border-radius: 10px;
    position: fixed;
    top:60%;
    left: 50%;
    z-index: 5;
    transform: translate(-50%,-50%);
    @media screen and (max-width:600px) {
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
      top: .5rem;
      right: .5rem;
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
  }
            .form-group {
      flex: 0 0 50%;
      display: flex;
      flex-direction: column;
      
      padding: 0 3rem;
        @media screen and (max-width:600px) {
          padding: 0 1rem;
      }

      label {
        display: block;
        font-size: 1.2rem;
        margin-bottom: 1rem;
      
      }
      input {
            @media screen and (max-width:600px) {
              width: 90%;
      }
      }
    }
.animatedOutline {
  
border: 4px solid rgb(51, 51, 51) !important;


}
</style>
