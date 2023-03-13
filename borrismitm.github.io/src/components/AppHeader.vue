<template>
  <header>
    <div></div>
    <img alt="Morris logo" src="@/assets/MorrisStylized.png">
    <nav>
      <ul>
        <a href="#">Home</a>
        <a href="#projectOMW">Projects</a>
        <a href="#footer">Contact</a>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss">
header {
  //display: flex;
  border-bottom: 3px solid #000000;
  height: 50px;
  z-index: 100;
  position:sticky;
  top: 0;

  padding: .5rem 1rem;
  background-color: rgba(128,128,128,0.7);
  p {
    margin-left: 1rem;
  }
  img {
    float: left;
    height: 50px;
    opacity: 100%;
  }
}

nav {
  margin-left: auto;
  float: center;
  ul {
    list-style: none;
  }

  ul a {
    font-size: x-large;
    margin-left: 1rem;
  }
}
</style>
