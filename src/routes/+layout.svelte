<script>
  import { page } from '$app/stores';

  import Menu from './Menu.svelte'; 
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	
  //export let data;

</script>


<Menu></Menu>
<Header />

<!-- <p>{JSON.stringify(data, undefined, 2)}</p> -->

<!-- <p>{JSON.stringify(page, undefined, 2)}</p> -->

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
