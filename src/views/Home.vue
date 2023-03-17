<template>
  <div id="canvas-container" >
  </div>
  <div class="wrapper">
    <div v-for="project in projects" :key="project.abbreviation" class="project" :id="'project' + project.abbreviation">
      <p class="projectTitle">{{ project.name }}</p>
      <img :alt="project.name + ' logo'" :src="require('../assets/' + project.image)" height="600">
      <div class="tagContainer" v-if="project.tags">
        <div v-for="tag in project.tags"  v-bind:key="tag" v-bind:class="'tag tagBorder tag' + tag">
          {{ tag }}
        </div>
      </div>
      <div class="linkContainer" v-if="project.trailer||project.link">
        <a class="link" v-if="project.trailer" :href="project.trailer" target="_blank">Trailer</a>
        <a class="link" v-if="project.link" :href="project.link" target="_blank">Play</a>
      </div>
      <p class="projectText"><br>{{ project.summary }}</p>
      <p v-if="project.contributions" class="projectText">My contributions and takeaways from this project are:</p>
      <div class="contributionContainer">
        <div v-for="contribution in project.contributions"  v-bind:key="contribution" class="contribution">
          <p>-  {{ contribution }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import allProjects from '@/data/projects.js'
import p5 from 'p5'
import { isFlowPredicate, variableDeclarator } from '@babel/types'
import { pathToFileURL } from 'url'
export default {
  setup () {
    const projects = ref(allProjects)
    return { projects }
  },
  mounted () {
    // create new p5 instance
    new p5(this.sketch);
  },
  methods: {
    sketch(p) {
      let canvas
      let lineFollowers =[];
      p.setup = () => {
        canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.parent('canvas-container'); // set the parent element of the canvas
        p.background('#0D1821'); // set background color to white
        lineFollowers[0] = new LineFollower(3, 6, '#FF0733 ', 0, 70, 900, 0.001, -0.0006);
        lineFollowers[1] = new LineFollower(3, 6, '#809BCE', 1.233, 120, 600, 0.001, 0.0005);
        lineFollowers[2] = new LineFollower(2, 6, '#75BF87', 12.3344, 30, 400, 0.009, 0.002);
      };

      p.draw = () => {
        p.background('#0D18210f');

        lineFollowers.forEach(function(lineFollower){
          lineFollower.update();
        })
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
      }

      class LineFollower {
        constructor(speed, thickness, color, noiseOffset, offset, noiseAmplitude, noiseSpeed, angleSpeed){
          this.speed = speed;
          this.thickness = thickness;
          this.color = color;
          this.pos = new p5.Vector(p.random(p.windowWidth), p.random(p.windowHeight));
          this.desiredPosition = new p5.Vector();
          this.time = 0;
          this.noiseOffset = noiseOffset;
          this.offset = offset;
          this.noiseAmplitude = noiseAmplitude;
          this.noiseSpeed = noiseSpeed;
          this.angleSpeed = angleSpeed * speed;
        }
        update(){
          this.updateDesiredPosition();
          let newPos = this.calcNewPos();
          this.show(newPos);
          this.pos = newPos.copy();
        }
        updateDesiredPosition(){
          this.time += p.deltaTime;
          let offsetMagnitude = this.offset + p.noise(this.noiseOffset, this.time * this.noiseSpeed) * this.noiseAmplitude;
          console.log(offsetMagnitude);
          let offsetAngle = this.time * this.angleSpeed;
          this.desiredPosition.x = p.mouseX + (p.cos(offsetAngle) * offsetMagnitude)
          this.desiredPosition.y = p.mouseY + (p.sin(offsetAngle) * offsetMagnitude)
        }
        calcNewPos(){
          let moveVector = p5.Vector.sub(this.desiredPosition, this.pos);
          let moveDistance = this.speed * p.deltaTime / 10;
          if(moveVector.mag() > moveDistance)
            moveVector.setMag(moveDistance);
          return p5.Vector.add(this.pos, moveVector);
        }
        show(newPos){
          p.stroke(this.color)
          p.strokeWeight(this.thickness)
          p.line(this.pos.x, this.pos.y, newPos.x, newPos.y);
        }
      }
    }
  }
}
</script>

<style lang="scss">
canvas {
  width: 100%;
  height: 100%;
  position: fixed;
  top:0;
  left:0;
  z-index: -1;
  background-color: #0D1821;
}
.wrapper {
  display:flex;
  flex-direction: column;
  margin: 0 auto;
  margin-left: 10%;
  margin-right: 10%;
}

.project {
  border: 1px solid;
  border-radius: .5rem;
  padding: 1rem;
  margin-top: 2rem;
  width: 40%;
  min-width: 584px;
  background-image: url("@/assets/Panel.png");
  scroll-margin-top: 90px;
  img {
    float: center;
    max-width: 100%;
    height: auto;
    border: 1px solid rgb(0, 0, 0);
    border-radius: 12px;
    background-color: #dedede;
  }
}

.project:nth-child(odd) {
  align-self: flex-end;
}
.project:nth-child(even) {
  align-self: flex-start;
}

@media (max-width: 790px) {
  .project {
    align-self: stretch;
    min-width: auto;
    width: auto;
  }
}
.projectTitle {
  font-weight: bold;
  font-size: 2.5rem;
  margin: 1rem 0;
  overflow: break-word;
}

.projectText {
  text-align: left;
  max-width: 530px;
  display: inline-block;
}
.tagContainer{
  margin: auto;
  display: block;
}
.tag{
  width: fit-content;
  height: 1rem;
  padding: 5px;
  margin: 5px;
  display: inline-flex;
}
.tagBorder{
  color:  rgb(255, 255, 255);
  border-radius: 10px;
  border: 2px solid rgb(111, 111, 111);
  //text-shadow: 1px 1px #505050;
}
.tagUnity{
  background-color: rgb(92, 146, 255);
}
.tagUniversity{
  background-color: rgb(187, 51, 51);
}
.tagWebGL{
  background-color: rgb(35, 176, 223);
}
.tagReleased{
  background-color: rgb(35, 223, 107);
}
.tagProfessional{
  background-color: rgb(176, 35, 223);
}
.tagHobby{
  background-color: rgb(220, 35, 223);
}
.tagUnreal{
  background-color: rgb(255, 121, 121);
}
.tagC\+\+{
  background-color: rgb(76, 129, 63);
}
.contributionContainer{
  display: block;
  margin: 0 auto;
  max-width: 530px;
  text-align: left;
}
.contribution{
  text-align: left;
}

.linkContainer{
  margin-top: 10px;
}
.link{
  margin: 0 10px;
  padding: 4px;
  block-size: auto;
  font-size: xx-large;
  text-decoration: none;
  color: grey;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 7px;
}
.link:hover {
  text-decoration: underline;
  color: white !important;
}
.link:visited {
  color: grey;
}
</style>
