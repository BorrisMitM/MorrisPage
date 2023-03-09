<template>
  <div>
    <p>{{ airport.name }} ({{ airport.abbreviation }})</p>
    <p>Located in {{ airport.city }}, {{ airport.state }}</p>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import projects from '@/data/projects.js'
export default {
  setup () {
    const route = useRoute()
    const airport = computed(() => {
      return projects.filter(a => a.abbreviation === route.params.projectName.toUpperCase())[0]
    })
    return { airport }
  }
}
</script>
