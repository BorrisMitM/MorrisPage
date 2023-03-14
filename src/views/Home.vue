<template>
  <div class="wrapper">
    <div v-for="project in projects" :key="project.abbreviation" class="project" :id="'project' + project.abbreviation">
      <p class="projectTitle">{{ project.name }}</p>
      <img :alt="project.name + ' logo'" :src="require('../assets/' + project.image)" height="600">
      <div class="tagContainer" v-if="project.tags">
        <div v-for="tag in project.tags"  v-bind:key="tag" v-bind:class="'tag tagBorder tag' + tag">
          {{ tag }}
        </div>
      </div>
      <div class="tagContainer" v-if="project.trailer||project.link">
        <a class="tag link" v-if="project.trailer" :href="project.trailer" target="_blank">Trailer</a>
        <a class="tag link" v-if="project.link" :href="project.link" target="_blank">Play</a>
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
import allHobbyProjects from '@/data/hobbyProjects.js'
import allStudentProjects from '@/data/studentProjects.js'

export default {
  setup () {
    const projects = ref(allProjects)
    const hobbyProjects = ref(allHobbyProjects)
    const studentProjects = ref(allStudentProjects)
    return { projects, hobbyProjects, studentProjects }
  }
}
</script>

<style lang="scss">
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
}

.projectText {
  text-align: left;
  max-width: 530px;
  display: inline-block;
}
.tagContainer{
  margin: 0 auto;
  float: center;
  width: fit-content;
  height: 2rem;
}
.tag{
  width: fit-content;
  height: 1rem;
  padding: 5px;
  margin: 5px;
  float: left;
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
  margin: 0 auto;
  display: inline-block;
  max-width: 530px;
  text-align: left;
}
.contribution{
  text-align: left;
}
.link{
  font-size: xx-large;
  text-decoration: none;
}
.link:hover {
  text-decoration: underline;
  color: white !important;
}
.link:visited {
  color: inherit;
}
</style>
