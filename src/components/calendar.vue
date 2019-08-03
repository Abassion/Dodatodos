<template>
  <div class="calendar">
     <div class="choose-date">
            <h1>Choose a Date</h1>
        </div>
    <div class="current">
      <div class="C">
        <span id="cM">{{currentMonth}}</span>
        <span id="cY">{{currentYear}}</span>
      </div>
    </div>
    <table id="table">
      <div id="days">
          <div class="td" >Sun</div>
          <div class="td" >Mon</div>
          <div class="td" >Tue</div>
          <div class="td" >Wed</div>
          <div class="td" >thu</div>
          <div class="td" >Fri</div>
          <div class="td" >Sat</div>
      </div>
        <div class="tbody">
          <div v-for="(td,i) in Table" class="td" 
           :class="{activee : td == currentDay , inactive : td == '',gone : td < new Date().getDate() && td !==''}" 
           @click="
           (td>10 && td<17 && $store.getters.takingTour == 2 && getDay(td) == 'Thu') && $store.getters.takingTour ?
           $store.commit('takingTour',$store.getters.takingTour + 1)  : (currentDay = td , cd())
          
           " :key="i" :style="{pointerEvents : td>10 && td<17 && $store.getters.takingTour == 2 && getDay(td) == 'Thu' ? 'all' : ''}
           ">
            <span class="td__date">{{getDay(td)}}</span>
            <span class="td__day" >{{td}}</span>
            <span v-if="td !=='' && progressArr[progressArr.findIndex(x => x.day  == td)] && !$store.getters.takingTour" class="td__total">
              {{ progressArr[ ( progressArr.findIndex(y=> y.day == td)  ? progressArr.findIndex(y=> y.day == td) : 0)].progress}} %
             </span>
              <span v-if="td !=='' && (td>10 && td<17 && $store.getters.takingTour == 2 && getDay(td) == 'Thu') && $store.getters.takingTour" class="td__total">
             0 %
             </span>
            <arrow v-if="td>10 && td<17 && $store.getters.takingTour == 2 && getDay(td) == 'Thu'" class="calendar-arrow"></arrow>
          </div>
        </div>
    </table>
  </div>
</template>
<script>
import { db } from "@/firebase";
import arrow from './arrow'
export default {
  props : ['userid'],
  data() {
    return {
      Months: [
        "January",
        "February",
        "Mars",
        "Avril",
        "May",
        "Juin",
        "July",
        "Augest",
        "September",
        "October",
        "November",
        "December"
      ],
      days: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
      Table: [],
      currentMonth: "Feb",
      currentYear: 2019,
      currentDay: null,
      LastDay: null,
      FirstDay: null,
      tbody: null,
      isCurrentDay: false,
      progressArr : []
    };
  },
  components : {
    arrow,
  },
  methods: {
    GenDate(Month, Year, DayStart, DateEnd) {
     
      var counter = 0
      for (let i = 0; i < Math.ceil((DateEnd + DayStart) / 7); i++) {
        for (let j = 0; j < 7; j++) {
          if (counter < DayStart) {
            this.Table.push("")
          } else if (counter - DayStart + 1 > DateEnd) {
              this.Table.push("")
          } else {
            this.Table.push(counter - DayStart + 1)
          }
          counter++;
        }
      
      }
    },
    getDay(td){
      var currentDate = new Date();
      var date = new Date(currentDate.getFullYear(),currentDate.getMonth(),td)
      return this.days[date.getDay()]
    },
    next() {
      this.Table = []
      if (this.currentMonth == "December") {
        this.currentYear++
        this.currentMonth = this.Months[0]
      } else {
        this.currentMonth = this.Months[
          this.Months.indexOf(this.currentMonth) + 1
        ];
      }
      this.FirstDay = new Date(
        this.currentYear,
        this.Months.indexOf(this.currentMonth),
        1
      );
      this.LastDay = new Date(
        this.currentYear,
        this.Months.indexOf(this.currentMonth) + 1,
        0
      );
      this.GenDate(
        this.currentMonth,
        this.currentYear,
        this.FirstDay.getDay(),
        this.LastDay.getDate()
      );
    },
    previous() {
      this.Table = []
      if (this.currentMonth == "January") {
        this.currentYear--;
        this.currentMonth = this.Months[11];
      } else {
        this.currentMonth = this.Months[
          this.Months.indexOf(this.currentMonth) - 1
        ];
      }
      this.FirstDay = new Date(
        this.currentYear,
        this.Months.indexOf(this.currentMonth),
        1
      );
      this.LastDay = new Date(
        this.currentYear,
        this.Months.indexOf(this.currentMonth) + 1,
        0
      );
      this.GenDate(
        this.currentMonth,
        this.currentYear,
        this.FirstDay.getDay(),
        this.LastDay.getDate()
      );
    },
    cd () {
      this.$store.commit('currentDay',this.currentDay);
      this.$router.push({name : 'days' , params : { id : this.$store.getters.currentDay , userid : this.$store.getters.displayUsername }});
    }
  },
  created() {
    var arr = []
    var date = new Date();
    this.LastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.FirstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    this.currentDay = date.getDate();
    this.currentMonth = this.Months[date.getMonth()];
    this.currentYear = date.getFullYear();
    db.collection('users').doc(this.userid).collection('days').get().then(function(rep) {
      rep.forEach(element => {
         arr.push({day : element.id.match(/[0-9]+/)[0] , progress : element.data().dayProgress })
      });
    })
  this.progressArr = arr;
  },

  mounted: function() {
    this.GenDate(
      this.currentMonth,
      this.currentYear,
      this.FirstDay.getDay(),
      this.LastDay.getDate()
    );
  }
};
</script>
<style lang="scss">
.activee {
  background-color: rgb(60, 175, 60);
  color: #fff;
}

.calendar {
  width:100%;

}

.td {
  border: 1px solid #ccc;
  padding: 0.6rem 0.6rem;
  flex-grow: 1;
  flex-basis: 14.20%;
  position: relative;
  cursor: pointer;
  height: 12rem;

  font-size: 15px;
  position: relative;
  box-shadow: inset 0rem .5rem 1rem .5rem  rgba(233, 233, 233, 0.285);
   @media screen and (max-width: 710px) {
    flex-basis: 30%;
    min-width:20rem;
  }
  &__day {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-70%);
      font-size: 6rem;
      pointer-events: none;
      z-index: 1;
      @media screen and (max-width: 710px) {
           transform: translate(-50%,-50%);
        }
  }
  &__date {
    padding: .5rem;
    letter-spacing: 2px;
    font-size: 1.5rem;
    z-index: 1;
     @media screen and (min-width: 710px) {
           display: none;
        }
  }


  &__total {
      position: absolute;
      bottom: 5%;
      right: 5%;
      pointer-events: none;
      background-image: linear-gradient(to right ,#03a87c,#69bb0c );
      height: 2rem;
      width: 4rem;
      border-radius: 5px;
      text-align: center;
      font-size: 1.3rem;
      color: #fff;
      z-index: 1;
  }
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    width: 0px;
    height: 0px;
    background-image:  radial-gradient(#40b93c,#69bb0c ); 
    border-radius: 50%;
    transition: all .5s linear;
    z-index: 0;
  }
   &:hover > &__day {
    color: white;
  }
  &:hover{
    &::after {
    width: 100%;
    height: 100%;
    border-radius: 0;
   }
  } 
 
}

table {
  border-collapse: collapse;
  font-family: sans-serif;
  box-shadow: 0 1rem 2rem #ddd;
  margin: 0;
  display: block;
  border: 2px solid rgb(51, 51, 51);
  color: #555;
  background-color: #fff;
}


.current {
  display: flex;
  justify-content: center; 
  width: 100%;
  margin-bottom: 10px;
  background-color: rgb(51, 51, 51);
  margin: 0;
  padding: 10px 5px;
  font-size: 20px;
  color: #fff;
}

#cM {
  margin-right: 5px;
  
}

#rarr,
#larr {
  cursor: pointer;
}
#rarr {
  transform: scale(1.6) translateX(-10px);
}
#larr {
  transform: scale(1.55) translateX(10px);
}

.inactive {
  background-color: rgba(231, 231, 231, 0.685);
  pointer-events: none;
  @media screen and (max-width: 710px) {
    display: none;
  }
  
}
.tbody {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  
}
#days {
  font-weight: 600;
    display: flex;
  .td {
      height: 5%;
      min-height: 5rem;
      text-align: center;
      pointer-events: none;
  }
  @media screen and (max-width: 710px) {
    display: none;
  }
}

.gone {
  background-color:rgba(77, 45, 37, 0.192);
}
.calendar-arrow {
   animation-name: comeandgos;
   left: 0;
   top: -12rem;
  transform: rotate(45deg);
  @keyframes comeandgos {
    from {
      transform: rotate(45deg) translate(-50%, 200%);
    }
    to {
      transform: rotate(45deg) translate(0, 180%);
    }
  }
 
    @media screen and (max-width: 750px) {
     left: 50%;
    transform: rotate(90deg);
    
    @keyframes comeandgos {
      from {
        transform: rotate(90deg) translate(-30%,100%);
      }
      to {
        transform: rotate(90deg) translate(40%,100%);
      }
    }
    
  }
}
</style>
