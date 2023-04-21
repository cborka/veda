<script>
	//export let user_name = 'Bob';

  import Menu from './Menu.svelte'; 
</script>

<!-- <h1 class="title">Веда - свежие сведения обо всём!</h1> -->

<Menu></Menu>

<!-- <span class = "icon is-small has-text-info">
  <i class = "fas fa-user"></i>
</span> -->
<!-- <span class = "icon">
  <i class="fa-sharp fa-light fa-truck-fast"></i>
</span> -->

<ion-icon name="accessibility-outline"></ion-icon>
<ion-icon name="dice"></ion-icon>

<span class = "icon  is-large">
  <ion-icon name="accessibility-outline"></ion-icon>
  <ion-icon name="dice"></ion-icon>
</span>

<ion-icon src="/alarm.svg"></ion-icon>
<ion-icon src="/violin.svg" style="color: red"></ion-icon> 

<!-- <div class="mdi-set is-large">
  <span class="mdi-star"></span>
  <span class="mdi-star"></span>
  <span class="mdi-piano has-text-info"></span>
  <span class="mdi-star-outline is-small"></span>
  <span class="mdi-star-outline"></span>
</div> -->
<span class = "icon is-large">
  <img src="/alarm.svg" alt="zz" />
</span>
<span class = "icon" >
  <img src="/favicon.png" alt="zz" />
<span class="has-text-danger">&#9773;</span>
</span>
<nav>
	<a href="/">Home</a>
	<a href="/about">About</a>
	<a href="/users/login">Login</a>
	<a href="/bu.html">Login</a>
	<!-- <a href="/user">Users</a>
  <a href="/user/Piter">Piter</a>
  <a href="/user/Ann">Ann</a> -->
</nav>

<!-- <hr /> -->

<style>
	/* h1 {
    color: green;
    font-weight: bold;
  } */
  ion-icon {
    /* color: red; */
  }
</style>
