<script>
  import { page } from '$app/stores';

  import Menu from './Menu.svelte'; 
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';

</script>


<Menu></Menu>
<!-- <Header /> -->

<main class="container block" >
<!-- ❄ -->  
<slot />
<!-- ❄ -->
</main>

<Footer />

<style>

main {
  /* height: 100%; */
  min-height: 75vh;
}


</style>
