import { readFileSync, writeFileSync } from 'node:fs';
import { error } from '@sveltejs/kit';

// @ts-ignore
import {client} from '$lib/server/db.js';

// Загрузка из DB
export async function load() {
  try {
    let x = await client.query('SELECT id, sd, fio, tel FROM phones WHERE id >= $1 ORDER BY id', [1]);

    // console.log('PROMISE CLIENT = ' + JSON.stringify( x.rows[0].sd) + '!!!');
    return {data: x.rows};
    // return 'SUCCESS...';
  } catch(err) {
    console.log('ОШИБКА === ' + err); // TypeError: failed to fetch
    // return 'FAIL...';
  }

}

// load().then(console.log); // Вывод данных в консоль

// Загрузка из файла
 function xload() {

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
  return { data };
}


// export const actions = {
//   default: async ({ cookies, request }) => {
//     console.log('cookies = ' + JSON.stringify(cookies));
//     console.log('request = ' + JSON.stringify(request));
    
//     const data = await request.formData();
//     console.log('data = ' + JSON.stringify(data));

//     let text = data.get('text');
//     console.log(text);
//     //let password = data.get('password');

//       return { success: true };
//   }
// };
export const actions = {
  save: async ({ cookies, request }) => {

      const data = await request.formData();

      let id = data.get('id');
      let sd = data.get('sd');
      let fio = data.get('fio');
      let tel = data.get('tel');
      //console.log(`${id}-${sd}-${fio}-${tel}-`);

      let text = '';
      let values = [];
      if(Number(id) > 0) {
        text = 'UPDATE public.phones SET sd=$1, fio=$2, tel=$3 WHERE id=$4 RETURNING *';
        values = [sd, fio, tel, id];
      } else {
        text = 'INSERT INTO public.phones (sd, fio, tel) VALUES ($1, $2, $3) RETURNING *';
        values = [sd, fio, tel];
      }
      
      // async/await
      try {
        const res = await client.query(text, values)
        console.log(res.rows[0])
        // { id: 2, sd: 'Бухгалтерия', fio: 'Сидорова А.Н.', tel: '11-77-11' }
      } catch (err) {
        // @ts-ignore
        console.log(err.message);
        // console.log(err.stack);
        // @ts-ignore
        return { success: false, err: err?.message  };
      }

    //   const user = await db.getUser(email);
    //   cookies.set('sessionid', await db.createSession(user));
    //throw error(1);

      return { success: true };
  }
};