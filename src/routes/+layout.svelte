<script>
  import { page } from '$app/stores';

  //import {client} from '../db';

  import Menu from './Menu.svelte'; 
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';


</script>

<Menu></Menu>
<Header />
<div class="container">

<!-- <hr color="red"> -->
❄
<slot />
<!-- <hr color="red"> -->
❄

</div>

<Footer />