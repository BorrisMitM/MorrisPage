<template>
    <footer id="footer">
      <h1>Contact me!</h1>
      <a class="socialLink" href="mailto:morrismakesgames@gmail.com">
        <img alt="Mail Logo" src="@/assets/MailLogo.png">
      </a>
      <a class="socialLink" href="https://twitter.com/BorrisMitM" target="_blank">
        <img alt="Mail Logo" src="@/assets/TwitterLogo.png">
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
  background-image: url("@/assets/Panel.png");
  background-size: contain;
  border: 1px solid black;
}
.socialLink{
  height: 70px;
  padding-left: 20px;
  padding-right: 20px;
  text-align:center;
  h1 {
    margin: 50px;
  }
  img {
    height: 70px;
  }
}
</style>
