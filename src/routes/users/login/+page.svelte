<script>
  //export let data;
  export let form;

  import { enhance } from '$app/forms';
</script>

<!-- <form method="POST" action="?/" use:enhance> -->
<form method="POST">
  <label>
    Логин
    <input name="login" />
  </label>  
  <label>
    Пароль
    <input name="password" />
  </label>  
  <button>Send</button> 

</form>


{#if form?.error}
<p class="error">{form.error}</p>
{/if}