<template>
   <div class="circle"></div>
</template>


<script>
export default {
    
}
</script>


<style lang="scss" >
.circle {
    height: 3rem;
    width: 3rem;
    border-radius: 50%;
    border: .3rem solid rgb(19, 126, 226);
    border-left-color: transparent;
    border-top-color: transparent;
    animation: rotate .5s infinite;
    animation-timing-function: linear;
    position: absolute;
}
@keyframes rotate {
    from{
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>
