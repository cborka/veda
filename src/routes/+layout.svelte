<script>
  import { page } from '$app/stores';

  //import {client} from '../db';

  import Menu from './Menu.svelte'; 
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';


</script>


<Menu></Menu>

<Header />

<main class="container layout-container" >
<!-- <hr color="red"> -->
❄
<slot />
<!-- <hr color="red"> -->
❄
</main>

<Footer />

<style>

.layout-container {
  /* height: 100%; */
  min-height: 66vh;
}


</style>
