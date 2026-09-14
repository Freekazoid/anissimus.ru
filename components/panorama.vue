<template>
  <div class="panorama" id="visual3D" ref="visual3D">
    <h2 class="title">
      {{ getLanguage.visual3D }}
    </h2>

    <div class="box-panorama" ref="panorama">
      <Pano :source="panorama[select].img" ref="pano"/>
    </div>

    <div class="box-imgs">
      <div class="item" v-for="(img, index) in panorama" :key="img.prev" @click="selectImages(index)" v-if="img?.prev">
        <div class="box-modal">
          <img :src="img.prev" alt="image panorama" class="preview">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import * as THREE from 'three'
import { Pano } from 'vuejs-vr'


export default {
  name: 'THREE',
  components: { Pano },
  data: () => ({
    loader: false,
    select: 0,
    camera: false,
    renderer: false,
    scene: false,
    mouseDownMouseX: false,
    mouseDownMouseY: false,
    mouseDownLon: false,
    mouseDownLat: false,
    requestAnimation: false,
  }),
  computed: {
    getLanguage() {
      return this.$store.getters.getLanguage
    },
    panorama() {
      return this.$store.state.panorama
    }
  },
  methods: {
    selectImages(index, mounted=false) {
      var downloadingImage = new Image();
      downloadingImage.src = this.panorama[index].img;
      this.$refs.panorama.classList.add('loading');
      clearTimeout(this.loader);
      this.loader = setTimeout(() => this.$refs.panorama.classList.remove('loading'), 1500);

      if (!mounted) {
        this.$refs.visual3D.scrollIntoView();        
      }

      downloadingImage.onload = () => {
        this.select = index
        this.$refs.pano.$el.removeAttribute('style');
      }
    },
  },
  mounted() {
    this.selectImages(0, true)
    Array.from(this.$refs.pano.$el.children).filter(el => el.nodeName === "DIV")[1].setAttribute('style', 'visibility: hidden;')
  },
}
</script>

<style lang="scss" scoped>
.panorama{
  width: 100vw;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  padding: 10em 0 0 0;

  @media only screen and (max-width: 860px) {
    padding: 4em 0 0 0;
    height: 100%;
  }

  .title{
    font-size: 3em;
    // width: calc(100% / 5.5);
    // margin: 0 0 30px calc(100% / 7);
    margin: 0 0 10px 20px;
    font-family: 'AGOptCyrillic';
    // text-indent: -40px;
    @media only screen and (max-width: 860px) {
      font-size: 2em;
      margin: 0 0 0 20px;
    }
  }
  .box-panorama{
    width: 100%;
    min-height: 60vh;
    overflow: hidden;
    cursor: grab;
    background-image: url('/galleries/no-image.jpeg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    margin-top: 15px;

    @media only screen and (max-width: 860px) {
      min-height: 40vh;
    }
  }
  .loading{
    background-image: url('/loading.gif');
    background-repeat: no-repeat;
    background-position: center;
    background-size: 2%;

    @media only screen and (max-width: 860px) {
      background-size: 5%;
    }
  }
  .cursor{
    // cursor: url('/cursor.cur'), url('/cursor.png'), auto;
    cursor: grabbing;
  }
  .box-imgs{
    width: calc(100% - 30px);
    display: flex;
    flex-shrink: 0;
    flex-grow: 1;
    flex-flow: row wrap;
    padding: 10px 10px 0;

    .item{
      transition: all .4s ease-out;
      flex-basis: calc((100% / 4) - 10px * 2);
      max-width: calc((100% / 4) - 10px * 2);
      margin: 10px;
      cursor: pointer;
      // @media only screen and (min-width: 860px) and (max-width: 1024px) {
      //   flex-basis: calc((100% / 3) - 15px * 2);
      //   max-width: calc((100% / 3) - 15px * 2);
      // }
      @media only screen and (orientation: portrait) and (max-width: 860px) {
        flex-basis: calc((100% / 2) - 10px * 2);
        max-width: calc((100% / 2) - 10px * 2);
      }
      @media only screen and (orientation: landscape) and (max-width: 860px) {
        height: 200px;
      }
      .box-modal{
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-image: url('/galleries/no-image.jpeg');
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
        .preview{
          width: 100%;
          height: 100%;
          transition: transform 1.35s cubic-bezier(0.42, 0.76, 0.52, 0.9);
        }
      }
    }
    .item:hover{
      .preview{
        transform: scale(1.1);
      }
    }
  }

}
</style>