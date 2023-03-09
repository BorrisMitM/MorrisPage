<template>
  <header>
    <img alt="Vue logo" src="@/assets/MorrisStylized.png" height="50">
    <p>Morris</p>
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/about">About</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss">
header {
  display: flex;
  border-bottom: 1px solid #ccc;
  background-image: url("../assets/websitebackground.png");
  background-size: cover;

  padding: .5rem 1rem;
  p {
    margin-left: 1rem;
  }
}

nav {
  margin-left: auto;
  ul {
    list-style: none;
  }

  ul li {
    display: inline-flex;
    margin-left: 1rem;
  }
}
</style>
