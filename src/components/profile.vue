<template>
  <div class="profileContainer">
    <div class="profileHeader">
      <h1>Your Profile</h1>
    </div>
    <div class="main">
      <div class="personal-info">
        <div class="email">
          <span>
            Email : {{ email}}
            <a @click="
            emailInput= !emailInput
            feedback.emailChange = ''
            newEmail = '';
            ">change</a>
          </span>
          <input
            class="profileInputs"
            type="email"
            placeholder="Enter new email"
            v-model="newEmail"
            v-show="emailInput"
          >
          <button
            class="btna btna--primary"
            v-show="emailInput"
            @click="changeUserEmail(newEmail)"
          >Confirm</button>
          <p
            class="feedback"
            :style="{color : feedback.emailChange =='Email changed succesfully' ? 'green':'red'}"
          >{{feedback.emailChange}}</p>
        </div>
        <div class="user">
          <span>
            Username : {{ username }}
            <a @click="
            usernameInput = !usernameInput
            feedback.userChange = ''
            newUser = '';
            ">change</a>
          </span>
          <input
            class="profileInputs"
            type="text"
            placeholder="Enter new username"
            v-model="newUser"
            v-show="usernameInput"
          >
          <button
            class="btna btna--primary"
            v-show="usernameInput"
            @click="changeUserUsername(newUser)"
          >Confirm</button>
          <p
            class="feedback"
            :style="{color : feedback.userChange =='Username changed succesfully' ? 'green':'red'}"
          >{{feedback.userChange}}</p>
        </div>
        <span>Creation date : {{signupDate}}</span>
      </div>

      <div class="options">
        <div class="optionsBtn">
          <button
            class="btna btna--primary"
            @click="
          newPassword ? changeUserPassword(newPassword) : (passwordInput = !passwordInput,feedback.passwordChange ='')
          "
          >
            <p class="button-text">Change your password</p>
            <svg>
              <use xlink:href="../assets/symbol-defs.svg#icon-locked"></use>
            </svg>
          </button>
          <span v-if="passwordInput">
            <input
              :type="passwordHidden ? 'password' : 'text'"
              class="profileInputs passwordInput"
              placeholder="Enter new password"
              v-model="newPassword"
            >
            <svg @click="passwordHidden = !passwordHidden" v-if="passwordHidden">
              <use xlink:href="../assets/symbol-defs.svg#icon-eye-blocked"></use>
            </svg>
            <svg @click="passwordHidden = !passwordHidden" v-else>
              <use xlink:href="../assets/symbol-defs.svg#icon-eye"></use>
            </svg>
          </span>
          <p
            class="feedback"
            :style="{color : feedback.passwordChange == 'Password changed succesfully' ? 'green' : 'red'}"
          >{{feedback.passwordChange}}</p>
        </div>
        <div class="optionsBtn">
          <button class="btna btna--fortiary" @click="resetMyAccount = !resetMyAccount">
            <p class="button-text">Reset your account</p>
            <svg>
              <use xlink:href="../assets/symbol-defs.svg#icon-reload"></use>
            </svg>
          </button>
          <div class="confirmation-pannel" v-show="resetMyAccount">
            <p>Do you really want to reset all your account data ?</p>
            <button class="btna btna--primary" @click="resetUserData() ">YES</button>
            <button class="btna btna--tertiary" @click="resetMyAccount = !resetMyAccount">NO</button>
          </div>
          <p
            class="feedback"
            :style="{color : feedback.ra == 'all your data is reset now' ? 'green' : 'red'}"
          >{{feedback.ra}}</p>
        </div>

        <div class="optionsBtn">
          <button class="btna btna--tertiary" @click="deleteMyAccount = !deleteMyAccount">
            <p class="button-text">Delete your account</p>
            <svg>
              <use xlink:href="../assets/symbol-defs.svg#icon-bin"></use>
            </svg>
          </button>
          <div class="confirmation-pannel" v-show="deleteMyAccount">
            <p>Do you really want to delete your account ?</p>
            <button
              class="btna btna--primary"
              @click="
             deleteUserAccount()
             deleteMyAccount= !deleteMyAccount
             "
            >YES</button>
            <button class="btna btna--tertiary" @click="deleteMyAccount = !deleteMyAccount">NO</button>
          </div>
          <p
            class="feedback"
            :style="{color : feedback.da == 'Account deleted succesfully' ? 'green' : 'red'}"
          >{{feedback.da}}</p>
        </div>
      </div>

      <!-- <div class="account-info">
        <h1>your todo graph</h1>
      </div>-->
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { db } from "@/firebase";
export default {
  data() {
    return {
      email: null,
      username: null,
      signupDate: null,
      passwordHidden: true,
      newPassword: "",
      newEmail: "",
      newUser: "",
      feedback: {
        passwordChange: "",
        da: "",
        ra: "",
        emailChange: "",
        userChange: ""
      },
      emailInput: false,
      passwordInput: false,
      usernameInput: false,
      deleteMyAccount: false,
      resetMyAccount: false
    };
  },
  created() {
    var currentDate = new Date();
    this.email = firebase.auth().currentUser.email;
    this.username = this.$store.getters.displayUsername;
    this.signupDate =
      this.$store.getters.currentUser !== "user"
        ? firebase.auth().currentUser.metadata.creationTime
        : `${currentDate.getFullYear()} / ${currentDate.getMonth() +
            1} / ${currentDate.getDate()} `;
  },
  methods: {
    changeUserPassword(newPassword) {
      if (newPassword == "" || newPassword.length < 6) {
        this.feedback.passwordChange =
          "Password must contain more than 6 caracteres";
        return;
      }
      if(firebase.auth().currentUser.email == 'anonymoususer@mail.com'){
        this.feedback.passwordChange = 'this is an anonymous account you can not change the password'
        return
      }
      var feedback = "";
      firebase
        .auth()
        .currentUser.updatePassword(toString(newPassword))
        .then(function() {
          feedback = "Password changed succesfully";
        })
        .catch(function(error) {
          feedback = error.message;
        })
        .then(() => {
          this.feedback.passwordChange = feedback;
          this.passwordInput = false;
          this.newPassword = "";
          setTimeout(() => {
            this.feedback.passwordChange = "";
          }, 3000);
        });
    },
    deleteUserAccount() {
      if(firebase.auth().currentUser.email == 'anonymoususer@mail.com') {
  
   
          this.feedback.da = "Account deleted succesfully";
          setTimeout(() => {
            this.$router.push({ name: "home" });
          }, 2000);
       
        return
      }
      var feedback = "";
      var user = firebase.auth().currentUser;
      user
        .delete()
        .then(function() {
          feedback = "Account deleted succesfully";
          setTimeout(() => {
            this.$router.push({ name: "home" });
          }, 2000);
        })
        .catch(function(error) {
          feedback = error.message;
        })
        .then(() => {
          this.feedback.da = feedback;
          this.deleteMyAccount = false;
        });
    },
    resetUserData() {
      this.$store.dispatch("resetUserData", this.$store.getters.currentUser);
      this.resetMyAccount = false;
      this.feedback.ra = "all your data is reset now";
      setTimeout(() => {
        this.feedback.ra = "";
      }, 2000);
    },
    changeUserUsername(newUser) {
      if (newUser == "") {
        this.feedback.userChange = "Please enter a username";
        return;
      }
          if(this.username == 'anonymous') {
        this.feedback.userChange = "you cant change the username of an anonymous account";
        setTimeout(() => {
           this.feedback.userChange
        }, 3000);
        return
      }
       db.collection("users")
                          .doc("currentUser")
                          .update({
                            displayUsername : newUser
                          })
      db.collection("users")
        .doc(this.$store.getters.currentUser)
        .update({
          displayUsername: newUser
        })
        .then(res => {
          this.feedback.userChange = "Username changed succesfully";
          this.username = newUser;
          this.newUser = "";
          this.usernameInput = "";
          setTimeout(() => {
            this.feedback.userChange = "";
          }, 2000);
        })
        .catch(err => {
          this.feedback.userChange = err.message;
        });
    },
    changeUserEmail(newEmail) {
      var feedback = "";
      if (!newEmail.match(/@/g) || newEmail == "") {
        this.feedback.emailChange = "Make sure you entered an email";
        return;
      }
      if(this.email == 'anonymoususer@mail.com') {
        this.feedback.emailChange = "you cant change the email of an anonymous account";
        setTimeout(() => {
           this.feedback.emailChange
        }, 3000);
        return
      }

      var user = firebase.auth().currentUser;
      user
        .updateEmail(newEmail)
        .then(function() {
          feedback = "Email changed succesfully";
        })
        .catch(function(error) {
          feedback = error.message;
        })
        .then(() => {
          this.feedback.emailChange = feedback;
          this.email = newEmail;
          if (this.feedback.emailChange == "Email changed succesfully") {
            this.newEmail = "";
            this.emailInput = false;
          }
          setTimeout(() => {
            this.feedback.emailChange = "";
          }, 3000);
        });
    }
  }
};
</script>

<style lang="scss">
.profileInputs {
  font-size: 1.5rem;
  margin-top: 3rem;
  position: relative;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  border: 2px solid rgb(19, 126, 226);
}
.profileContainer {
  h1 {
    font-size: 6rem;
    font-weight: 600;
    font-family: "Srisakdi";
  }
   .feedback {
    color: red;
    font-size: 1.5rem;
    text-align: center;
    margin-top: 2rem !important;
    text-transform: uppercase;
    font-weight: 500;
    font-family: "Open Sans";
  }
  .profileHeader {
    text-align: center;
    margin: 8rem 0;
  }
  .main {
    max-width: 120rem;
    margin: 0 auto;
    font-size: 2.5rem;
    .personal-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 8rem;
      text-align: center;

      .email,
      .user {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 6.5rem;
        button {
          margin-top: 2rem !important;
          padding: 1rem 2rem !important;
        }
      }
      @media screen and (max-width: 600px) {
        font-size: 2rem;
      }
      span {
        flex: 0 0 50%;

        a {
          margin-left: 1rem;
          font-size: 1.5rem;
          color: rgb(35, 141, 202);
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
    .options {
      display: flex;
      width: 100%;
      justify-content: space-around;
      align-items: flex-start;
      @media screen and (max-width: 600px) {
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
      }
      p {
        margin: 0;
      }
    }
    .account-info {
      text-align: center;
      margin: 8rem 0;
      h1 {
        font-size: 5rem;
      }
    }
    svg {
      height: 1.75rem;
      width: 1.75rem;
      fill: #fff;
      position: absolute;
      right: 1rem;
      bottom: 28%;
    }
  }
}
.optionsBtn {
  flex: 0 0 33%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .confirmation-pannel {
    font-size: 1.6rem;
    border: 1px solid black;
    border-radius: 25px;
    padding: 2rem;
    margin-top: 2rem;
    button {
      padding: 0.5rem 2rem !important;
      margin: 2rem 0rem 1rem 1rem;
    }
  }
  button {
    margin-right: 0 !important;
  }
 
  span {
    position: relative;
    margin-bottom: 0px !important;

    svg {
      fill: rgba(51, 51, 51, 0.4) !important;
      top: 57%;
    }
  }
}
</style>
