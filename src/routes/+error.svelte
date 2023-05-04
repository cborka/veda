<script>
  import { page } from '$app/stores';
</script>

<h1>{$page.status}: {$page?.error?.message}</h1>

<!-- <p>{JSON.stringify($page)}</p> -->

<style>
  h1 {
      color: rgb(255, 238, 0);
      background-color: blue;
  }
</style>