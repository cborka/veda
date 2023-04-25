<script>
  export let data;
  
  import { enhance } from '$app/forms';

  $: id = data?.params?.id;

</script>

{id}
<p>{JSON.stringify(data)}</p>

<!-- <form method="POST">
  <label>
    Логин
    <input name="login" />
  </label>  
  <label>
    Пароль
    <input name="password" />
  </label>  
  <button>Send</button> 

</form> -->