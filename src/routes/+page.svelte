<script>
// @ts-nocheck


function test(z, ...args) {

  return [args];

}

let obj = {
  a: 111,
  b: 222
}

let arr = [11,22,33,44,55];

let ret = test(1, ...arr, 333);

</script>


<h1 class="title">Welcome to SvelteKit</h1>

<p>{ret}</p>

