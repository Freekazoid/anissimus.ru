<template>
  <div class="full-screen" ref="fullScreen">
    <div class="header" :ref="setItemRef">
      <div class="box-length">
        <span>{{ currentSlide+1 }}</span> &frasl; <span>{{ lengthSlide }}</span>
      </div>
      <div class="cross" @click="closeModal"></div>
    </div>

    <div class="left" @click="selectSlide('prev')" :ref="setItemRef" @mousemove="hover($event)">
      <div class="arrow prev"></div>
    </div>

    <div class="box-img-full" ref="boxFull">
      <watermark  class="item-full" :image="item" v-for="(item, index) in showGalleries" :key="item" :ref="`fullImg-${index}`"/>
    </div>

    <div class="right" @click="selectSlide('next')" :ref="setItemRef" @mousemove="hover($event)">
      <div class="arrow next"></div>
    </div>

    <div class="box-preview" @mousemove="hover($event)" :ref="setItemRef" :class="{'up': isiOS()}">
      <div class="preview" v-for="(item, index) in showGalleries" :key="index" @click="setFullImg(index)">
        <div class="font" :class="{'show': index==0}" ref="navigation"></div>
        <img :src="item" alt="preview images">
      </div>
    </div>

  </div>
</template>

<script>
import watermark from '~/components/watermark';

export default {
  name: 'fullScreenModal',
  components: {
    watermark
  },
  props:{
    showGalleries:{
      type: Array,
      default: ()=>[]
    }
  },
  data: () => ({
    currentSlide: 0,
    lengthSlide: 0,
    zoom: 0,
    hiddenControl: false,
    itemRefs: [],
    touchstartX: 0,
    touchstartY: 0,
    tapedTwice: false,
  }),
  computed: {
    innerWidth() {
      return this.$store.state.innerWidth
    },
  },
  methods:{
    init() {
      if(this.showGalleries.length){
        this.toggleFullScreen()
        this.lengthSlide = this.showGalleries.length
        this.hover()
        this.$refs.fullScreen.addEventListener('touchstart', this.touchstart, false)
        this.$refs.fullScreen.addEventListener('touchend', this.touchend, false)
      } else {
        this.$store.dispatch('showFullScreen', false)
        this.$refs.fullScreen.removeEventListener('touchstart', this.touchstart)
        this.$refs.fullScreen.removeEventListener('touchend', this.touchend)
      }
    },
    touchstart(e) {
      // this.touchstartX = e.changedTouches[0].screenX;
      // this.touchstartY = e.changedTouches[0].screenY;
    },
    touchend(e) {
      // const touchendX = e.changedTouches[0].screenX;
      // const touchendY = e.changedTouches[0].screenY;

      // if (touchendX < this.touchstartX) {
      //   this.selectSlide('next')
      // } else if (touchendX > this.touchstartX) {
      //   this.selectSlide('prev')
      // }

      // if (touchendY > this.touchstartY) {// down
      //   this.closeModal()
      // }
      this.hover()
    },
    closeModal() {
      this.toggleFullScreen()
      this.$store.dispatch('showFullScreen', false)
    },
    selectSlide(directtion) {
      let currentSlide = 0
      switch (directtion) {
        case 'prev':
          if(this.currentSlide-1 > 0){
            currentSlide = this.currentSlide-1
          } else if(this.currentSlide-1 < 0){
            currentSlide = this.lengthSlide-1
          }

          this.setFullImg(currentSlide)
          break;
        case 'next':
          if(this.currentSlide+1 < this.lengthSlide){
            currentSlide = this.currentSlide+1
          }

          this.setFullImg(currentSlide)
          break;

        default:
          console.log('selectSlideId', directtion);
          break;
      }
    },
    setFullImg(index) {
      this.zoom = 0
      this.currentSlide=index
      this.$refs[`fullImg-${this.currentSlide}`][0].$el.style.transform = `scale(1)`
      Array.from(this.$refs.navigation).map(item => (item.classList.remove('show'), item.classList.remove('show')))
      Array.from(this.$refs.navigation)[this.currentSlide].classList.add('show')
      this.$refs.boxFull.style.transform = `translate(-${this.currentSlide*100}%, 0px)`
    },
    setItemRef(el) {
      if (el) {
        this.itemRefs.push(el)
      }
    },
    hover() {
      clearTimeout(this.hiddenControl)
      this.itemRefs.map(item =>{
        item.classList.add('show')
      })
      this.hiddenControl = setTimeout(()=>{
        this.itemRefs.map(item =>{
        item.classList.remove('show')
      })
      }, 5000)
    },
    toggleFullScreen() {
      if(this.innerWidth < 860){
        if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
          if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
          } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
          } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
          }
        } else {
          if (document.cancelFullScreen) {
            document.cancelFullScreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
          }
        }
      }
    },
    isiOS() {
      return [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
      ].includes(navigator.platform)
      // iPad on iOS 13 detection
      || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
    },
  },
  watch:{
  },
  mounted(){
    this.init()
  },
}
</script>

<style lang="scss" scoped>
.full-screen{
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  color: #F5F5F5;
  user-select: none;
  z-index: 4;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: wrap row;

  .box-img-full{
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    flex-direction: row;
    transition: transform 1s ease-in-out;
    .item-full{
      min-width: 100%;
      min-height: 100%;
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
      transition: transform .8s ease-in-out;
    }
  }
  .header{
    width: calc(100% - 20px);
    height: 30px;
    padding-left: 20px;
    padding-top: 10px;
    z-index: 2;
    opacity: 0;
    align-self: flex-start;

    .box-length{
      width: 40px;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      font-family: 'AGOptCyrillic';
      font-size: 1em;
      span{
        font-family: 'AGOptCyrillic';
      }
    }
    .cross{
      position: absolute;
      top: 10px;
      right: 20px;
      width: 20px;
      height: 20px;
      opacity: 1;
      cursor: pointer;

      &::after, &::before{
        position: absolute;
        top: 0;
        left: 8px;
        content: " ";
        height: 20px;
        width: 2px;
        background-color: #F5F5F5;
        border-radius: 10px;
      }
      &::before{
        transform: rotate(45deg);
      }
      &::after{
        transform: rotate(-45deg);
      }
    }
  }
  .left, .right{
    width: calc(100%/ 12);
    height: 100%;
    display: flex;
    align-items: center;
    background-color: #00000033;
    position: absolute;
    opacity: 0;
    z-index: 1;
    cursor: pointer;
  }
  .arrow{
    width: 20px;
    height: 20px;
    border-top: 2px solid #F5F5F5;
    border-right: 2px solid #F5F5F5;
    margin: 0 auto;
  }
  .prev{
    transform: rotate(-135deg);
  }
  .next{
    transform: rotate(45deg);
  }
  .left{
    top: 0;
    left: 0;
  }
  .right{
    top: 0;
    right: 0;
  }
  .box-button{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 1;
    opacity: 0;

    .left, .right{
      width: 8%;
      height: 100%;
      display: flex;
      align-items: center;
      background-color: #00000033;
      cursor: pointer;
    }
    .arrow{
      width: 20px;
      height: 20px;
      border-top: 2px solid #F5F5F5;
      border-right: 2px solid #F5F5F5;
      margin: 0 auto;
    }
    .prev{
      transform: rotate(-135deg);
    }
    .next{
      transform: rotate(45deg);
    }
  }
  .box-preview{
    width: 100%;
    height: 80px;
    padding-bottom: 6px;
    position: relative;
    display: flex;
    align-items: stretch;
    justify-content: center;
    flex-direction: row;
    z-index: 2;
    opacity: 0;
    align-self: flex-end;

    @media only screen and (orientation: landscape) and (max-width: 860px) {
      width: 50%;
      height: 40px;
    }

    .preview{
      border: 0.5px solid #F5F5F5;
      margin: 0 5px;
      overflow: hidden;
      cursor: pointer;
      position: relative;
      .font{
        width: 100%;
        height: 100%;
        position: absolute;
        background-color: #00000099;
        transition: background .8s ease-out;
      }
      img{
        width: 100px;
        height: 100px;
        transition: transform 0.5s ease-in-out;
      }
      .show{
        background-color: transparent;
      }
    }
  }
  .up{
    padding-bottom: calc(100% / 3.5);
  }
  .show{
    opacity: 1;
  }
}
</style>