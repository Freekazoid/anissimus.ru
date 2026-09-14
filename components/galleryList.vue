<template>
  <div class="gallery-list" :id="title.tag" :class="{'padding-top': title?.text.length>0}">
    <h2 class="title" v-if="title?.text.length>0">
      {{ title.text }}
    </h2>

    <!-- ------------- {{ gallere }} ------------- -->

    <div class="list-img">
      <div class="item" v-for="gel in pageGalleries" :key="gel.id">
        <div class="box-modal" v-if="gel?.id">
          <img class="preview" :src="`/galleries/${getname(gallere).name}/A${gel.id}/Pb.jpg`" alt="gallere preview" @click="showGallere({page: gallere, gel: gel.id})">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'galleryList',
  components: {
  },
  props: {
    gallere: {
      type: [String, Number],
      default: '1'
    },
    title: {
      type: Object,
      default: () => ({tag: '', text: ''})
    },
  },
  data: () => ({
  }),
  computed: {
    galleries(){
      return this.$store.state.galleries
    },
    pathGallery(){
      return this.$store.state.pathGallery
    },
    pageGalleries(){
      return this.galleries.filter(item => item.page === this.gallere)
    },
  },
  methods:{
    getname(id){
      return this.pathGallery.filter(item => item.id === id)[0]
    },
    showGallere({page, gel}){
      this.$store.dispatch('showFullScreen', true)
      this.$store.dispatch('selectGalleries', {page: page, id: gel})
    }
  },
  watch:{
  },
  mounted(){
  }
}
</script>

<style lang="scss" scoped>
.padding-top{
  padding: calc(100% / 12) 0 0 0;
}
.gallery-list{
  font-family: 'AGOptCyrillic';
  color: #5C5C5C;

  .title{
    font-size: 3em;
    // width: calc(100% / 5.5);
    margin: 0 0 10px 20px;
    font-family: 'AGOptCyrillic';
    // text-indent: -40px;
    @media only screen and (max-width: 860px) {
      width: calc(100% /2);
      font-size: 2em;
      margin: 0 0 0 20px;
    }
  }
  .list-img{
    // width: calc(100% - 30px);
    display: flex;
    flex-shrink: 0;
    flex-grow: 1;
    flex-flow: row wrap;
    padding: 0 10px 5px;
    justify-content: flex-start;
    .item{
      transition: all .4s ease-out;
      flex-basis: calc((100% / 4) - 10px * 2);
      max-width: calc((100% / 4) - 10px * 2);
      margin: 10px;
      cursor: pointer;

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
        min-width: 100%;
        min-height: 200px;
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