<script>
  import { page } from '$app/stores';

  //import {client} from '../db';

	import Header from './Header.svelte';
	import Footer from './Footer.svelte';


</script>

<Header />

<hr color="red">
<slot />
<hr color="red">

<Footer />