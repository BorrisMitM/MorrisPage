<template>
  <header>
    <!-- <img alt="Morris logo" src="@/assets/MorrisStylized.png"> -->
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
  //background-color: rgba(128,128,128,0.7);
  background-image: url("@/assets/Header2.png");
  background-size: contain;
  p {
    margin-left: 1rem;
  }
  img {
    float: left;
    height: 50px;
    opacity: 100%;
    border: 2px solid white;
    border-radius: 3px;
  }
}

nav {
  margin-left: auto;
  float: center;
  height: 30px;
  color: grey;
  position: top;

  ul a {
    font-size: xx-large;
    margin-left: 3rem;
    text-decoration: none;
  }
  ul:hover a:hover {
    text-decoration: underline;
    color: white;
  }
  ul a:visited {
    color: inherit;
  }
}
</style>
