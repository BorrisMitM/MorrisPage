<template>
    <footer id="footer">
      <h1>Contact me!</h1>
      <a class="socialLink" href="mailto:morrismakesgames@gmail.com">
        <img alt="Mail Logo" src="@/assets/MorrisStylized.png">
      </a>
      <a class="socialLink" href="https://twitter.com/BorrisMitM" target="_blank">
        <img alt="Mail Logo" src="@/assets/MorrisStylized.png">
      </a>

      <p>Copyright &copy; {{ year }} by Maurice Andreas.</p>
    </footer>
  </template>

<script>
import { computed } from 'vue'

export default {
  setup () {
    const year = computed(() => new Date().getFullYear())
    return { year }
  }
}
</script>

<style  lang="scss">
footer{
  margin-top: 50px;
  padding-top: 30px;
  padding-bottom: 5px;
  background-color: rgba(128,128,128,0.8);
}
.socialLink{
  height: 70px;
  padding-left: 20px;
  padding-right: 20px;
  h1 {
    margin: 50px;
  }
  img {
    height: 70px;
  }
}
</style>
