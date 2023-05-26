<script>
// @ts-nocheck

//import jwt from  'jsonwebtoken';

   export let data;
   export let form;


  let user = {
    login: 'bor',
    password: '123'
  }

  let token = '';

function send_token() {
  token = jwt.sign(
        { 
          login: login, 
          nbf: 1685096470, 
//          nbf: Math.floor(Date.now() / 1000) - 5 
        }, 'cbwbor');

     //   loginToken.submit;
}


  import { enhance } from '$app/forms';
</script>

<p>{data.token}</p>
<p>{Math.floor(Date.now() / 1000)}</p>

<p class="title is-5">Вход</p>

<div id="login-box" class="box block modal-content modal-position">

  <form name="loginForm" class="" method="POST" action="?/login">
      <div class="field">
        <div class="control">
          <label class="label">Login
            <input name="login" class="input is-success" type="text" placeholder="Ник" value="{form?.login ?? user.login}">
          </label>
        </div>
      </div>
      
      <div class="field">
        <div class="control">
          <label class="label">Password
            <input name="password" class="input is-success" type="password" placeholder="Пароль" value="{form?.password ?? user.password}">
          </label>
        </div>
      </div>

      <div class="field is-grouped is-grouped-centered">
        <p class="control">
          <button type="submit" class="button is-success is-light">Сохранить</button>
        </p>
        <p class="control">
          <button type="button" class="button is-danger is-light" >Отменить</button>
        </p>
      </div>

    </form>
</div>    
    {#if (form?.success)}
        <p class="darkgreen">{form?.message}</p>
        <p class="">token: {form?.token}</p>
    {/if}

    {#if (form?.fail) && (form?.error)}
        <p class="error">Ошибка: {form?.error}</p>
    {/if}
  

    <form name="loginToken" class="" method="POST" action="?/token">
      <input name="token" type="text"  bind:value="{token}">
      <button type="submit">Войти по токену</button>
      <button on:click={send_token}>Сделать токен</button>
    </form>