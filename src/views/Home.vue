<template>
  <div id="canvas-container" >
  </div>
  <div class="wrapper">
    <div class="project" id='aboutme'>
      <p class="projectTitle">{{ aboutme.name }}</p>
      <img :alt="aboutme.name + ' logo'" :src="require('../assets/' + aboutme.image)" height="600">
      <p class="projectText"><br>{{ aboutme.summary }}</p>
    </div>
    <p class="header" id="Projects">Projects</p>
    <div class="tagbar">
      <p>Filter: </p>
      <div v-for="tag in allTags"  v-bind:key="tag" v-bind:class="tagClass(tag) + ' tag tagBorder tag' + tag" @click="$event=>toggleTag(tag)">
        {{ tag }}
      </div>
    </div>
    <div v-for="project in filteredProjects" :key="project.abbreviation" class="project" :id="'project' + project.abbreviation">
      <p class="projectTitle">{{ project.name }}</p>
      <img :alt="project.name + ' logo'" :src="require('../assets/' + project.image)" height="600">
      <div class="tagContainer" v-if="project.tags">
        <div v-for="tag in project.tags"  v-bind:key="tag" v-bind:class="tagClass(tag) + ' tag tagBorder tag' + tag" @click="$event=>toggleTag(tag)">
          {{ tag }}
        </div>
      </div>
      <div class="linkContainer" v-if="project.trailer||project.link">
        <a class="link" v-if="project.link" :href="project.link" target="_blank">Play</a>
        <a class="link" v-if="project.trailer" :href="project.trailer" target="_blank">Trailer</a>
      </div>
      <p class="projectText"><br>{{ project.summary }}</p>
      <div class="contributionContainer">
        <h3 v-if="project.contributions" class="contributionHeader">My contributions and takeaways from this project:</h3>
        <ul>
          <li v-for="contribution in project.contributions"  v-bind:key="contribution" class="contribution">
            {{ contribution }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { computed } from "vue";
import allProjects from '@/data/projects.js'
import aboutMe from '@/data/aboutme.js'
import p5 from 'p5'
import { isFlowPredicate, variableDeclarator } from '@babel/types'
import { pathToFileURL } from 'url'
export default {
  setup () {
    const projects = ref(allProjects)
    const aboutme = ref(aboutMe[0])
    const filterTags = ref([])
    const allTags = ref(['Unity', 'Unreal', 'C++', 'Professional', 'WebGL', 'University', 'Released', 'Hobby'])
    const filteredProjects = computed (() => {
      if(filterTags.length == 0) return projects;
      return projects.value.filter(item => {
        return filterTags.value.every(tag => item.tags.includes(tag))
      })
    })
    const toggleTag = (tag) => {
      if(filterTags.value.includes(tag)){
        const index = filterTags.value.indexOf(tag)
        if (index !== -1) {
          filterTags.value.splice(index, 1)
        }
      }
      else filterTags.value.push(tag);
    }
    const tagClass = (tag) => {
      return filterTags.value.includes(tag) ? 'tagHighlight' : 'tagGreyed'
    }
    
    return { projects, filteredProjects, toggleTag, tagClass, aboutme, allTags }
  },
  mounted () {
    // create new p5 instance
    new p5(this.sketch);
  },
  methods: {
    sketch(p) {
      let canvas
      let hexes = [];
      let depth = 0;
      let depthIncrease = 0.003;
      const colors = ['#00a6fb','#0582ca','#006494','#003554','#051923']
      const noiseScale = 0.023;
      let numRows = 40;
      let numCols = 40;
      const cellSize = 60;
      const width = cellSize * p.sqrt(3) / 2;
      const rowOffset = width / 2;
      const radius = cellSize / 2;
      p.setup = () => {
        canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        p.strokeWeight(1)
        canvas.parent('canvas-container'); // set the parent element of the canvas
        createHexGrid();
      };
      
      p.draw = () => {    
        p.background(0);
        depth += depthIncrease;
        for (let i = 0; i < numRows; i++) {
          for (let j = 0; j < numCols; j++) {
            let index = i+numRows*j;
            const x = hexes[index].x;
            const y = hexes[index].y;
            //let colorID = p.floor(5 * p.noise(x * noiseScale,y * noiseScale,depth));
            let alpha = p.hex(p.floor(p.noise(x * noiseScale,y * noiseScale,depth) * 255), 2);
            let newColor = '#00a6fb' + alpha;
            hexes[index].color = newColor;//colors[colorID];
          }
        }
        //hightlightMouseHover();
        for (let i = 0; i < hexes.length; i++) {
          hexes[i].show();
        }
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        createHexGrid();
      }

      function createHexGrid() {
        hexes= [];
        numCols = p.ceil(p.windowHeight / cellSize * 4 / 3 + 1 );
        numRows = p.ceil(p.windowWidth / width);
        for (let i = 0; i < numRows; i++) {
          for (let j = 0; j < numCols; j++) {
            const x = i * width + (j % 2) * rowOffset;
            const y = j * cellSize * 0.75;
            let colorID = p.floor(5 * p.noise(x,y,depth));
            hexes[i+numRows*j] = new Hex(x, y, radius, colorID);
          }
        }
      }

      function hightlightMouseHover(){
        let y = Math.floor((p.mouseY + radius) / cellSize / 0.75);
        let x = Math.floor((p.mouseX + rowOffset - (y % 2) * rowOffset) / width);
        let index = x+numRows*y;
        if(index >= 0 && index < hexes.length)
          hexes[index].color = 'ff0000';
      }

      class Hex {
        constructor(x,y,radius, colorID){
          this.x = x;
          this.y = y;
          this.radius = radius;
          this.color = colors[colorID]
        }
        show(){
          p.fill(this.color);
          p.beginShape();
          for (let i = 0; i < 6; i++) {
            const angle = p.TWO_PI / 6 * (i + 0.5) ;
            const px = this.x + p.cos(angle) * this.radius;
            const py = this.y + p.sin(angle) * this.radius;
            p.vertex(px, py);
          }
          p.endShape(p.CLOSE);
        }
      }

      class LineFollower {
        constructor(speed, thickness, color, noiseOffset, offset, noiseAmplitude, noiseSpeed, angleSpeed){
          this.speed = speed;
          this.thickness = thickness;
          this.color = color;
          this.pos = new p5.Vector(p.random(p.windowWidth/2), p.random(p.windowHeight));
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
  background-color: #003554;
}
.wrapper {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: flex-start;
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 50px;
}

.header {
  font-weight: bold;
  font-size: 5rem;
  font-variant: small-caps;
  text-decoration: underline;
  text-decoration-color: #00A6FB;
  text-shadow:  8px 0px 5px #051923;
  margin: 0.5rem 0 1.3rem 0;
  scroll-margin-top: 90px;
}

.tagbar {
  width: 100%;
  height: fit-content;
  margin-bottom: 3rem;
  p {
    display: inline-flex;
  }
}

.project {
  border: 1px solid;
  border-radius: .5rem;
  border-color: #091116;
  padding: 1rem;
  width: 40%;
  min-width: 584px;
  //background-image: url("@/assets/Background.png");
  background-color: #051923;
  margin-bottom: 100px;
  box-shadow:10px 10px #051923bc;
  img {
    float: center;
    max-width: 100%;
    height: auto;
    border: 1px solid rgb(0, 0, 0);
    border-radius: 12px;
    background-color: #dedede;
  }
}

.project:first-child{
  width: 40%;
  margin-right: 0%;
  margin-left: 50%;
}

@media (max-width: 790px) {
  .project {
    align-self: stretch;
    min-width: auto;
    width: auto;
  }
  .project:first-child {
    align-self: stretch;
    min-width: auto;
    width: 100%;
    margin-right: 0%;
    margin-left: 0%;
  }
}
.projectTitle {
  font-weight: bold;
  font-size: 3rem;
  font-variant: small-caps;
  margin: 0.5rem 0 1.3rem 0;
  overflow: break-word;
}
.contributionHeader {
  text-align: left;
  max-width: 530px;
}
.projectText {
  text-align: left;
  max-width: 530px;
  display: inline-block;
  margin-top: 5px;
}
.tagContainer{
  margin: auto;
  display: block;
}
.tag{
  width: fit-content;
  height: 1rem;
  padding-top: 0.2rem;
  padding-bottom: 0.6rem;
  padding-left: 0.7rem;
  padding-right: 0.7rem;
  margin: 5px;
  display: inline-flex;

  button{
    flex-basis: 100%;
  }
}
.tag:hover{
  cursor: pointer;
  filter:saturate(100%) brightness(100%);
}
.tagHighlight {
  filter:saturate(100%) brightness(100%);
}
.tagGreyed {
  filter:saturate(60%) brightness(80%);
}
.tagBorder{
  color:  rgb(255, 255, 255);
  border-radius: 10px;
  border: 2px solid rgb(255, 255, 255);
  text-shadow: 1px 1px #505050;
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
  ul {
    list-style-position: outside;
  }
}
.contribution{
  text-align: left;
}

.linkContainer{
  margin-top: 20px;
}
.link{
  margin: 0 10px;
  padding: 0.5rem 1rem;
  block-size: auto;
  font-size: xx-large;
  text-decoration: none;
  background-color: #0582CA;
  border-radius: 7px;
  border: 2px solid #ffffff;
}
.link:hover {
  text-decoration: underline;
  background-color: #00A6FB;
  color: white !important;
}
.link:visited {
  color: #ffffff;
}
</style>
