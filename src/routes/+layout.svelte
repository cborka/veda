<script>
  // Подключаем переменные из .env
  import * as dotenv from 'dotenv';  
  dotenv.config();

  import { page } from '$app/stores';

  import Menu from './Menu.svelte'; 
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';

  // console.log('VITE_HELLO =' + process.env.VITE_HELLO);
  // console.log(import.meta.env);
</script>


<Menu></Menu>
<!-- <Header /> -->

<main class="container block" >

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
