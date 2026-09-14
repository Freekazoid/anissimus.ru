<template>
  <div class="panorama" id="visual3D" ref="visual3D">
    <h2 class="title">
      {{ getLanguage.visual3D }}
    </h2>

    <div style="display: flex; align-items: flex-start; flex-direction: column; height: 70px; flex-wrap: wrap;">
      
      <label>
        <input type="button" value="switchColor" @click="switchColor = (switchColor == 'white' ? 'yellow' : 'white')"/>:
        {{ switchColor }}
      </label>

      <label>
        MeshBasicMaterial:  {{ MeshBasicMaterial }}
        <input type="range" min="1" :max="switchColor==='white'? 22 : 11" step="1" style="width: 100px;" @input="changetLight($event, 'MeshBasicMaterial')"/>
      </label>

      <label>
        AmbientLight:  {{ AmbientLight }}
        <input type="range" min="1" :max="switchColor==='white'? 22 : 11" step="1" style="width: 100px;" @input="changetLight($event, 'AmbientLight')"/>
      </label>

      <label>
        DirectionalLight:  {{ DirectionalLight }}
        <input type="range" min="1" :max="switchColor==='white'? 22 : 11" step="1" style="width: 100px;" @input="changetLight($event, 'DirectionalLight')"/>
      </label>

      <label>
        PointLight:  {{ PointLight }}
        <input type="range" min="1" :max="switchColor==='white'? 22 : 11" step="1" style="width: 100px;" @input="changetLight($event, 'PointLight')"/>
      </label>

      <label>
        intensive:  {{ intensive }}
        <input type="range" min="0" max="1" value="1" step="0.1" style="width: 100px;" @input="changetLight($event, 'intensive')"/>
      </label>

    </div>


    <div class="box-panorama" ref="panorama"></div>
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
import * as THREE from 'three'

export default {
  name: 'THREE',
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
    lon: 0,
    lat: 0,
    phi: 0,
    theta: 0,
    requestAnimation: false,

    switchColor: 'white',
    MeshBasicMaterial: "#FFFFFF",
    AmbientLight: "#FFFFFF",
    DirectionalLight: "#FFFFFF",
    PointLight: "#FFFFFF",
    intensive: 1,
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
    changetLight(e, change) {
      const arrayLight = [
        "#000000", "#111111", "#1C1C1C", "#222222", "#333333", "#383838", "#444444", "#555555",
        "#666666", "#717171", "#777777", "#888888", "#8E8E8E", "#999999", "#AAAAAA", "#BBBBBB",
        "#CCCCCC", "#C6C6C6", "#DDDDDD", "#E2E2E2", "#EEEEEE", "#FFFFFF"
      ];
      const arrayYellow = [
        "#FFFFFF", "#FFFFE0", "#FFFFCC", "#FFFFB3", "#FFFF99", "#FFFF80", "#FFFF66", "#FFFF4D",
        "#FFFF33", "#FFFF1A", "#FFFF00"
      ];
      switch (change) {
        case "MeshBasicMaterial":
          this.MeshBasicMaterial = this.switchColor === 'white'? arrayLight[parseInt(e.target.value) - 1] :  arrayYellow[parseInt(e.target.value) - 1];
          break;
        case "AmbientLight":
          this.AmbientLight = this.switchColor === 'white'? arrayLight[parseInt(e.target.value) - 1] :  arrayYellow[parseInt(e.target.value) - 1];
          break;
        case "DirectionalLight":
          this.DirectionalLight = this.switchColor === 'white'? arrayLight[parseInt(e.target.value) - 1] :  arrayYellow[parseInt(e.target.value) - 1];
          break;
        case "PointLight":
          this.PointLight = this.switchColor === 'white'? arrayLight[parseInt(e.target.value) - 1] :  arrayYellow[parseInt(e.target.value) - 1];
          break;
        case "intensive":
          this.intensive = parseFloat(e.target.value);  
          break;
          
      }
      
      this.$refs.panorama.innerHTML = '';
      this.init();
    },
    init() {
      var downloadingImage = new Image();
      downloadingImage.src = this.panorama[this.select].img;
      this.$refs.panorama.classList.add('loading');
      downloadingImage.onload = this.draw;
      clearTimeout(this.loader);
      this.loader = setTimeout(() => this.$refs.panorama.classList.remove('loading'), 1500);
    },
    draw(e) {
      const height = this.$refs.panorama.offsetHeight;//window.innerHeight / 2
      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / height, 0.01, 1200);
      this.camera.target = new THREE.Vector3(0, 0, 0);
      this.scene = new THREE.Scene();
      const geometry = new THREE.SphereGeometry( 300, 60, 40 )
      // -1 выворачивает сферу наизнанку и текстура накладывается изнутри а не снаружи
      geometry.scale(-1, 1, 1);
      var texture = new THREE.TextureLoader().load(this.panorama[this.select].img);
      var material = new THREE.MeshBasicMaterial({ map: texture, color: this.MeshBasicMaterial, overdraw: true });
      this.scene.add(new THREE.Mesh(geometry, material));
      
      const ambientLight = new THREE.AmbientLight(parseInt("#FFFFFF".replace("#", "0x"), 16), this.intensive);
      this.scene.add(ambientLight);
      const light = new THREE.DirectionalLight(parseInt("#FFFFFF".replace("#", "0x"), 16), this.intensive);
      this.scene.add(light);
      const pointLight = new THREE.PointLight(parseInt("#FFFFFF".replace("#", "0x"), 16), this.intensive, 1000);
      pointLight.position.set(300, 300, 300)
      this.scene.add(pointLight)

      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth, height);
      this.$refs.panorama.append(this.renderer.domElement);

      if(this.requestAnimation){
        const cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
        cancelAnimationFrame(this.requestAnimation);
      }
      this.animate();
    },
    onWindowResize() {
      const height = this.$refs.panorama.offsetHeight;
      this.camera.aspect = innerWidth / (innerHeight / 2);
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(innerWidth, height);
    },
    onPointerStart( e ) {
      try {
        var clientX = e.clientX || e.touches[0].clientX;
        var clientY = e.clientY || e.touches[0].clientY;
        this.mouseDownMouseX = clientX;
        this.mouseDownMouseY = clientY;
        this.mouseDownLon = this.lon;
        this.mouseDownLat = this.lat;
        this.$refs.panorama.classList.add('cursor');
      } catch (error) {
        console.Error("onPointerStart", error);
      }
    },
    onPointerMove( e ) {
      try {
        if( e.target?.parentNode?.closest('.box-panorama') ){
          if ( !this.mouseDownMouseX ) return
          var clientX = e.clientX || e.touches[0].clientX,
            clientY = e.clientY || e.touches[0].clientY;

          this.lon = (this.mouseDownMouseX - clientX) * this.camera.fov / 600 + this.mouseDownLon;
          this.lat = (clientY - this.mouseDownMouseY) * this.camera.fov / 600 + this.mouseDownLat;
          e.preventDefault();
        }
      } catch (error) {
        console.log("onPointerMove", error);
      }
    },
    onPointerUp() {
      this.mouseDownMouseX = null;
      this.mouseDownMouseY = null;
      this.$refs.panorama.classList.remove('cursor');
    },
    onDocumentMouseWheel( e ) {
      if( e.target?.parentNode?.closest('.box-panorama') ){
        var fov = this.camera.fov + e.deltaY * 0.05;
        this.camera.fov = THREE.MathUtils.clamp(fov, 10, 75);
        this.camera.updateProjectionMatrix();
        e.preventDefault();
      }
    },
    animate() {
      const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
      this.requestAnimation = requestAnimationFrame(this.animate);
      // азимут поворота камеры в градусах, вращаем камеру
      this.lon += this.mouseDownMouseX ? 0 : 0.005;
      // угол места в градусах ограничиваем от -85 до 85
      this.lat = Math.max(-85, Math.min(85, this.lat));
      // пересчитываем в радианы
      this.phi = THREE.MathUtils.degToRad(90 - this.lat);
      this.theta = THREE.MathUtils.degToRad(this.lon);

      this.camera.target.x = 0.001 * Math.sin(this.phi) * Math.cos(this.theta);
      this.camera.target.y = 0.001 * Math.cos(this.phi);
      this.camera.target.z = 0.001 * Math.sin(this.phi) * Math.sin(this.theta);
      this.camera.lookAt(this.camera.target);
      this.renderer.render(this.scene, this.camera);
    },
    selectImages(index) {
      this.$refs.visual3D.scrollIntoView();
      this.select = index;
      this.$refs.panorama.innerHTML = '';
      this.init();
    },
  },
  mounted() {
    addEventListener('mousedown', this.onPointerStart);
    addEventListener('touchstart', this.onPointerStart);
    addEventListener('touchmove', this.onPointerMove, { passive: false });
    addEventListener('mousemove', this.onPointerMove, { passive: false });
    addEventListener('mouseup', this.onPointerUp);
    addEventListener('touchend', this.onPointerStart);
    // addEventListener('wheel', this.onDocumentMouseWheel, { passive: false })
    addEventListener('resize', this.onWindowResize);
    this.$refs.panorama.oncontextmenu = function(e) {
      e.preventDefault();
    }
    this.init();
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