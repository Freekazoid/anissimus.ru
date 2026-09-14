<template>
  <canvas ref="canvas"></canvas>
</template>

<script>
export default {
  data: () => ({
    canvas: null,
    ctx: null,
    img: null,
    canvasWidth: window.innerWidth,
    canvasHeight: window.innerHeight,
    imgX: 0,
    imgY: 0,
    imgWidth: 0,
    imgHeight: 0,
    isDragging: false,
    startX: 0,
    startY: 0,
    offsetX: 0,
    offsetY: 0,
    tapedTwice: false,
    zoomScale: 2.7,
    isZoom: false,
  }),
  props: {
    image: {
      type: String,
      default: () => []
    },
  },
  methods: {
    resizeCanvas() {
      const dpi = window.devicePixelRatio || 1;
      this.ctx.scale(dpi,dpi);
      this.canvasWidth = window.innerWidth * dpi;
      this.canvasHeight = window.innerHeight * dpi;
      this.canvas.width = this.canvasWidth;
      this.canvas.height = this.canvasHeight;
      this.canvas.style.width = window.innerWidth + "px";
      this.canvas.style.height = window.innerHeight + "px";
      let scale = Math.min(this.canvasWidth / this.img.width, this.canvasHeight / this.img.height);
      this.imgWidth = this.isZoom? this.img.width*this.zoomScale : this.img.width * scale;
      this.imgHeight = this.isZoom? this.img.height*this.zoomScale : this.img.height * scale;
      this.imgX = (this.canvasWidth - this.imgWidth) / 2;
      this.imgY = (this.canvasHeight - this.imgHeight) / 2;

      this.redraw();
    },
    redraw() {
      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.ctx.imageSmoothingEnabled = false;

      this.ctx.drawImage(this.img, this.imgX, this.imgY, this.imgWidth, this.imgHeight);

      this.ctx.font = `bold 2em AGOptCyrillic`;
      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      this.ctx.shadowColor = "rgba(0 0 0, 39%)";
      this.ctx.shadowBlur = 10;
      this.ctx.shadowOffsetX = 4;
      this.ctx.shadowOffsetY = 0;

      let text = 'designed by\n@Anissimus';
      let lines = text.split('\n'); // разделяем текст на две строки
      let x = this.imgX + this.imgWidth - 50;
      let y = this.imgY + this.imgHeight - 20;

      this.ctx.save();
      this.ctx.translate(x, y);
      this.ctx.rotate(-Math.PI / 2);

      for (let i = 0; i < lines.length; i++) {
        // this.ctx.lineWidth=0.1;
        // this.ctx.strokeText(lines[i], 0, i * 30 + 2);
        this.ctx.lineWidth=2;
        this.ctx.fillText(lines[i], 0, i * 30); // рисуем каждую строку текста с отступом 30 пикселей
        
      }

      this.ctx.restore();
    },
    zoomImages(event){
      event.preventDefault();
      let delta = Math.sign(event.deltaY);
      let newWidth = this.imgWidth + delta * 50;
      let newHeight = newWidth * this.img.height / this.img.width;

      if (newWidth >= this.canvasWidth && newWidth <= (this.canvasWidth*2)) {
        this.imgWidth = newWidth
        this.imgHeight = newHeight

        this.imgX = (this.canvasWidth - this.imgWidth) / 2
        this.imgY = (this.canvasHeight - this.imgHeight) / 2
        this.redraw();
      }
    },
    handleMouseDown(e){
      this.isDragging = true;
      this.startX = e?.clientX || e.touches[0].clientX
      this.startY = e?.clientY || e.touches[0].clientY

      if(!this.tapedTwice) {
        this.tapedTwice = true
        setTimeout( () => { this.tapedTwice = false; }, 100 )
        return false;
      }

      if(this.tapedTwice && !this.isZoom){
        this.isZoom = true

        this.imgWidth = this.imgWidth * this.zoomScale
        this.imgHeight = this.imgHeight * this.zoomScale
      } else if(this.tapedTwice && this.isZoom) {
        this.isZoom = false
        this.isDragging = false;

        this.imgWidth = this.imgWidth / this.zoomScale
        this.imgHeight = this.imgHeight / this.zoomScale
      }
      this.imgX = (this.canvasWidth - this.imgWidth) / 2
      this.imgY = (this.canvasHeight - this.imgHeight) / 2
      this.redraw();
    },
    moveImages(e){
      if(e.type === "touchmove"){
        e.preventDefault()
        e.stopPropagation()
      }
      if (this.isDragging) {
        this.canvas.style.cursor = 'move'
        var clientX = e.clientX || e.touches[0].clientX,
            clientY = e.clientY || e.touches[0].clientY;
        this.offsetX = clientX - this.startX;
        this.offsetY = clientY - this.startY;

        let newX = this.imgX + this.offsetX;
        let newY = this.imgY + this.offsetY;

        if (newX <= 0 && newX + this.imgWidth >= this.canvasWidth) {
          this.imgX = newX;
        }

        if (newY <= 0 && newY + this.imgHeight >= this.canvasHeight) {
          this.imgY = newY;
        }

        this.startX = clientX;
        this.startY = clientY;
        this.redraw();
      }
    },
    handleMouseUp(e){
      this.isDragging = false;
      this.canvas.removeAttribute('style')
    },
    init(){
      this.canvas = this.$refs.canvas;
      this.ctx = this.canvas.getContext('2d');
      this.canvas.style.width = window.innerWidth + "px";
      this.canvas.style.height = window.innerHeight + "px";
      this.img = new Image();
      this.img.src = this.image;
      this.img.onload = () => {
        this.resizeCanvas();
      }

      this.canvas.oncontextmenu = function(e) {
        e.preventDefault();
      }
      window.addEventListener('resize', this.resizeCanvas)
      this.canvas.addEventListener('wheel', this.zoomImages)
      this.canvas.addEventListener('mousedown', this.handleMouseDown)
      this.canvas.addEventListener("touchstart", this.handleMouseDown);
      this.canvas.addEventListener('mousemove', this.moveImages)
      this.canvas.addEventListener('touchmove', this.moveImages, { passive: false })
      this.canvas.addEventListener('mouseup', this.handleMouseUp)
      this.canvas.addEventListener('touchend', this.handleMouseUp);
      this.canvas.addEventListener('mouseleave', this.handleMouseUp)
    }
  },
  mounted() {
    this.init()
  },
  destroyed(){
    window.removeEventListener('resize', this.resizeCanvas )
    this.canvas.removeEventListener("touchstart", this.tapHandler);
    this.canvas.removeEventListener('wheel', this.zoomImages)
    this.canvas.removeEventListener('mousedown', this.handleMouseDown)
    this.canvas.removeEventListener('mousemove', this.moveImages)
    this.canvas.removeEventListener('touchmove', this.moveImages, { passive: false })
    this.canvas.removeEventListener('mouseup', this.handleMouseUp)
    this.canvas.removeEventListener('mouseleave', this.handleMouseUp)
  }
};
</script>