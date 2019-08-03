<template>
    <div class="tourContainer">
        <transition-group name="fadeit" mode="out-in">
        <div class="pannel pannel--1" v-if="$store.getters.takingTour == 1" :key="1">
            <div class="tour-steps">
            <div class="step" v-for="n in 10" :key="n" :style="{backgroundColor : $store.getters.takingTour == n ? '#42b745' : ''}"></div>
        </div>
           <p class="text">
                Hi {{$store.getters.displayUsername}} ! this is your calendar , its built to give you freedom creating todos for the whole month and each month you will have a new calendar  
           </p>
           <button @click="$store.commit('takingTour',$store.getters.takingTour + 1)">
               next
           </button>
        </div>
        <div class="pannel pannel--2" v-if="$store.getters.takingTour == 2" :key="2">
             <div class="tour-steps">
            <div class="step" v-for="n in 10" :key="n" :style="{backgroundColor : $store.getters.takingTour == n ? '#42b745' : ''}"></div>
        </div>
           <p class="text">
                this is a 'Day' cell , it's composed of the date (the number in the center) and the day progress (the percentage in the bottom right corner)
                 which will represent your completed todos in percentage. <br/> <span :style="{marginTop : '3rem'}">now <strong>Click</strong> on a 'Day' cell and lets dive on it </span>
           </p>
        </div>
        <div class="pannel pannel--3" v-if="$store.getters.takingTour == 3" :key="3">
             <div class="tour-steps">
            <div class="step" v-for="n in 10" :key="n" :style="{backgroundColor : $store.getters.takingTour == n ? '#42b745' : ''}"></div>
        </div>
           <p class="text">
               this is the 'Day' inteface, in the center we have the a list of all the todos you have created for the current day , you can add a new todo by clicking on 'add a new todo' above
           </p>
           <button @click="$store.commit('takingTour',$store.getters.takingTour + 1)" >

               next
           </button>
        </div>
        <div class="pannel pannel--4" v-if="$store.getters.takingTour == 4" :key="4">
             <div class="tour-steps">
            <div class="step" v-for="n in 10" :key="n" :style="{backgroundColor : $store.getters.takingTour == n ? '#42b745' : ''}"></div>
        </div>
           <p class="text">
                this is the 'Day' header , on the right we have 2 buttons (in case you are using a mobile device you can find the other button on the sidebar), the 'show notes' button is to switch between your todos and your notes for the current day ... while the '+' button is to create one of them
           </p>
           <button @click="$store.commit('takingTour',$store.getters.takingTour + 1)">
               next
           </button>
        </div>
        <div class="pannel pannel--5" v-if="$store.getters.takingTour == 5" :key="5">
             <div class="tour-steps">
            <div class="step" v-for="n in 10" :key="n" :style="{backgroundColor : $store.getters.takingTour == n ? '#42b745' : ''}"></div>
        </div>
           <p class="text">
               this is the todo bar , its composed of 3 elements ... on the left we have the todo name , on the middle we have the todo timing which represents the time that you want to start your task 
                while on the right we have the todo state... when checked its means that you have done your todo , you can click on it to change the todo state. <br/>now <strong>Click</strong> on a todo bar and lets dive on it 
           </p>
        </div>
          <div class="pannel pannel--6" v-if="$store.getters.takingTour == 6" :key="6">
               <div class="tour-steps">
            <div class="step" v-for="n in 10" :key="n" :style="{backgroundColor : $store.getters.takingTour == n ? '#42b745' : ''}"></div>
        </div>
           <p class="text">
              this is the todo interface, where you can add more details and manage your todo  
           </p>
           <button @click="$store.commit('takingTour',$store.getters.takingTour + 1)">
               next
           </button>
        </div>
          <div class="pannel pannel--7" v-if="$store.getters.takingTour == 7" :key="7">
               <div class="tour-steps">
            <div class="step" v-for="n in 10" :key="n" :style="{backgroundColor : $store.getters.takingTour == n ? '#42b745' : ''}"></div>
        </div>
           <p class="text">
                this is the todo header , which includes 3 buttons 'add a card' for adding cards ... there are 3 types of deferent cards you can add we will explore them in a second , next we have the 'done' button to simply validate your todo , and last we have the delete button to delete the todo
           </p>
           <button @click="$store.commit('takingTour',$store.getters.takingTour + 1)">
               next
           </button>
        </div>
        <div class="pannel pannel--8" v-if="$store.getters.takingTour == 8" :key="8">
             <div class="tour-steps">
            <div class="step" v-for="n in 10" :key="n" :style="{backgroundColor : $store.getters.takingTour == n ? '#42b745' : ''}"></div>
        </div>
           <p class="text">
              like we said we have 3 types of card you can add ... first one is the 'Checklist' card ,  its a card that you can add some of your objectifs or goals on and then check them when you done.
               next we have the 'description' card where you can add some comments or remarks about your todo and finally the 'notes' card which is a collection of note stickers 
               
           </p>
           <button @click="$store.commit('takingTour',$store.getters.takingTour + 1)">
               next
           </button>
        </div>

        <div class="pannel pannel--9" v-if="$store.getters.takingTour == 9" :key="9">
             <div class="tour-steps">
            <div class="step" v-for="n in 10" :key="n" :style="{backgroundColor : $store.getters.takingTour == n ? '#42b745' : ''}"></div>
        </div>
           <p class="text">
              Oh! and before we end you might noticed a little couldown on the right corner that's the todo couldown , when it ends you will get a notification ,
                speaking of notifications there is a notification icon on the header that shows you any notification concerning your todos (missing ,time ..etc)
           </p>
           <button @click="$store.commit('takingTour',$store.getters.takingTour + 1)">
               next
           </button>
        </div>
        <div class="pannel pannel--10" v-if="$store.getters.takingTour == 10" :key="10">
             <div class="tour-steps">
            <div class="step" v-for="n in 10" :key="n" :style="{backgroundColor : $store.getters.takingTour == n ? '#42b745' : ''}"></div>
        </div>
           <p class="text">
              Excelent, that's the end of your tour , a proper and easy todo application , now you can use it daily to help you manage your goals in a orgnized way , please note that the app is also compatable with all devices (including phones) to facilate the application acces.<br/>
              Thank you and enjoy your day &#x1F607; 
           </p>
            <div class="buttons-wrapper">
         
            <button @click="$store.commit('takingTour',0);$router.push({name :'about'})">
               About & contact
           </button>
                   <button @click="$store.commit('takingTour',0)">
                 Close
           </button>
          
            </div>
        </div>
        </transition-group>
    </div>
</template>


<script>
export default {
}
</script>


<style lang="scss" >
.tourContainer {
    height: min-content;
    width: min-content;
    .tour-steps {
        display: flex;
        margin-bottom: 2rem;
        .step {
            flex: 0 0 8%;
            height: .55rem;
            background-color: #fff;
            border-radius: 100px;
            &:not(:last-child) {
                margin-right: 2%;
            }
        }
    }
    .pannel {
        padding:  2rem;
        position: absolute;
        max-width: 30%;
        border-radius: 25px;
        font-size: 1.8rem;
        line-height: 3rem;
        letter-spacing: 2px;
        color : white;
        z-index: 5;
        @media screen and (max-width : 1200px) {
              max-width: 80%;
           }
        font-family: 'Open Sans';
        background-color: rgba(19, 126, 226,0.95);
        pointer-events: all;
         @media screen and (max-width : 600px) {
              min-width: 98% !important; 
           }
        &--1{
        top: 25%;
        left: 50%;
        min-width: 50%;
        transform: translateX(-50%);
           @media screen and (max-width : 600px) {
           
           }
        }
        &--2{
        top: 20rem;
        left: 10rem;
         @media screen and (max-width : 600px) {
             
            
        left: 1%;
           }
        }
        &--3{
         top: 50%;
        left: 50%;
        min-width: 50%;
        transform: translate(-50%,-50%);
         @media screen and (max-width : 600px) {    
        left: 50%;
        }
        }
        &--4{
        top:30rem;
        left: 50%;
        min-width: 50%;
        transform: translate(-50%,-50%);
        @media screen and (max-width : 1000px) {    
        left: 50%;
        top : 40rem;
        }
        }
        &--5{
        top: 70%;
        left: 50%;
        min-width: 80%;
        transform: translate(-50%,-50%);
        font-size: 1.7rem;
        @media screen and (max-width : 600px) {    
        top: 60%;
        }
        }
         &--6{
        top: 70%;
        left: 50%;
        min-width: 50%;
        transform: translate(-50%,-50%);
        @media screen and (max-width : 1200px) {    
        top: 80%;
        }
       
        }
         &--7{
        top: 30rem;
        left: 50%;
        min-width: 80%;
        transform: translate(-50%,-50%);
          @media screen and (max-width : 1200px) {    
        top: 40%;
        }
        }
         &--8{
        top: 70%;
        left: 60%;
        min-width: 80%;
        transform: translate(-50%,-50%);
          @media screen and (max-width : 1200px) {    
        top: 85%;
        left: 50%;
        font-size: 1.5rem;
         letter-spacing: 0px;
        }
        }
         &--9{
        top: 70%;
        left: 50%;
        min-width: 80%;
        transform: translate(-50%,-50%);
        @media screen and (max-width : 1200px) {    
        top: 85%;
        }
         @media screen and (max-width : 600px) {    
        top: 50%;
        }
        }
        &--10{
        top: 55%;
        left: 50%;
        min-width: 50%;
        transform: translate(-50%,-50%);
        @media screen and (max-width :1200px) {    
        min-width: 80%;
        }
        }
        button {
            border: none;
            padding: .5rem 1rem;
            border-radius: 5px;
            display: block;
            margin-left: auto;
            margin-top: 1rem;
        }
        .buttons-wrapper{
            display: flex;
            justify-content: flex-end;
            button {
                display: inline;
                 margin-left: 0;
                 &:not(:last-child) {
 margin-right: 2rem;
                 }
                
            }
        }
    }
    .fadeit-enter{
    opacity: 0;
  }
  .fadeit-enter-to {
    opacity: 1;
    transition: all 2s;
  }
  .fadeit-leave-to {
    opacity: 0;
     transition: all 1s;
  }
}
</style>

