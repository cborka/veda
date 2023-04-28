import { readFileSync, writeFileSync } from 'node:fs';

// @ts-ignore
import {db, client} from '$lib/server/db.js';
//import {client} from '$lib/server/db.js';


console.log(db);

// function get_name() {
//   client
//   .query('SELECT name3 FROM test WHERE id = $1', [2])
//   .then((result) => console.log(result.rows[0].name))
//   //.then((result) => console.log(result.rows[0].name))
//   //.catch((e) => console.error(e.stack))
//   .catch((e) => console.error('ОШИБКА === ' ))
// }
// get_name();


async function lo() {

  // let response = await fetch('/article/promise-chaining/user.json');
  // let user = await response.json( );
  try {
    let x = await client.query('SELECT name FROM test WHERE id = $1', [2]);

    console.log('PROMISE CLIENT = ' + JSON.stringify(x.rows[0].name) + '!!!');
    return 'SUCCESS...';
  } catch(err) {
    console.log('ОШИБКА === ' + err); // TypeError: failed to fetch
    return 'FAIL...';
  }


  // console.log('PROMISE CLIENT = ' +
  //   JSON.stringify(x.rows[0].name) + '!!!'
  // );
  // .then((result) => console.log(result.rows[0].name))
  // .catch((e) => console.error(e.stack));

  // return {
  //     posts: await db.getPostSummaries()
  // };

}


// macOS, Linux, and Windows
//let data = readFileSync('c:/cborka/2.txt');
//console.log(data);

export function load() {
   
  lo().then(console.log);

  let lines = readFileSync('./spr.txt', 'utf-8').split(/\r?\n/);
  let data = [];
  for(let i=0; i<lines.length; i++) {
    let tel = lines[i].split('|');
    if(tel.length >= 4)
    data.push({
      idx: i,
      id: tel[0],
      sd: tel[1],
      fio: tel[2],
      tel: tel[3],
    }); 
  }


  // console.log(dt);
  return {
    data
//      dt: readFileSync('c:/cborka/2.txt', 'utf-8')
//      tels: readFileSync('./spr.txt', 'utf-8').split(/\r?\n/)
  };
}