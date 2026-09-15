<template>
  <simplebar data-simplebar-auto-hide="true" class="index">
    <fullScreenModal v-if="showFullScreen" :showGalleries="getGalleries(selectGalleries)?.value"/>

    <Header v-if="innerWidth > 860" />

    <section>
      <Slider :titles="titles"/>
    </section>

    <section class="main-info">
      <div class="info-box">
        <div class="box-img">
          <img src="~/assets/img/photo.webp" alt="photo" class="img" ref="img"> <!-- photo-old.png -->
        </div>
        <div class="context" ref="context">
          <h2 class="title">
            {{ getLanguage.info_h2 }}
          </h2>
          <h3 class="sub-title">
            {{ getLanguage.info_profession }}
          </h3>
          <p class="text" v-html="getLanguage.info_p_1"></p>
          <p class="text" v-html="getLanguage.info_p_2"></p>
        </div>
        <div class="max-context"></div>
      </div>
    </section>
    
    <section v-for="(title, index) in titles" :key="index">
      <Panorama v-if="index == 7"/>
      <galleryList :gallere="index+1" :title="title"/>
    </section>

    <!-- <section>
    </section> -->

    <footer>
      <div class="box-content">
        <div class="top">
          <a class="logo" href="/">
            <img class="img" src="~assets/img/logo.svg" alt="logo">
            <span class="text-logo">
              Architectural design
            </span>
          </a>

          <div class="linck">
            <a class="tell" href="tel:+7(918) 355-89-00">+7(918) 355-89-00</a>
          </div>
        </div>

        <div class="sociall" @click="runSocial($event)">
          <svg xmlns="http://www.w3.org/2000/svg" class="img" :class="{'hover': hoverSocials.max}" data="max" width="30px" height="30px" viewBox="0 0 720 720">
            <path fill-rule="evenodd" clip-rule="evenodd" fill="#fff" d="M350.4,9.6C141.8,20.5,4.1,184.1,12.8,390.4c3.8,90.3,40.1,168,48.7,253.7,2.2,22.2-4.2,49.6,21.4,59.3,31.5,11.9,79.8-8.1,106.2-26.4,9-6.1,17.6-13.2,24.2-22,27.3,18.1,53.2,35.6,85.7,43.4,143.1,34.3,299.9-44.2,369.6-170.3C799.6,291.2,622.5-4.6,350.4,9.6h0ZM269.4,504c-11.3,8.8-22.2,20.8-34.7,27.7-18.1,9.7-23.7-.4-30.5-16.4-21.4-50.9-24-137.6-11.5-190.9,16.8-72.5,72.9-136.3,150-143.1,78-6.9,150.4,32.7,183.1,104.2,72.4,159.1-112.9,316.2-256.4,218.6h0Z"/>
          </svg>

          <svg xmlns="http://www.w3.org/2000/svg" class="img" :class="{'hover': hoverSocials.mail}" data="mail" width="30px" height="30px"viewBox="0 0 225 225">
            <g transform="translate(0,225) scale(0.1,-0.1)" fill="#fff" stroke="none">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M0 1125 l0 -805 1125 0 1125 0 0 805 0 805 -1125 0 -1125 0 0 -805z m2044 663 c-38 -40 -254 -261 -480 -490 -348 -354 -415 -418 -439 -418 -24 0 -89 61 -419 398 -215 218 -431 439 -480 490 l-90 92 989 0 988 0 -69 -72z m-1342 -749 c-212 -208 -621 -599 -626 -599 -3 0 -6 307 -6 682 l0 683 350 -350 350 -350 -68 -66z m1474 -597 c-3 -2 -160 146 -351 329 l-345 333 347 348 348 348 3 -677 c1 -372 0 -678 -2 -681z m-1246 502 c116 -116 142 -134 195 -134 53 0 69 11 192 133 l111 110 342 -329 342 -329 -497 -3 c-273 -1 -717 -1 -987 0 l-490 3 339 327 c186 180 340 327 343 327 3 1 53 -47 110 -105z"/>
            </g>
          </svg>

          <svg xmlns="http://www.w3.org/2000/svg" class="img" :class="{'hover': hoverSocials.telegram}" data="telegram" width="30px" height="30px" viewBox="0 0 29 30" fill="none" >
            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.77733 13.7931C6.78405 13.7998 6.8042 13.7998 6.8042 13.8132C6.82436 13.8804 9.53817 14.794 9.70611 14.7604L15.8122 10.9852C16.1481 10.7703 16.7459 10.2866 17.1624 10.4008C17.3975 10.8173 17.1154 10.9718 16.6116 11.4353L11.9699 15.7478C11.4257 16.2584 11.4996 16.0367 11.3519 16.8898C11.278 17.3466 11.1369 18.0385 11.1168 18.4885C11.5803 18.2601 12.5543 17.0712 12.9372 16.9435C13.2394 16.9838 13.6492 17.3936 13.8843 17.575C14.3344 17.931 16.3832 19.5163 16.5981 19.5835L18.7275 8.7282C18.5394 8.74163 10.6936 12.0936 9.76656 12.4765C9.47771 12.6108 6.95199 13.6117 6.77733 13.7931ZM18.741 7.18992C17.8543 7.42503 8.91346 11.2674 7.8857 11.6973C7.27442 11.9593 5.60851 12.584 5.23234 12.9131C4.54045 13.5177 4.59419 14.6664 6.09217 15.1433L8.24172 15.8688C8.6582 16.0031 8.59774 15.9225 8.72537 16.3591C9.0075 17.3734 9.3165 18.3878 9.63893 19.3484C9.80015 19.8186 9.96808 20.2821 10.4988 20.4164C11.1638 20.5776 11.5198 20.1813 11.8489 19.8723C13.2865 18.5356 12.8566 18.6094 13.9985 19.4961C14.5157 19.8992 15.698 20.9337 16.3429 21.0277C16.9676 21.115 17.4647 20.8665 17.7401 20.5306C18.0759 20.1209 18.0961 19.6909 18.217 19.0394L20.1113 9.35292C20.2188 8.77522 20.4002 8.23112 20.0777 7.70044C19.8493 7.33771 19.359 7.02199 18.741 7.18992Z" fill="#FEFEFE"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.0311 0.0493729C10.9286 0.257611 9.45751 0.56661 7.56321 1.54063C6.07196 2.30641 4.63444 3.42149 3.63356 4.55001C1.46385 7.00185 -0.262516 10.4344 0.0330484 14.8074C0.315178 18.8446 2.29008 22.2167 4.54712 24.1849C7.29452 26.5762 10.8816 28.1145 14.8113 27.7854C18.5125 27.4697 21.804 25.9381 24.1685 23.278C26.3382 20.8396 28.0579 17.36 27.769 13.034C27.4869 8.93645 25.5725 5.75242 23.2617 3.6566C22.0526 2.56167 20.6151 1.62124 18.9895 0.983087C17.3101 0.318067 15.1404 -0.158865 13.0311 0.0493729ZM13.2327 2.17878C12.749 2.23923 12.3661 2.24595 11.8959 2.31984C9.26271 2.74975 7.03926 4.08651 5.25244 5.94722C3.55967 7.71389 1.84674 11.1263 2.15574 14.6193C2.49161 18.3206 3.86195 20.5575 5.93761 22.566C7.72443 24.2923 11.0562 25.9314 14.6097 25.6627C18.1095 25.4007 20.7561 23.8288 22.5497 21.8808C24.3432 19.9261 25.9016 16.8294 25.6464 13.2087C25.3844 9.5746 23.7857 7.12948 21.8645 5.26877C20.8502 4.28803 19.594 3.56927 18.2707 2.9983C17.0414 2.45419 14.7642 1.99741 13.2327 2.17878Z" fill="#FEFEFE"/>
          </svg> 


        </div>
      </div>
    </footer>
    <Loading :loading="loading()"/>
  </simplebar>
</template>

<script>
import simplebar from 'simplebar-vue';
import 'simplebar-vue/dist/simplebar.min.css';

import Loading from "~/components/loading"
import Header from "~/components/header"
import Slider from "~/components/slider"
import galleryList from "~/components/galleryList"
import fullScreenModal from "~/components/fullScreenModal"
import Panorama from "~/components/panorama"



export default {
  name: 'IndexPage',
  components: {
    Loading, simplebar, fullScreenModal, Header, Slider, galleryList, Panorama
  },
  head() {
    return {
      title: 'architectural design - Екатерина Анисимова',
      // meta: [
      //   {
      //     hid: 'description',
      //     name: 'description',
      //     content: 'My custom description'
      //   }
      // ]
    }
  },
  data: () => ({
    loader: true,
    titles: [],
    hoverSocials:{
      instagram: false,
      whatsapp: false,
      telegram: false,
      max: false,
      mail: false,
    },
  }),
  computed: {
    innerWidth(){
      return this.$store.state.innerWidth
    },
    selectLanguage(){
      return this.$store.state.selectLanguage
    },
    galleries(){
      return this.$store.state.galleries
    },
    getLanguage(){
      return this.$store.getters.getLanguage
    },
    showFullScreen(){
      return this.$store.state.showFullScreen
    },
    selectGalleries(){
      return this.$store.state.selectGalleries
    },
    getCurrentSize(){
      return this.$store.getters.getCurrentSize
    },
  },
  methods:{
    getRandom() {
      var letters = '0123456789ABCDEF';
      var color = '';
      for (var i = 0; i < 10; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
    getGalleries(gallere){
      return this.galleries.find(item => item.id == gallere.id && item.page == gallere.page)
    },
    runSocial(e){
      const parent = e.target.closest('.img')
      if(parent){
        const social = parent.getAttribute('data')
        switch (social) {
          case 'instagram':
            window.open("https://instagram.com/anissimus?igshid=MzRlODBiNWFlZA==", '_blank').focus()
            // console.log('go to linck 1', social);
            break;
          case 'whatsapp':
            window.open("https://api.whatsapp.com/send/?phone=79183558900", '_blank').focus()
            // console.log('go to linck 2', social);
            break;
          case 'telegram':
            window.open("https://t.me/anissimus", '_blank').focus()
            // console.log('go to linck 3', social);
            break;
          case 'max':
            window.open("https://max.ru/u/f9LHodD0cOJ5MBkBNYPUul-pM1MneHmhmPEhWvrlj4brA8mKte8eDJ4kqwg", '_blank').focus()
            // console.log('go to linck 4', social);
            break;
          case 'mail':
            window.location.href = "mailto:anissimus@mail.ru"
            // console.log('go to linck 5', social);
            break;
          default:
            break;
        }
      }
    },
    updatedLanguge(){
      this.titles = []
      const titles = Object.keys(this.getLanguage).filter(item => item.indexOf('subTitle') != -1  )
      titles.forEach(item => { this.titles.push( {text: this.getLanguage[item], tag: this.getRandom()} )} )
    },
    resizeWindow(){
      this.$store.dispatch('innerWidth', window.innerWidth)
    },
    loading(){
      setTimeout(()=> this.loader = false, 2000)
      return this.loader
    }
  },
  watch:{
    selectLanguage(newVal,oldVal){
      if(newVal !== oldVal){
        this.updatedLanguge()
      }
    },
  },
  mounted(){
    this.updatedLanguge()
    this.resizeWindow()
  },
  created(){
    window.addEventListener('resize', this.resizeWindow )
  },
  destroyed(){
    window.removeEventListener('resize', this.resizeWindow )
  }
}
</script>

<style lang="scss" scoped>
section{
  user-select: none;
}
.index{
  overflow: auto;
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  .main-info{
    width: 100vw;
    padding: calc(100% / 6) 0 calc(100% / 12);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: padding .4s ease-out;
    transition: height .4s ease-out;

    @media only screen and (max-width: 1000px) {
      height: fit-content;
      padding: 3em 0 3em;
    }

    .info-box{
      max-width: 1200px;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: flex-start;
      justify-content: center;
      transition: width .4s ease-out;
      transition: transform .4s ease-out;

      @media only screen and (min-width: 860px) and (max-width: 1000px) {
        max-width: calc(100% / 1.1);
      }
      .box-img{
        width: 330px;
        height: 304px;
        // margin-right: 3em;
        overflow: hidden;
        background-image: url('/galleries/no-image.jpeg');
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;

        @media only screen and (max-width: 860px) {
          margin: 0;
        }
        .img{
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
          transition: margin .4s ease-out;

          @media only screen and (min-width: 600px) and (max-width: 1000px) {
            margin-right: inherit;
          }
          @media only screen and (max-width: 860px) {
            margin: 0;
          }
        }
      }
      .context{
        width: 60%;
        display: flex;
        height: 100%;
        color: #5C5C5C;
        justify-content: space-between;
        flex-direction: column;
        font-family: 'AGOptCyrillic';
        transition: padding .4s ease-out;
        transition: width .4s ease-out;

        @media only screen and (min-width: 600px) and (max-width: 1000px) {
          padding: 40px 0 0 0;
          width: 100%;
        }
        @media only screen and (max-width: 860px) {
          width: 80%;
          padding: 30px 0 0 0;
        }
        .title{
          font-family: 'AGOptCyrillic';
          font-size: 3em;
          line-height: .8em;
          @media only screen and (max-width: 860px) {
            font-size: 2.4em;
            line-height: 1em;
          }
        }
        .sub-title{
          font-family: 'AGOptCyrillic';
          font-size: 2em;
          line-height: 1.4em;
          @media only screen and (max-width: 860px) {
            font-size: 1.4em;
          }
        }
        .text{
          font-family: 'AGOptCyrillic';
          line-height: 1.2em;
          @media only screen and (max-width: 860px) {
            padding-top: 25px;
          }
        }
        .text:last-child{
          margin-top: .8em;
        }
      }
      .max-context{
        color: #5C5C5C;
        font-family: "AGOptCyrillic";
        margin-top: 10px;
        .text{
          line-height: 1.2em;
          white-space: pre-wrap;
          @media only screen and (max-width: 860px) {
            padding-top: 25px;
          }
        }
        .text:last-child{
          margin-top: .8em;
        }
      }
  
    }
  }
  footer{
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    background-color: #C0C0C0;
    font-family: 'AGOptCyrillic';
    margin-top: 4em;

    @media only screen and (orientation: landscape) and (max-width: 860px) {
      height: 170px;
    }
  
    .box-content{
      height: 56%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      
      .top{
        background-color: #C0C0C0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        height: 60px;
  
        .logo{
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: fit-content;
          color: #FFFFFF;
          cursor: pointer;
          .text-logo{
            font-family: 'AGOptCyrillic';
          }
        }
        .linck{
          display: flex;
          flex-wrap: wrap;
          @media only screen and (max-width: 860px) {
            flex-direction: column;
          }
          @media only screen and (orientation: landscape) and (max-width: 860px) {
            margin-top: 0;
          }
          .mail{
            font-family: 'AGOptCyrillic';
            margin-right: 20px;
            @media only screen and (max-width: 860px) {
              margin: 0;
            }
          }
          .tell, .mail{
            font-family: 'AGOptCyrillic';
            color: #FFFFFF;
            cursor: pointer;
          }
          .tell{
            @media only screen and (max-width: 860px) {
              flex-direction: column;
              margin-top: 10px;
            }
          }
        }
      }
  
  
  
      .sociall{
        width: 110px;
        height: 30px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
    
        .img{
          transition: transform 0.5s ease-in-out;
          &:hover{
            transform:  scale(1.2);
          }
        }
        .hover{
          transform:  scale(1.2);
        }
      }
    }
  }
}
</style>