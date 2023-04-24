import { readFileSync, writeFileSync } from 'node:fs';

// macOS, Linux, and Windows
//let data = readFileSync('c:/cborka/2.txt');
//console.log(data);

export function load() {
   
  //let dt = readFileSync('./spr.txt', 'utf-8').split(/\r?\n/);
  // console.log(dt);
  return {
//      dt: readFileSync('c:/cborka/2.txt', 'utf-8')
      tels: readFileSync('./spr.txt', 'utf-8').split(/\r?\n/)
  };
}