<template>
  <div class="scene" ref="scene" data-pointer-events="true">
    <div class="sce-item" data-depth="0.1">
      <div class="background"></div>
    </div>
    <div class="sce-item" data-depth="0.1">
      <div class="lightbox">
        <img class="lightimg" src="../assets/light-purple.png" alt="">
      </div>
    </div>
    <div class="sce-item board-box" data-depth="0.8">
      <div class="linebox">
          <img class="line" src="../assets/line.png"/>
          <div class="leftpoint1">
            <div class="board board-1"></div>
          </div>
          <div class="leftpoint2">
            <div class="board board-1"></div>
          </div>
          <div class="leftpoint3">
            <div class="board board-1"></div>
          </div>
          <div class="leftpoint4">
            <div class="board board-1"></div>
          </div>
      </div>
    </div>
    <div class="sce-item gallery" ref="outer"  @click="dosth" data-depth="0.8">
      <div class="center">
        <div class="swiperbox swiper-container">
           <div class="swiper-wrapper">
            <div class="swiper-slide">
              <div class="svgbox" ref="svgbox" :style="{width:`${width}px`,height:`${height}px`}">
                <svg ref="svg" xmlns="http://www.w3.org/2000/svg" xlink:xlink="http://www.w3.org/1999/xlink" :width="width" :height="height" class="tributary_svg"></svg>
              </div>
              <p class="words">hello dhahdjkhja</p>
            </div>
            <div class="swiper-slide">
              <img class="photo" src="../assets/xiaohuang.jpg" alt=""/>
              <p class="words">hello dhahda</p>
            </div>
            <div class="swiper-slide">
              <img class="photo" src="../assets/xiaohuang.jpg" alt=""/>
              <p class="words">hello banana</p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
    <div class="sce-item" data-depth="0.9">
      <div class="wave wave-depth-40"></div>
      <div class="wave wave-depth-20"></div>
      <div class="wave wave-depth"></div>
      <div class="wave wave-sundepth-20"></div>
    </div>
    
    <audio ref="audio"  loop src="../../lxstatic/lx.mp3"></audio>
  </div>
</template>

<script>
import Parallax from 'parallax-js'
import Swiper from 'swiper'
import * as d3 from "d3"

export default {
  name: 'MissLuo',
  data () {
    return {
      actives:['1.jpg','2.png'],
    }
  },
  mounted(){
    let that = this
    let scene = this.$refs.scene
    let parallaxInstance = new Parallax(scene)
    var mySwiper = new Swiper('.swiper-container', {
        speed: 400,
        spaceBetween: 100,
    })
    //Overview: There are two images, one blurred and one not blurred.
    //  To acheive the unblur effect, a clipping mask with a bunch of circles
    //  is used on the blurred image. 
    var svg = d3.select("svg")

    //Config
    var circleRadius = 40;
    var blurAmount = 5;
    var clipDelay = 400;
    var clipDuration = 7000;
    var clipEase = 'quad'; //quad and circle look good

    //CLIP
    var clips = svg.append('svg:defs')
        .append('svg:mask')
        .attr({id: 'mask'});

    var addMask = function addMask(x,y){
        //To achieve the unblur effect, we add circles to the clip mask
        var clip = clips.append('svg:circle')
            .attr({ 
                cx: x, 
                cy: y, 
                r: circleRadius, 
                fill: '#ffffff',
                'class': 'clipCircle'
            });
      return clip;
    };

    //Blur filter
    var defs = svg.append('svg:defs');
    var filterBlur = defs.append('svg:filter')
      .attr({ id: 'blur' });
    filterBlur.append('feGaussianBlur')
        .attr({
              'in': "SourceGraphic",
              'stdDeviation': blurAmount
        });

    //IMAGE
    var imageUrl = 'http://localhost:8080/lxstatic/moon.jpg';

    //Add blurred image
    svg.append('svg:image')
        .attr({
          x: 0,
          y: 0,
          filter: 'url(#blur)',
          'xlink:href': imageUrl,
          width: this.width,
          height: this.height,
          fill: '#336699'
        })

    //MASK
    //  Add masked image (regular, non blurred image which will be revealed
    var mask = svg.append('svg:image')
        .attr({
            x: 0,
            y: 0,
            'xlink:href': imageUrl,
            'mask': 'url(#mask)',
            width: this.width,
            height: this.height, filter: 'url(#blur2)',
            fill: '#336699'
        });

    var mouseMove = function move(e){
        //erase on mouse over
        let offset = that.$refs.outer.style.transform
        let offArr = offset.replace(/translate3d\(/,'').replace(')','').split(',')
        let so = that.$refs.svgbox.getBoundingClientRect()
        var x = parseInt(d3.event.pageX - so.x - parseFloat(offArr[0],10) + circleRadius/2,10);
        var y = parseInt(d3.event.pageY - so.y - parseFloat(offArr[1],10) - circleRadius,10);
        //Add mask
        var clip = addMask(x,y);

        clip.transition().ease(clipEase)
            .delay(clipDelay)
            .duration(clipDuration)
            .attr({ 
                fill: '#000000', 
                r: 0
            })
            .each('end', function end(){
                this.remove();
            })

    };
    //attach event
    svg.on('mousemove', mouseMove);


  },
  methods:{
    dosth(){
      console.log(1)
    }
  },
  computed:{
    width(){
      let border = window.innerWidth * 0.9
      return border > 1000 ? 1000 : border
    },
    height(){
      return this.width * 9/16
    }
  }
}
</script>
<style>
@import 'swiper/dist/css/swiper.min.css';
.scene{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: #fff;
}
.sce-item{
  width: 100%;
  height: 100%;
}
.sce-item:nth-child(2){
  position: absolute;
  right: 400px;
  bottom: 500px;
}
.center{
  position: absolute;
  left: 50%;
  top: 50%;
  width: 90%;
  transform: translate(-50%,-50%);
  text-align: center;
}
.words{
  max-width: 90%;
  margin: 15px auto;
}
.background{
  background-image: url(../assets/background.jpg);
  position: absolute;
  left: -10%;
  top: -10%;
  width: 120%;
  height: 120%;;
  background-size:  inherit 120% ;
}
.wave{
  height: 20%;
  position: absolute;
  bottom: 0;
  left: -10%;
  margin-bottom: -10%;
  width: 140%;
}
.wave{
  background-image: url(../assets/wave-plain.png);
  background-repeat: repeat-x;
  background-size: auto 100%;
  background-position: auto bottom;
  animation: wave 8s 0.1s infinite linear;
}
@keyframes wave1 {
  0% {
    transform: rotateZ(0deg) translate3d(0,10%,0) rotateZ(0deg); }
  100% {
    transform: rotateZ(360deg) translate3d(0,10%,0) rotateZ(-360deg); 
    } 
}

@keyframes wave2 {
  0% {
    transform: rotateZ(0deg) translate3d(0,10%,0) rotateZ(0deg);
    }
  100% {
    transform: rotateZ(360deg) translate3d(0,10%,0) rotateZ(-360deg); 
    } 
}
.wave-sundepth-20{
  bottom: -50px;
  animation: wave1 12s 2s infinite linear;
  background-position: -90px bottom;
}
.wave-depth{
  bottom: 0;
  animation: wave1 10s 2s infinite linear;
  background-position: -30px bottom;
}
.wave-depth-20{
  bottom: 20px;
  animation: wave1 5s 4s infinite linear;
  background-position: -80px bottom;
}
.wave-depth-40{
  bottom: 40px;
  animation: wave2 10s 4s infinite linear;
  background-position: -400px bottom;
}

.photo{
  max-width: 100%;
  box-shadow: 0 0 20px rgba(255,255,255,.6);
}
.line{
  width: 100%;

}
.board{
  height: 180px;
  width: 180px;
  background-image: url(../assets/board-cloud-4.png);
  background-repeat: no-repeat;
  background-position: center top;
  background-size: auto 100%;
  position: absolute;
  left: 0;
  top: 0;
  margin: 0 -90px;
  animation: swing 4s infinite alternate cubic-bezier(0.455, 0.03, 0.515, 0.955);
  transform-origin: 50% 0;
}
@keyframes swing {
  0% {
    transform: rotateZ(10deg); }
  100% {
    transform: rotateZ(-10deg); } }
    .board-box{
      z-index: 9999;
    }
  .itembox{
    position: absolute;
    top: 6%;
    left: 80%;
    background: #fff;
  }
.leftpoint1{
  position: absolute;
  left: 15%;
  top: 38%;
}
.leftpoint2{
  position: absolute;
  left: 39%;
  top: 65%;
}
.leftpoint3{
  position: absolute;
  left: 60%;
  top: 65%;
}
.leftpoint4{
  position: absolute;
  left: 80%;
  top: 45%;
}
.leftpoint2 .board{
  background-image: url(../assets/board-birds.png);
  animation: swing 5s .3s infinite alternate cubic-bezier(0.455, 0.03, 0.515, 0.955);
}
.leftpoint3 .board{
  background-image: url(../assets/board-cloud-1.png);
  animation: swing 8s .5s infinite alternate cubic-bezier(0.455, 0.03, 0.515, 0.955);
}
.leftpoint4 .board{
  background-image: url(../assets/board-birds.png);
  animation: swing 7s .2s infinite alternate cubic-bezier(0.455, 0.03, 0.515, 0.955);
}
.linebox{
  position: relative;
  font-size: 0;
  
}
@media (max-width: 1200px){
  .board {
    width: 120px;
    height: 120px;
    margin: 0 -60px;
  }
}
@media (max-width: 800px){
  .board {
    width: 100px;
    height: 100px;
    margin: 0 -50px;
  }
}
.lightbox{
  position: absolute;
  width: 100%;
  height: 100%;
}
.lightimg{
  position: absolute;
  right: -200px;
  bottom: -100px;
}
.playbox{
  color: #fff;
  text-align: center;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.gallery{
  position: relative;
  z-index: 1000000;
}
.svgbox{
  margin: 0 auto;
}
</style>
