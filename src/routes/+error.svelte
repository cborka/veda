<script>
  import { page } from '$app/stores';
</script>

<h1>{$page.status}: {$page?.error?.message}</h1>

<!-- <p>{JSON.stringify($page)}</p> -->

<style>
  h1 {
      font-weight: bold;
      color: red;
      background-color: black;
  }
</style>