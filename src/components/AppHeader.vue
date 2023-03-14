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
}

nav {
  display:inline-block;
  height: 50px;
  color: grey;
  position: top;

  ul{
    padding-inline-start: 0px;
  }
  ul a {
    font-size: xx-large;
    margin-left: 1rem;
    margin-right: 1rem;
    text-decoration: none;
    color:grey;
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
