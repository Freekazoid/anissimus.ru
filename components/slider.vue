<template>
  <div class="slider">
    <Modal :showModal="showModal" @closeModal="closeModal">
      <div slot="header" v-show="showMadalError" class="error">
        {{ getLanguage.notification }}
      </div>
      <div slot="body">
        <customInput :placeholder="getLanguage.feedback_form_name" type="text" @get="getData($event)" key="name"/>
        <customInput :placeholder="getLanguage.feedback_form_contact" type="text" @get="getData($event)" key="contact"/>
        <customTextarea :placeholder="getLanguage.feedback_form_description" @get="getData($event)" rows="3" cols="28" key="description"/>
      </div>
      <div slot="footer">
        <button class="button" @click="postMail">{{ getLanguage.feedback_form_button }}</button>
      </div>
    </Modal>

    <Modal :showModal="showModalMail" @closeModal="closeModal">
      <div slot="body" class="msg">
        <span v-if="isSandMail">
          {{ getLanguage.mailSand }}
        </span>
        <span v-else>
          {{ getLanguage.mailSandError }}
        </span>
      </div>
      <div slot="footer">
        <button class="button" @click="closeModal">{{ getLanguage.close }}</button>
      </div>
    </Modal>

    <div class="context-info">
      <div class="moble-header">
        <Header/>
      </div>
      <div class="box-text">
        <h1 class="title">
          Ekaterina Anisimova
        </h1>
        
        <p class="info" v-for="(title, index) in titles" :key="index">
          <a :href="`#${title.tag}`" v-if="title?.text?.length>0">
            {{ title.text }}
          </a>
          <a href="#visual3D" v-else-if="index === 6">
            {{ getLanguage.visual3D }}
          </a>
        </p>
        <div class="contact" @click="showForm()">{{ getLanguage.button_title }}</div>
      </div>
    </div>

    <div class="box-items">
      <img class="item" :data-index="index==1?'active':''" v-for="(item, index) in filterSliderBySize" :key="index" ref="slide"/>
    </div>
  </div>
</template>

<script>
import Header from "~/components/header"
import Modal from "~/components/modal"
import customInput from "~/components/customInput"
import customTextarea from "~/components/customTextarea"

export default {
  name: 'Slider',
  components: {
    Header, Modal, customInput, customTextarea
  },
  props:{
    titles:{
      type: [Array, Object],
      default: []
    },
  },
  data: () => ({
    currentSlide: 0,
    animationSlide: false,
    timeSlide: 4000,
    showModal: false,
    showModalMail: false,
    showMadalError: false,
    formData: {},
  }),
  computed: {
    innerWidth(){
      return this.$store.state.innerWidth
    },
    getLanguage(){
      return this.$store.getters.getLanguage
    },
    isSandMail(){
      return this.$store.state.isSandMail
    },
    getCurrentSize(){
      return this.$store.getters.getCurrentSize
    },
    slider(){
      return this.$store.state.slider
    },
    filterSliderBySize(){
      return this.slider.filter(item => item.size == this.getCurrentSize?item.value:false)[0]?.value
    }
  },
  methods:{
    animation(){
      this.animationSlide = setInterval(() => {
        let next = this.currentSlide+=1
        if(next > this.$refs.slide.length-1){
          this.currentSlide = 0
          next = 0
        }

        this.$refs.slide.forEach(item => item.dataset.index = '')
        this.$refs.slide[next].dataset.index = 'active'
        this.$refs.slide[next].style.zIndex = 1
        this.$refs.slide[next].style.transition = 'transform 1s ease-out'
        this.$refs.slide[next].style.transform = 'translateX(0)'

        setTimeout(()=> this.$refs.slide.forEach(item => (item.dataset.index ===''?item.setAttribute('style', `transform: translateX(${this.innerWidth}px)`):null) ), 1000)
        setTimeout(()=> this.$refs.slide.forEach(item => (item.dataset.index ===''?item.style.zIndex = 0:null) ), 100)
    }, this.timeSlide)
    },
    showForm(){
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
      this.showModalMail = false
    },
    postMail(){
      if(this.formData?.contact && this.formData.contact.length > 0){
        this.sandMail(this.formData)
        this.showModal = false
      } else {
        this.showMadalError = true
        setTimeout(()=> this.showMadalError = false, 3500)
      }
    },
    getData(e){
      this.formData[e.name] = e.value
    },
  },
  watch:{
    innerWidth(){
      this.$refs.slide.map((item, idx) => ((idx===0?item.setAttribute('style', `transform: translateX(0);`):item.setAttribute('style', `transform: translateX(${this.innerWidth}px);`), item.setAttribute('src', this.filterSliderBySize[idx])) ))
    }
  },
  mounted(){
    // this.$refs.slide.map((item, idx) => ((idx===0?item.setAttribute('style', `transform: translateX(0);`):item.setAttribute('style', `transform: translateX(${this.innerWidth}px);`), item.setAttribute('src', this.filterSliderBySize[idx])) ))
    this.animation()
  },
}
</script>

<style lang="scss" scoped>
.slider{
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  transition: height .4s ease-out;

  // @media only screen and (min-width: 1322px) and (max-width: 1460px) {
  //   height: 90vh;
  // }
  // @media only screen and (min-width: 1024px) and (max-width: 1322px) {
  //   height: 70vh;
  // }
  // @media only screen and (orientation: landscape) and (max-width: 1024px) {
  //   height: 68vh;
  // }
  // @media only screen and (orientation: portrait) and (min-width: 860px) and (max-width: 1024px) {
  //   height: 50vh;
  // }
  // @media only screen and (min-width: 600px) and (max-width: 860px) {
  //   height: 100vh;
  // }

  .error{
    color: coral;
    font-size: .6em;
    // padding: 0 0 0 2em;
    position: absolute;
    text-align: center;
    width: 100%;
  }
  .msg{
    font-family: 'AGOptCyrillic';
    font-size: 1em;
  }
  .button{
    background-color: #C0C0C0;
    color: #FEFEFE;
    border-radius: 20px;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    &:hover{
      box-shadow: 1px 2px 1px #000000;
      transform: scale(1.05);
    }
  }
  .context-info{
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 2;
    background-color: #00000059;
    color: #FFFFFF;

    @media only screen and (max-width: 860px) {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      align-items: center;
      justify-content: space-between;
    }
    .moble-header{
      display: none;

      @media only screen and (max-width: 860px) {
        padding: 0 0 0 0;
        display: flex;
        width: 100%;
        height: 30%;
      }
      @media only screen and (orientation: landscape) and (max-width: 860px) {
        padding: 0;
      }
    }
    .box-text{
      width: 300px;
      margin: calc(100% / 6) auto 0 calc(100% / 5.7);
      font-family: 'AGOptCyrillic';
      transition: margin .4s ease-out;
      // transition: transform .4s ease-out;

      @media only screen and (min-width: 860px) {
        transform: translate(80%, 80%);
        margin: 0;
      }
      @media only screen and (orientation: landscape) and (width: 1024px) {
        transform: translate(60%,44%);
        margin: 0;
      }
      @media only screen and (min-width: 600px) and (max-width: 860px) {
        transform: none;
        margin: 6.5em auto 0 calc(100% / 5.7);
      }
      @media only screen and (max-width: 860px) {
        margin: 0;
        width: 90%;
        height: 70%;
        display: flex;
        flex-direction: column;
        transition: none;
      }

      .title{
        font-family: 'AGOptCyrillic';
        font-size: 4em;
        width: 50%;
        
        @media only screen and (max-width: 860px) {
          font-size: 3em;
          padding: 0 0 20px;
        }

      }
      .info{
        font-family: 'AGOptCyrillic';
        line-height: 2em;
        a{
          margin: 10px 0 0 0;
          color: #FFFFFF;
        }
        &:hover{
          text-decoration: underline;
        }
      }
      .contact{
        width: fit-content;
        padding: 10px 14px;
        background-color: white;
        font-family: 'AGOptCyrillic';
        color: #5C5C5C;
        border-radius: 20px;
        margin: 20px 0 0 0;
        cursor: pointer;

        @media only screen and (max-width: 600px) {
          // margin: calc(100% /4) auto 0;
          margin: 0;
          bottom: 14%;
          position: absolute;
          align-self: center;
        }
      }
      .contact:hover{
        box-shadow: 1px 1px 5px #000;
        transform: scale(1.05);
      }
    }
  }
  .box-items{
    display: flex;
    overflow: hidden;
    height: 100%;
    width: 100%;
    position: absolute;
    align-items: flex-end;
    background-image: url("/slider/slide-h-1.jpg");
    background-size: cover;
    object-fit: cover;

    

    .item{
      z-index: 0;
      position: absolute;
      // height: 100%;
      width: 100%;

      @media only screen and (max-width: 1440px) {
        height: 100vh;
      }

      @media only screen and (orientation: landscape) and (max-width: 860px) {
        // height: 100%;
        width: auto;
      }
      @media only screen and (orientation: portrait) and (max-width: 1440px) {
        height: 100%;
        width: auto;
      }
    }
  }

}
</style>