import { readFileSync, writeFileSync } from 'node:fs';
import { error } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';

let show_deleted = false;

// @ts-ignore
import {client} from '$lib/server/db.js';

// Загрузка из DB
export async function load() {

  let sql = ''

  if (show_deleted) {
    sql = 'SELECT id, sd, fio, tel FROM phones WHERE id < $1 ORDER BY id'
  } else {
    sql = 'SELECT id, sd, fio, tel FROM phones WHERE id > $1 ORDER BY id'
  }


  try {
    let x = await client.query(sql, [0]);

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
      // console.log(`${id}-${sd}-${fio}-${tel}-`);

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
        console.log(res.rows[0]);
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

      return { success: true, msg: 'Данные обновлены...' };
  },
  // Мягкое удаление строки, меняю знак id на отрицательный
  delete: async ({ cookies, request }) => {

    const data = await request.formData();
    let id = data.get('id');
    
    console.log(`Удаление ${id}...`);

    let text = 'UPDATE public.phones SET id = -id WHERE id=$1 RETURNING *';
    let values = [id];

    try {
      const res = await client.query(text, values)
      //console.log(res.rows[0]);   
    } catch (err) {
      // @ts-ignore
      console.log(err.message);
      // @ts-ignore
      return { success: false, err: err?.message  };
    }

    return { success: true, msg: 'Строка удлена...'  };
  },
  refresh: async ({ cookies, request }) => {

    const data = await request.formData();
    let x = data.get('x');
    
    if (Number(x) == 0) {
			return fail(400, { msg: 'Ye t vft', missing: true });
		} else if (Number(x) < 3) {
      return fail(400, { x, msg: 'Number(x) < 3', missing: true });
		} else if (Number(x) == 5) {
      // if (url.searchParams.has('redirectTo')) {
      //   throw redirect(303, url.searchParams.get('redirectTo'));
      // }
      throw redirect(303, '/about');
    } else {
      //fail(400, { msg: ' missing: false', missing: false });
    }

    console.log(`Обновление...`);
    
    show_deleted = !show_deleted;
    //load();

    return {x, success: true, msg: 'Данные обновлены...'  };
  }
};