<template>
    <div class="notificationContainer">
        <ul v-if="notifications">
            <li v-for="(n,i) in notifications" :key="i">
                <small>{{n.day}}</small>
                <p>Your todo "{{n.name }}" at {{n.time}} was undone</p>
            </li>
        </ul>
         <p v-else>
             you have no notification
         </p>
    </div>
</template>

<script>
export default {
    data() {
        return {
        
        }
    },
    computed :{
        notifications () {
            return ['aaaaaaaaaaaaaaaaaaa','bbbbbbbbbbbbbbbbbb','cccccccccccccccccc']
        }
    }
}
</script>

<style lang="scss" >
$blue : rgb(19, 126, 226);
.notificationContainer{
 border-radius: 3px;
 top :7rem;
 right: 0;
 z-index: 20;
    ul {
        list-style: none;
        
        li {
            font-size: 1.7rem;
            background-color: #fff;
            padding: 1rem 2rem;
            text-align: left;
           &:not(:last-child) {
                border-bottom:1px solid rgba(51, 51, 51,.25)
           }
           small {
               color: rgb(138, 138, 138)
           }
        }
    }
      @media screen and(max-width: 400px){
         top: 10.5rem;
         left:45%;
       
        }
          @media screen and(max-width: 500px){
         top: 10.5rem;
         left:35%;
       
        }
     &::after {
         content: "";
        position: absolute;
         top: -2rem;
         right:2rem;
        height: 2.5rem;
         width : 2.5rem;
        background-color: white;
        clip-path: polygon(50% 0 ,50% 0, 100% 100%, 0 100%);
        @media screen and(max-width: 400px){
         top: 0.5rem;
         left:-2rem;
         transform: rotate(-90deg);
         display: initial;
        }
         @media screen and(max-width: 500px){
         display: none;
         
        }
        
    }

}


</style>
