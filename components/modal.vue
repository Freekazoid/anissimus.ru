<template>
  <div class="custom-modal" v-if="showModalLocal" ref="modal" @click.self="closeModal">
    <div class="box-modal">
      <span class="box-close" @click="closeModal"></span>
      <div class="box-header">
        <slot name="header"></slot>
      </div>
      <div class="box-context">
        <slot name="body"></slot>
      </div>
      <div class="box-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  components: {
  },
  props:{
    showModal: {
      type: Boolean,
      default: () => false,
    },
  },
  data: () => ({
  }),
  computed: {
    showModalLocal(){
      let returnVar = this.showModal
      if(process.client){
        if (returnVar )
          document.body.setAttribute('style', 'overflow: clip;')
        else
          document.body.removeAttribute('style')
      }
      return returnVar
    }
  },
  methods:{
    closeModal(){
      if (process.client) {
        if (!this.showModal)
          document.body.setAttribute('style', 'overflow: clip;')
        else
          document.body.removeAttribute('style')
      }
      this.$emit('closeModal', this.showModal)
    },
    clearScroll(e){
      e.preventDefault();
    }
  },
  watch:{
    showModalLocal(){
      if(this.$refs?.modal){
        this.$refs.modal.addEventListener("touchmove", this.clearScroll, { passive: false })
      }
    }
  },
  mounted(){
  },
  destroyed(){
    this.$refs.modal.removeEventListener("touchmove", this.clearScroll)
  }
}
</script>

<style lang="scss" scoped>
.custom-modal{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000000CC;
  padding: 0;
  z-index: 9;

  .box-modal{
    // width: 310px;
    width: fit-content;
    // height: 330px;
    background-color: #FFFFFF;
    border-radius: 5px;
    position: relative;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    @media only screen and (max-width: 860px) {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }

    .box-close {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 20px;
      height: 20px;
      opacity: 1;
      cursor: pointer;
    }
    .box-close:hover {
      opacity: 0.5;
    }
    .box-close:before,
    .box-close:after {
      position: absolute;
      top: 0;
      left: 8px;
      content: " ";
      height: 20px;
      width: 2px;
      background-color: #5C5C5C;
      border-radius: 10px;
    }
    .box-close:before {
      transform: rotate(45deg);
    }
    .box-close:after {
      transform: rotate(-45deg);
    }

    .box-header{
      width: 100%;
      max-height: 30px;
      color: var(--dark-blue);
      font-size: 1.3em;
      text-align: center;
      padding: 1.3em 0 0 0;
      font-family: 'AGOptCyrillic';
    }
    .box-context{
      width: calc(100% - 40px);
      color: #000000;
      font-size: 1.3em;
      text-align: center;
      font-family: 'AGOptCyrillic';
      height: fit-content;
      padding: 0 20px 24px;
      // @media only screen and (max-width: 860px) {
      //   width: fit-content;
      // }
    }
    .box-footer{
      width: 100%;
      font-family: 'AGOptCyrillic';
      &>div{
        display: flex;
        justify-content: space-around;
        width: 100%;
        margin-bottom: 30px;
      }
    }
  }
}
</style>
