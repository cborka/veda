<script>
// @ts-nocheck


function test(z, ...args) {
  //console.log(arguments);
  return [args];

}

// let a = Symbol('x');
// let b = Symbol('x');



let S = Symbol('x');
 console.log(S);

let obj = {
  a: 1114444,
  b: 2223456,

  [S]: function() {return Object.values(this)}
}

let obj2 = {
  a: 'qqqqq',
  b: 'dddddd',
  c: 'cccccc',

  //[S]: function() {return Object.values(this)}
  // При преобразовании в массив нужен строгий порядоко следования полей, а Object.values это не гарантирует
  [S]: function() {
    return [
      this.a,
      this.b,
      this.c,
      'zzz'
    ]
  }
}

// console.log(S === Symbol('x'));
// console.log(JSON.stringify(obj2));

let arr = [11,22,33,44,55];

// console.log(obj[S]());

let ret = test(1, ...arr, 333, ...obj[S](), '<===>', obj2[S]());
//let ret = test(1, ...arr, 333, Object.values(obj));

function s(n) {
  return function(m) {return n+m}
}
//console.log(s(333)(1000));

let ar = [1, 2, 3, 4, 5, 6, 7];
function inB(a, b) {
  return function f(n, m) {
    //console.log(n+'-'+m);
    return (n>=a && n<=b);
  }
}

// console.log(ar.filter(inB(2, 5)));


// function test2(args) {
//   return args;
// }

// let wrapper = function(func, arg) {
//   return func.apply(this, arguments);
// };

// console.log('t = ' + test2(arr));
// console.log('a = ' + test2.apply(null, [arr]));
// console.log('a = ' + test2.call(null, arr));

// function hash() {
//   console.log(arguments); // 1,2
//   console.log( [].join.call(arguments) ); // 1,2
// }
// hash(1, 2);

// Promises

let msg = '!<br>';
function say(m) {
  msg += m + '<br>';
  return m;
}

let promise = new Promise(function(resolve, reject) {
      //throw new Error("Whoops!");
      
      setTimeout(() =>resolve("done"),1000);
      setTimeout(() =>reject(new Error("Whoops!")), 300);
    });

async function fun() {
    let x = await promise;
    say('await '+ x);
}    

//fun();
fun()
  .catch(say);

function prom() {

    promise
    .then((res) => say(res+'!!!') )  
    .then((res) => 'new')  
    .then((res) => {throw new Error(res+"Whoops!!!")})  
    .catch(say)
    // .catch((res) => {say(res+' error'); throw new Error(res+"Whoops!!!")})  
    .then(() => xxyx())
    .catch(say)
    .finally ( () => say('finally2') )
  }

  console.log('console.log');
</script>


<h1 class="title">Welcome to SvelteKit</h1>

<button on:click={prom}>Promise</button>

<p>{@html msg}</p>

<!-- <p>{@html ret}</p> -->

