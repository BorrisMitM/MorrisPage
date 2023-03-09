<template>
  <div class="wrapper">
    <div v-for="project in projects" :key="project.abbreviation" class="project">
      <p>{{ project.name }}</p>
      <img :alt="project.name + ' logo'" :src="require('../assets/' + project.image)" height="600">
      <div class="tagContainer">
        <div v-for="tag in project.tags"  v-bind:key="tag" v-bind:class="'tag tag' + tag">
          {{ tag }}
        </div>
      </div>
      <p><br>{{ project.summary }}</p>
      <p>My takeaways from this project were:</p>
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
  border: 3px solid;
  border-radius: .5rem;
  padding: 1rem;
  margin-top: 2rem;
  img {
    float: center;
  }
}
.project p:first-child {
  font-weight: bold;
  font-size: 2.5rem;
  margin: 1rem 0;
}
.project p:last-child {
  font-weight:normal;
  font-size: 1rem;
}

.project:nth-child(odd) {
  align-self: flex-start;
  width: 60%;
  min-width: 700px;
}
.project:nth-child(even) {
  align-self: flex-end;
  width: 60%;
  min-width: 700px;
}
@media (max-width: 760px) {
  .project.project:nth-child(even) {
    align-self: stretch;
    min-width: auto;
    width: auto;
  }
  .project.project:nth-child(odd) {
    align-self: stretch;
    min-width: auto;
    width: auto;
  }
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
  border-radius: 10px;
  color:  rgb(255, 255, 255);
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
.contributionContainer{
  margin: 0 auto;
  width: 400px;
}
.contribution{
  text-align: left;
}
</style>
