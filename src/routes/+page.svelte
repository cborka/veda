<script>
// @ts-nocheck


function test(z, ...args) {

  return [args];

}

// let a = Symbol('x');
// let b = Symbol('x');



let S = Symbol('x');
// console.log(S);

let obj = {
  a: 1114444,
  b: 2223456,

  [S]: function() {return Object.values(this)}
}

let obj2 = {
  a: 'qqqqq',
  b: 'dddddd',
  c: 'cccccc',

  [S]: function() {return Object.values(this)}
}

console.log(S === Symbol('x'));

let arr = [11,22,33,44,55];

console.log(obj[S]());

let ret = test(1, ...arr, 333, obj[S](), '<===>', obj2[S]());
//let ret = test(1, ...arr, 333, Object.values(obj));



let options = {
  title: "Menu",
  width: 100,
  height: 200
};
let title, height;
let { width} = options;

console.log(title);  // Menu
console.log(width);  // 100
console.log(height); // 200
console.log( new Date().getTimezoneOffset() );

</script>


<h1 class="title">Welcome to SvelteKit</h1>

<p>{ret}</p>

