<template>
  <div class="arrowContainer"></div>
</template>
<script>
export default {};
</script>

<style lang="scss">
.arrowContainer {
  position: absolute;
  width: 100px;
  height: 50px;
  z-index: 5;
  background-color: rgb(19, 126, 226);
  -webkit-clip-path: polygon(
    0% 20%,
    60% 20%,
    60% 0%,
    100% 50%,
    60% 100%,
    60% 80%,
    0% 80%
  );
  clip-path: polygon(
    0% 20%,
    60% 20%,
    60% 0%,
    100% 50%,
    60% 100%,
    60% 80%,
    0% 80%
  );
  animation-iteration-count: infinite;
  animation-direction: alternate-reverse;
  animation-timing-function: linear;
  animation-duration: 0.7s;
}
</style>
