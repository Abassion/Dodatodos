<template>
  <div class="mainContainer" :class="{blur : $store.getters.takingTour == 10}">
    <div class="main__welcome">
      <h4>
        <span>Welcome {{ $store.getters.displayUsername || ''}} ! &#x1F44B;</span>
      </h4>
    </div>
    <div class="main__ul">
      <div class="cards">
        <div class="carda carda--1" @click="$store.commit('takingTour',1)">
          <svg>
            <use xlink:href="../assets/symbol-defs.svg#icon-search1"></use>
          </svg>
          <p>take a tour</p>
        </div>
        <div class="carda carda--2" @click="$router.push({name : 'calendar' , params : {userid : $store.getters.displayUsername}})">
          <svg>
                <use xlink:href="../assets/symbol-defs.svg#icon-calendar"></use>
                 </svg>
                  <p>my calendar</p>
        </div>
        <div class="carda carda--3" @click="$store.commit('todoPannel')">
          <svg>
                <use xlink:href="../assets/symbol-defs.svg#icon-add-solid"></use>
                 </svg>
                  <p>add a global todo</p>
        </div>
        <div class="carda carda--4" @click="goToCurrentDay">
          <svg>
                <use xlink:href="../assets/symbol-defs.svg#icon-sun"></use>
                 </svg>
                  <p>my day</p>
        </div>
        <div class="carda carda--5" @click="$router.push({name : 'profile'})">
          <svg>
                <use xlink:href="../assets/symbol-defs.svg#icon-profile"></use>
                 </svg>
                  <p>my profile</p>
        </div>
        <div class="carda carda--6" @click="$router.push({name : 'about'})">
          <svg>
                <use xlink:href="../assets/symbol-defs.svg#icon-settings"></use>
                 </svg>
                  <p>about & contact</p>
        </div>
      </div>
    </div>
     <div class="copyright" :style="{color : 'black'}">&copy; Built by AISSANI ABDELILLAH</div>
  </div>
</template>
<script>
import { db /*FieldValue */ } from "@/firebase";
export default {
  data() {
    return {};
  },
  created() {
    db.collection("users")
      .doc("currentUser")
      .get()
      .then(snapshot => {
        this.$store.commit("currentUser", snapshot.data().username);
        this.$store.commit("displayUsername", snapshot.data().displayUsername);
        this.$store.commit("notifications", snapshot.data().notifications);
      });
  },
  methods : {
    goToCurrentDay(){
      var date = new Date();
      var currentDay = date.getDate() ;
      this.$router.push({name : 'days' , params : {userid : this.$store.getters.displayUsername , id : currentDay}})
    }
  }
 
};
</script>


<style lang="scss" >
@import url('https://fonts.googleapis.com/css?family=Open+Sans');
.mainContainer {
  position: relative;
  width: 80%;
 
  margin: 0 auto;
  padding-bottom: 12rem;
 
}
.main {
  font-family: "Open Sans";
  &__welcome {
    font-family: inherit;
    text-align: center;
    padding: 12rem 0 3rem 0;
    h4 {
      font-size: 5rem;
      span {
        display: block;
        font-family: inherit;
        font-weight: 300;
      }
    }
  }
  &__ul {
    ul {
      list-style: none;
      font-size: 2.5rem;
      font-family: inherit;
      margin: 0 auto;
      max-width: 40%;
      padding: 8rem 0;
      li {
        padding: 2rem 2rem 2rem 10rem;
        letter-spacing: 2px;
        position: relative;
        &:not(:last-child) {
          margin-bottom: 1rem;
        }
        svg {
          height: 2.5rem;
          width: 2.5rem;
          position: absolute;
          top: 35%;
          left: 5.5rem;
        }
      }
    }
  }
}
.cards {
  display: flex;
  flex-wrap: wrap;
  padding-top: 12rem;
  justify-content: center;
  .carda {
    flex: 0 0 30%;
    padding: 1rem 0rem;
    display: flex;
    min-width: 10rem;
    height: 10rem;
    align-items: center;
    transition: all .2s linear;
    background-color: rgb(190, 190, 190);
    margin-bottom: 1.5rem;
    margin-right: 2rem;
    border-top-right-radius: 20px;
    border-bottom-left-radius: 20px;
    color: white;
    &--1 {
      background-image: linear-gradient(to right bottom, #3a8bd6, #6f61f0);
    }
    &--2 {
      background-image: linear-gradient(to right bottom, #92d187, #40d8a8);
    }
    &--3{
      background-image: linear-gradient(to right bottom, #ffb900, #ff7730);
    }
    &--4 {
       background-image: linear-gradient(to right bottom, #7ed56f, #28b485);
    }
    &--5 {
      background-image: linear-gradient(to right bottom, #f7c94b, #dfec63);
    }
    &--6 {
      background-image: linear-gradient(to right bottom, #73b5f3, #3b84c9);
    }
    cursor: pointer;
    svg {
      height: 5.5rem;
      width: 5.5rem;
      fill: white;
      margin-left: 2rem;
    }
    p{
      font-size: 2.5rem;
      font-family: 'Open Sans';
      text-align: center;
      text-transform: uppercase;
        padding-top: 1rem;
        margin-left:3.5rem;
       @media screen and (max-width: 1200px) {
         margin-left:2rem;
         font-size: 1.7rem;
       }
        @media screen and (max-width: 500px) {
          margin-left:3rem;
           font-size: 2.5rem;
    }

    }
    &:hover {
      transform:scale(1.05);
    }
    @media screen and (max-width: 1200px) {
      flex: 0 0 45%;
    }
    @media screen and (max-width: 500px) {
      flex: 0 0 95%;
      margin-right: 0rem;
    }
  }
}

</style>
