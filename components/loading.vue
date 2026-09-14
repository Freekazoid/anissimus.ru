<template>
  <div v-if="loading" class="loading-page">
    <img class="loading" src="loading.gif" alt=""/>
    loading
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  // mounted(){
  //   console.log(this.loading);
  // }
}
</script>

<style lang="scss" scoped>
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  text-align: center;
  font-size: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #FEFEFE;
  font-family: 'AGOptCyrillic';
  color: #5C5C5C;

  .loading {
    width: 2rem;
    height: 2rem;
  }
}
</style>