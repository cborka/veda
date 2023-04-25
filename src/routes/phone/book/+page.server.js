import { readFileSync, writeFileSync } from 'node:fs';

// macOS, Linux, and Windows
//let data = readFileSync('c:/cborka/2.txt');
//console.log(data);

export function load() {
   
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