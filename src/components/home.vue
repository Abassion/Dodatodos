<template>
  <div class="homeContainer">
    <video src="../assets/Busy-People.webm" autoplay muted loop></video>
    <div class="home">
      <div class="home__title">
        <h1>Welcome To Dodatodos</h1>
        <p>a Web app to organize your daily workflow</p>
        <div
          class="home__signmenu"
          :style="{ height : signHeight + 'rem' , transition  : 'height 1s'}"
        >
          <form>
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" name="email" id="email" class="form-control" v-model="email">
            </div>
            <div class="form-group">
              <label for="password">password</label>
              <input
                type="password"
                name="password"
                id="password"
                class="form-control"
                v-model="password"
              >
            </div>
            <div class="form-group" v-if="sign.up && !sign.in">
              <label for="username">username</label>
              <input
                type="username"
                name="username"
                id="username"
                class="form-control"
                v-model="username"
              >
            </div>
            <p v-show="feedback" class="feedback">{{feedback}}</p>
            <p class="signedup" v-if="signedup">Signed up succesfully</p>
          </form>
        </div>
        <div class="home__signin">
          <svg
            @click="signa('back')"
            class="svg"
            :style="{fill : 'black',cursor : 'pointer' , position : 'absolute', top : '10%' , zIndex : '1' , opacity : !sign.ano ? 1 : 0  }"
          >
            <use xlink:href="../assets/symbol-defs.svg#icon-arrow-left"></use>
          </svg>
          <div
            class="home__signin--1 home__signin--btn"
        
            :class="{centerYourSelf  : !sign.up && !sign.ano}"
            :style="{opacity : sign.in ? 1 : 0  , top : sign.up && sign.ano ? '-3.5rem' : '0' , left :  sign.up && sign.ano ? '26%' : '50%' , transform : sign.up && sign.ano ? '' : 'translateX(-50%)' , zIndex : !sign.up && !sign.ano ? '1' : '0' , pointerEvents : !sign.in ?'none':'all'}"
          >
            <button class="btna btna--primary"  @click="signa('in')">Sign in</button>
          </div>

          <div
            class="home__signin--2 home__signin--btn"
             :class="{centerYourSelf  : !sign.in && !sign.ano}"
            :style="{opacity : sign.up ? 1 : 0 , top : sign.in && sign.ano ? '-3.5rem' : '0' , right : sign.in && sign.ano ? '25.6%' : '50%' ,transform : sign.in && sign.ano ? '' : 'translateX(-50%)' , zIndex : !sign.in && !sign.ano ? '1' : '0' , pointerEvents :!sign.up? 'none':'all'}"
          >
            <button class="btna btna--secondary" @click="signa('up')">Sign up</button>
          </div>
          <loading :style="{left : '70%' , top : '10%'}" v-if="$store.getters.loading"></loading>
          <div class="home__or" :style="{opacity : sign.in && sign.up && sign.ano ? 1 : 0 }">Or</div>
          <div
            class="home__signin--3 home__signin--btn"
            :style="{opacity : sign.ano ? 1 : 0 , top : sign.up && sign.in ? '95%' : '0' , left :  '50%' , zIndex : !sign.up && !sign.in ? '1' : '0'  , pointerEvents :!sign.ano ? 'none':'all'}"
          >
            <button class="btna btna--fortiary" @click="signa('anonymous')">Anonymous login</button>
          </div>
        </div>
      </div>
    </div>
    <div class="copyright" :style="{color : 'white'}">&copy; Built by AISSANI ABDELILLAH</div>
  </div>
</template>

<script>
import firebase from "firebase";
import loading from "./loading.vue";
import { db } from "@/firebase";
export default {
  data() {
    return {
      signHeight: 0,
      email: null,
      password: null,
      username: null,
      feedback: null,
      signedup: false,
      sign: {
        in: true,
        up: true,
        ano: true
      }
    };
  },
  components: {
    loading
  },
  methods: {
    signa(uod) {
      if(this.feedback) {
        this.feedback = '';
      }

      if (uod == "up") {
        if (this.sign.in) {
          this.username = '';
          this.password =null;
          this.email= '';
          this.signHeight = 26;
          this.sign.in = !this.sign.in;
          this.sign.ano = !this.sign.ano;
        } else {
          this.$store.commit("loading");
          if(!this.username || !this.email|| !this.password) {
             this.$store.commit("loading");
            this.feedback = 'please fill all the informations'
            return
          }
          var user = db.collection("users").doc(this.username);

          firebase
            .auth()
            .createUserWithEmailAndPassword(this.email, toString(this.password))
            .then(cred => {
              user.set({
                username: this.username,
                uid: cred.user.uid,
                displayUsername : this.username
              });
              this.signedup = true;
              this.feedback = "";
              setTimeout(() => {
                this.signa('back');
                this.$store.commit("loading");
              }, 2000);
            })
            .catch(
              err => 
                (this.feedback = err.message, this.$store.commit("loading"))
              
            );
        }
      } else if (uod == "in") {
        if (this.sign.up) {
          this.username = '';
          this.password =null;
          this.email= '';
          this.signHeight = 22;
          this.sign.up = !this.sign.up;
          this.sign.ano = !this.sign.ano;
        } else {
           this.$store.commit("loading");
            if(!this.email || !this.password) {
            this.feedback = 'please fill all the informations'
             this.$store.commit("loading");
            return
          }
          var email = this.email;
          var pw = this.password;
          var username = null;
          var displayUsername = null;
          var notificationsObj = [];
        
          firebase
            .auth()
            .setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(function() {
              return firebase.auth().signInWithEmailAndPassword(email, toString(pw));
            })
            .then(cred => {
              var user = db
                .collection("users")
                .where("uid", "==", cred.user.uid);
              user.get().then(snapshot => {
                snapshot.forEach(doc => {
                  username = doc.data().username;
                  displayUsername = doc.data().displayUsername;
                  db.collection("users")
                    .doc(username)
                    .collection("days")
                    .get()
                    .then(days => {
                      if (days.exists) {
                        days.forEach(Element1 => {
                          var date = new Date();
                          var day = date.getDate();
                          if (Element1.id.match(/\d+/g)[0] < toString(day)) {
                            db.collection("users")
                              .doc(username)
                              .collection("days")
                              .doc(Element1.id)
                              .collection("tasks")
                              .get()
                              .then(task => {
                                task.forEach(Element2 => {
                                  db.collection("users")
                                    .doc(username)
                                    .collection("days")
                                    .doc(Element1.id)
                                    .collection("tasks")
                                    .doc(Element2.id)
                                    .get()
                                    .then(taskdata => {
                                      if (!taskdata.data().taskState)
                                        notificationsObj.push({
                                          name: taskdata.data().taskname
                                            ? taskdata.data().taskname
                                            : "a todo",
                                          time: taskdata.data().taskPriority
                                            ? taskdata.data().taskPriority
                                            : true,
                                          day:
                                            (Element1.id.match(/\d+/g)[0] >= 10
                                              ? Element1.id.match(/\d+/g)[0]
                                              : "0" +
                                                Element1.id.match(/\d+/g)[0]) +
                                            "/" +
                                            (parseInt(date.getMonth()) + 1 >= 10
                                              ? parseInt(date.getMonth()) + 1
                                              : "0" +
                                                (parseInt(date.getMonth()) +
                                                  1)) +
                                            "/" +
                                            date.getFullYear()
                                        });
                                    })
                                    .then(() => {
                                      db.collection("users")
                                        .doc("currentUser")
                                        .set({
                                          username: username,
                                          displayUsername : displayUsername,
                                          notifications: notificationsObj
                                        })
                                        .then(() => {
                                          this.$router.push({
                                            name: "main",
                                            params: { userid: displayUsername }
                                          });
                                          this.$store.commit("loading");
                                        });
                                    });
                                });
                              });
                          }
                        });
                      } else {
                        db.collection("users")
                          .doc("currentUser")
                          .set({
                            username: username,
                            notifications: notificationsObj,
                            displayUsername : displayUsername
                          })
                          .then(() => {
                            this.$router.push({
                              name: "main",
                              params: { userid: displayUsername }
                            });
                            this.$store.commit("loading");
                          });
                      }
                    });
                });
              });
            })
            .catch(err => (this.feedback = err.message , this.$store.commit("loading")));
        }
      } else if (uod == "back") {
        this.sign.in = true;
        this.sign.up = true;
        this.sign.ano = true;
        this.signHeight = 0;
        this.signedup = false;
      } else if (uod == "anonymous") {
        this.sign.in = false;
        this.sign.up = false;

        this.$store.dispatch('resetUserData',"user")
        firebase
          .auth()
          .setPersistence(firebase.auth.Auth.Persistence.SESSION)
          .then(function() {
            return firebase
              .auth()
              .signInWithEmailAndPassword("anonymousUser@mail.com", "123456");
          })
          .then(() => {
            db.collection("users")
              .doc("currentUser")
              .set({
                username: "user",
                displayUsername : 'anonymous',
                notifications: {}
              });
          });
        setTimeout(() => {
          this.$router.push({
            name: "main",
            params: { userid: "anonymous" }
          });
        }, 1000);
      }
    },
    da() {
      db.collection("users")
        .doc("user")
        .collection("days")
        .doc(`day 15`)
        .delete();
    }
  }
};
</script>
<style lang="scss" >
html {
  @media screen and (max-width: 700px) {
    font-size: 50%;
  }
}
.homeContainer {
  background-image: url("../assets/home.jpg");
  background-size: cover;
  height: 100vh;
  color: white;
  overflow: hidden;
  width: 100%;
  video {
    object-fit: cover;
    height: 100%;
    width: 100%;
  }
}
.home {
  height: 100%;
  width: 100%;
  overflow: hidden;
  .form-group {
 input{
   flex: 0 0 100%;
 }
}
  &__title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 70rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media screen and (max-width: 500px) {
      min-width: 100%;
    }
    form {
      font-size: 1.5rem;
      input {
        font-size: inherit;
        border-radius: 10px;
        outline: none;
        border: 1px solid black;
        &:focus {
          border: 3px solid rgb(19, 126, 226);
        }
      }
    }
    h1 {
      font-size: 6rem;
      font-family: "Srisakdi";
      font-weight: 800;
      text-align: center;
      @media screen and (max-width: 500px) {
        font-size: 5rem;
      }
      @media screen and (max-width: 400px) {
        font-size: 6rem;
      }
    }
    p {
      font-size: 1.9rem;
      font-family: sans-serif;
      letter-spacing: 4.2px;
      text-align: center;
      margin-top: 0.7rem;
      @media screen and (max-width: 500px) {
        font-size: 1.9rem;
        letter-spacing: 2px;
        margin-top: 2rem;
      }
      @media screen and (max-width: 400px) {
        font-size: 1.5rem;
        letter-spacing: 1.5px;
        margin-top: 5rem;
      }
    }
  }
  &__signmenu {
    width: 30rem;
    margin: 5rem auto 2rem auto;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &__signin {
    position: relative;
    width: 100%;
    margin-top: 2rem;
    &--btn {
      transition: all 1s;
    }
    svg {
       left :  20% ;
      @media screen and (min-width: 500px) {
        left: 30.5% !important;
      }
    }
    &--1 {
      position: absolute;
      display: flex;
      justify-content: center;
  
      @media screen and (max-width: 430px) {
        transform: translateX(-4rem)
      }
    }
    &--2 {
      position: absolute;
      display: flex;
      width: max-content;
      justify-content: center;
     
      @media screen and (max-width: 430px) {
         transform: translateX(4rem)
      }
    }

    &--3 {
      position: absolute;
      display: flex;
      justify-content: center;
      transform: translateX(-50%);
      @media screen and (max-width: 400px) {
        width: 80%;
      }
    }
  }
  &__or {
    width: 100%;
    text-align: center;
    font-size: 1.5rem;
    margin: 1.8rem 0;
    position: relative;

    &::after {
      content: "";
      height: 1px;
      width: 20%;
      position: absolute;
      top: 50%;
      right: 55%;
      background-color: #ccc;
    }
    &::before {
      content: "";
      height: 1px;
      width: 20%;
      position: absolute;
      top: 50%;
      left: 55%;
      background-color: #ccc;
    }
  }
  .btna {
    padding: 1rem 3rem;
    font-size: 1.8rem;
  }
  .feedback {
    font-size: 1.2rem;
    color: red;
    letter-spacing: 0px;
    font-weight: bold;
    text-align: center;
    margin-right: 4rem;
    transform: translateY(1rem);
    @media screen and (max-width: 500px) {
          transform: translateY(-1rem);
      }
    
  }
  .signedup {
    color: rgb(57, 253, 31);
    font-size: 2rem;
    letter-spacing: 0px;
    font-weight: bold;
    margin-top: 1rem;
  }
  .centerYourSelf{
    left: 50% !important;
    transform: translateX(-50%);
  }
}

</style>
