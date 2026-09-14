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
          <svg v-show="!hoverSocials.instagram" class="img" data="instagram" width="30px" height="30px" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.34197 0.0265953C8.83145 0.0803342 8.2336 0.0265953 7.73652 0.0803342C7.24615 0.134073 6.74235 0.147508 6.25198 0.241551C5.34514 0.409485 4.53905 0.664745 3.82701 1.04763C2.44324 1.77983 1.30128 3.03597 0.716873 4.56753C0.0585714 6.27374 0.0317018 8.40987 0.0317018 10.4788C0.0249845 11.5872 0.0317018 12.6888 0.0249845 13.7972C0.0249845 14.8317 -0.0354718 16.0945 0.0317018 17.1089C0.172767 19.0905 0.0585714 20.8706 1.06618 22.6775C2.1208 24.5786 3.69938 25.7004 5.84894 26.1706C7.13867 26.4527 9.22106 26.4661 10.5645 26.4729C11.6729 26.4729 12.7745 26.4661 13.8829 26.4661C15.6697 26.4661 18.5716 26.5132 20.2644 26.231C22.8036 25.8078 24.9128 24.3367 25.8533 21.8715C26.4981 20.1653 26.5384 18.0224 26.5317 15.94C26.525 14.8317 26.525 13.73 26.5317 12.6217C26.5384 11.5334 26.572 10.3713 26.525 9.30328C26.4309 7.05968 26.4175 5.50125 25.4704 3.75473C24.765 2.45156 23.4887 1.24244 21.9169 0.67818C21.1175 0.389333 20.1099 0.14079 19.1493 0.113921L17.5976 0.0333126C17.161 -0.0271436 16.4086 0.0131606 15.9384 0.0131606C14.8301 0.00644319 13.7284 0.0198779 12.62 0.0198779C12.0625 -0.000274183 9.73829 -0.0137089 9.34197 0.0265953ZM20.1301 4.60112C19.6934 4.7086 19.465 4.76234 19.1225 5.1721C18.9075 5.42064 18.6925 5.93116 18.7664 6.38122C18.9008 7.20074 19.6061 7.88591 20.5868 7.75828C21.9102 7.58363 22.4811 5.85727 21.3526 4.93027C21.0571 4.67501 20.5734 4.48693 20.1301 4.60112ZM13.0097 6.45511C12.882 6.48198 12.7275 6.46183 12.5932 6.47527C12.3379 6.49542 11.7669 6.61633 11.5385 6.67679C8.61649 7.40226 6.28557 10.331 6.48037 13.5554C6.60128 15.6243 7.50141 17.2231 8.61649 18.2307C9.16732 18.721 9.86592 19.2315 10.6787 19.554C11.8879 20.0242 13.0231 20.1585 14.3666 19.9772C17.0669 19.601 19.4919 17.2701 19.9756 14.5092C20.0427 14.1062 20.1435 13.3807 20.0898 12.9441C20.0024 12.2388 20.083 12.2589 19.8681 11.4864C19.7472 11.0296 19.5792 10.6064 19.4046 10.2437C19.0486 9.51823 18.4776 8.76589 17.9469 8.28224C16.9998 7.42913 15.8981 6.81113 14.5614 6.56931C14.1718 6.4887 13.3858 6.38794 13.0097 6.45511ZM12.9492 8.86665C12.5193 8.94054 12.6469 8.85993 12.0222 9.03458C10.6586 9.41747 9.67112 10.4116 9.15388 11.6879C8.8113 12.541 8.79786 13.6427 9.05312 14.5361C9.14045 14.8182 9.25464 15.0869 9.37556 15.3355C9.61066 15.7855 10.007 16.2692 10.3496 16.558C12.2237 18.1702 15.0181 17.9485 16.5833 16.155C17.208 15.4295 17.8462 14.1196 17.6715 12.8769C17.4969 11.6409 17.1274 10.7609 16.2004 9.94143C15.4078 9.24282 14.024 8.67856 12.9492 8.86665ZM11.6057 2.42469L8.91878 2.43813C8.09926 2.465 7.1857 2.51202 6.41992 2.66652C4.07556 3.13674 2.86643 4.72203 2.59102 6.93876C2.53728 7.34852 2.49697 7.75828 2.49026 8.20163C2.48354 8.65169 2.44324 9.05473 2.44324 9.49808C2.44324 11.0498 2.36263 13.4949 2.4298 14.9123C2.51713 16.7394 2.36263 18.3516 2.67163 20.0712C2.79254 20.7429 3.07467 21.4684 3.45084 21.9924C4.25021 23.1209 5.49964 23.759 6.93715 23.9135C8.68367 24.1016 10.4974 24.0748 12.2506 24.0748C13.1373 24.0748 14.0911 24.1016 14.9711 24.0613C15.8511 24.0143 16.7781 24.0748 17.6648 24.0546L18.9478 23.9807C19.3508 23.9203 19.7472 23.8934 20.1368 23.8195C22.4811 23.3627 23.7104 21.7237 23.9858 19.5674C24.0866 18.7748 24.1336 17.8142 24.1336 16.9812C24.1269 15.1877 24.2008 13.3471 24.1403 11.567C24.0866 9.86754 24.2277 7.9598 23.8985 6.38122C23.5895 4.89668 22.7498 3.76817 21.6683 3.19047C20.4458 2.53889 18.6858 2.41126 17.0266 2.43141C15.9787 2.42469 12.3178 2.33065 11.6057 2.42469Z" fill="#FEFEFE"/>
          </svg>

          <svg v-show="!hoverSocials.whatsapp" class="img" data="whatsapp" width="30px" height="30px" viewBox="0 0 29 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M0 27.4348C0.691889 27.3072 4.73574 25.957 5.52167 25.7085C5.99189 25.5607 6.45539 25.4062 6.89201 25.2584C7.17414 25.1644 7.29506 25.0703 7.55703 25.198C7.75855 25.292 7.95336 25.3995 8.18175 25.5002C9.02142 25.8831 9.92155 26.2257 10.8956 26.4205C17.1158 27.7102 22.7853 24.8688 25.5327 19.9114C26.3388 18.4537 27.0979 16.3378 27.1986 14.3024C27.4068 10.01 25.9828 6.65131 23.1951 3.81658C21.0388 1.63344 17.0688 -0.422074 12.501 0.0750105C8.09442 0.558661 5.06489 2.83585 3.17059 5.31456C1.02104 8.14257 -0.208239 12.2805 0.886692 16.7072C1.15539 17.7954 1.63232 19.0113 2.18314 19.9248C2.33764 20.1868 2.39138 20.2607 2.2839 20.6033L0 27.4348ZM9.3237 7.32305C8.67884 7.41709 8.5109 7.62533 8.20862 7.98807C7.21445 9.15689 7.08682 10.7019 7.69138 12.1058C8.12129 13.1067 9.09531 14.5308 9.80064 15.3167C11.265 16.9557 12.5144 18.1044 14.9461 19.0314C15.7321 19.3337 16.874 19.7569 17.8682 19.6696C18.8825 19.5822 19.7423 18.9777 20.1924 18.4403C20.4074 18.1783 20.6089 17.5469 20.6492 17.1304C20.7298 16.331 20.5014 16.331 19.964 16.0489C19.5341 15.8272 17.9152 15.0279 17.4853 14.9808C16.7262 14.9002 16.4575 16.5796 15.591 16.6064C15.02 16.6266 13.6295 15.7063 13.2466 15.4242C12.5615 14.9338 12.0039 14.3158 11.48 13.6441C10.3716 12.2267 10.6605 12.2939 11.3725 11.4677C12.1316 10.581 11.7755 10.3391 11.1911 8.94865C10.6739 7.77983 10.7612 7.10809 9.3237 7.32305ZM3.38555 24.1366C4.46705 23.8343 5.63587 23.4111 6.73752 23.082C7.08682 22.9745 7.49658 22.7058 7.83917 22.9006C8.16832 23.0954 8.41014 23.2566 8.77288 23.438C11.4867 24.7815 14.6103 25.0233 17.4584 24.0493C18.8288 23.5791 20.3603 22.7192 21.2336 21.8661C21.7441 21.3691 22.1942 20.9526 22.6778 20.3615C23.1279 19.8106 23.4906 19.2128 23.8466 18.5343C24.5318 17.2513 25.0423 15.5653 25.0759 13.812C25.1632 9.92938 23.5444 7.1484 21.6568 5.32127C16.7262 0.545226 9.11546 1.41848 5.16565 6.27514C4.21179 7.45068 3.5199 8.61278 3.08999 10.1443C2.63321 11.7767 2.42497 13.6642 2.7877 15.4578C3.11014 17.0699 3.70798 18.5142 4.51407 19.6763C4.82978 20.1331 4.6417 20.2808 4.47376 20.7846C4.34614 21.1675 4.22522 21.5168 4.09759 21.8863C3.97668 22.2356 3.38555 23.8679 3.38555 24.1366Z" fill="#FEFEFE"/>
          </svg>

          <svg v-show="!hoverSocials.telegram" class="img" data="telegram" width="30px" height="30px" viewBox="0 0 29 30" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      telegram: false
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