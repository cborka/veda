<script>

function toggleMenu() {
  const navbarMenu = document.getElementById('navbarMenu');

  navbarMenu?.classList.toggle('is-active');
}

</script>


<nav class="navbar is-transparent">
  <div class="navbar-brand">
    <a class="navbar-item" href="/">
      <img src="/favicon.png" alt="Веда" width="28" height="28">
    </a>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="navbar-burger" data-target="navbarMenu" on:click={toggleMenu}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>

  <div id="navbarMenu" class="navbar-menu">

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="navbar-start" on:click={toggleMenu}>
      <a class="navbar-item" href="/">Home</a>
      <a class="navbar-item" href="/about">О программе</a>
      <a class="navbar-item" href="/users/login">Вход</a>
      <a class="navbar-item" href="/bu.html">bu.html</a>
      <a class="navbar-item" href="/phone/book">Телефоны</a>
      
      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link" href="/">SVG</a>
        <div class="navbar-dropdown is-boxed">
          <a class="navbar-item" href="/violin.svg">
            Violin
          </a>
          <!-- <hr class="navbar-divider"> -->
          <a class="navbar-item" href="/alarm.svg">
            Alarm
          </a>
        </div>
      </div>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="field is-grouped">
          <p class="control">
            <a class="button is-primary" href="https://github.com/jgthms/bulma/releases/download/0.9.4/bulma-0.9.4.zip">
              <span class="icon">
                <i class="fas fa-download"></i>
              </span>
              <span>Download</span>
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</nav>
