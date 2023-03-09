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

export default {
  setup () {
    const projects = ref(allProjects)
    return { projects }
  }
}
</script>

<style>
.wrapper {
  display:flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
  border: 3px solid;
  border-radius: .5rem;
}

.project {
  border: 3px solid;
  border-radius: .5rem;
  padding: 1rem;
  margin-top: 2rem;
}
.project p:first-child {
  font-weight: bold;
  font-size: 2.5rem;
  margin: 1rem 0;
}
.project p:last-child {
  font-style: italic;
  font-size: .8rem;
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
  float: left;
}
.tagUnity{
  background-color: blue;
}
.tagUniversity{
  background-color: red;
}
.tagC\#{
  background-color: rgb(43, 255, 0);
}
.contributionContainer{
  margin: 0 auto;
  width: 400px;
}
.contribution{
  text-align: left;
}
</style>
