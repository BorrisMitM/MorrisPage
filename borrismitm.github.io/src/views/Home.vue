<template>
  <div class="wrapper">
    <router-link :to="{ name: 'Project', params: { projectName: airport.abbreviation } }" v-for="airport in airports" :key="airport.abbreviation" class="airport">
      <p>{{ airport.abbreviation }}</p>
      <p>{{ airport.name }}</p>
      <p>{{ airport.city }}, {{ airport.state }}</p>
    </router-link>
  </div>
</template>

<script>
import { ref } from 'vue'
import allAirports from '@/data/airports.js'

export default {
  setup () {
    const airports = ref(allAirports)
    return { airports }
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

.airport {
  border: 3px solid;
  border-radius: .5rem;
  padding: 1rem;
  margin-top: 2rem;
}
.airport p:first-child {
  font-weight: bold;
  font-size: 2.5rem;
  margin: 1rem 0;
}
.airport p:last-child {
  font-style: italic;
  font-size: .8rem;
}

.airport:nth-child(odd) {
  align-self: flex-start;
  width: 60%;
  min-width: 700px;
}
.airport:nth-child(even) {
  align-self: flex-end;
  width: 60%;
  min-width: 700px;
}
@media (max-width: 760px) {
  .airport.airport:nth-child(even) {
    align-self: stretch;
    min-width: auto;
    width: auto;
  }
  .airport.airport:nth-child(odd) {
    align-self: stretch;
    min-width: auto;
    width: auto;
  }
}
</style>
