<template>
  <header>
    <!-- <img alt="Morris logo" src="@/assets/MorrisStylized.png"> -->
    <nav>
      <div>
        <a href="#">Home</a>
        <div></div>
        <a href="#projectTBS">Projects</a>
        <div></div>
        <a href="#footer">Contact</a>
      </div>
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

  padding: .5rem 0rem;
  //background-color: rgba(128,128,128,0.7);
  background-image: url("@/assets/Header2.png");
  background-size: contain;
}

nav {
  div{
    height: 50px;
    color: grey;
    display:flex;
    justify-content: center;
  }
  div div{
    width: 3rem;
    flex-shrink: 30;
  }

  div a {
    padding-top: 10px;
    font-size:xx-large;
    text-decoration: none;
    color:grey;
    flex-shrink: 30;
    min-width: 0px;
    overflow-wrap: break-word;
  }
  div:hover a:hover {
    text-decoration: underline;
    color: white;
  }
  div a:visited {
    color: inherit;
  }
}
</style>
