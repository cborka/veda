// @ts-nocheck
import { readFileSync, writeFileSync } from 'node:fs';
import { error } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';

import {client} from '$lib/server/db.js';

// Параметры загрузки страницы
let sortorder = 'asc';
let sortby = 'id';
let showdeleted = "false";

//
// Загрузка из DB
//
export async function load() {

  let sql = ''
  let where = 'WHERE ';
  let orderby = 'ORDER BY ';

  if (showdeleted == "true") {
    where += ' id < 0 ';
  } else {
    where += ' id > 0 ';
  }

  if (sortby == '') {sortby += 'id'; } 
  if (sortorder == '') {sortorder += 'asc'; } 
  orderby += sortby + ' ' + sortorder;
  
  sql = `SELECT id, sd, fio, tel FROM phones ${where} ${orderby}`;
  
  console.log('sql = ' + sql);

  try {
    let x = await client.query(sql, []);

    // console.log('PROMISE CLIENT = ' + JSON.stringify( x.rows[0].sd) + '!!!');
    return {data: x.rows};
    // return 'SUCCESS...';
  } catch(err) {
    console.log('ОШИБКА === ' + err); // TypeError: failed to fetch
    // return 'FAIL...';
  }

}

// load().then(console.log); // Вывод данных в консоль

//
// Загрузка из файла
//
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



export const actions = {
  //
  // Обновить / вставить запись
  //
  save: async ({ cookies, request }) => {

      const data = await request.formData();

      let id = data.get('id');
      let sd = data.get('sd');
      let fio = data.get('fio');
      let tel = data.get('tel');
      // console.log(`${id}-${sd}-${fio}-${tel}-`);

      let text = '';
      let values = [];
      if(Number(id) != 0) {
        text = 'UPDATE public.phones SET sd=$1, fio=$2, tel=$3 WHERE id=$4 RETURNING *';
        values = [sd, fio, tel, id];
      } else {
        text = 'INSERT INTO public.phones (sd, fio, tel) VALUES ($1, $2, $3) RETURNING *';
        values = [sd, fio, tel];
      }
      
      try {
        const res = await client.query(text, values)
        console.log(res.rows[0]);
        // { id: 2, sd: 'Бухгалтерия', fio: 'Сидорова А.Н.', tel: '11-77-11' }
      } catch (err) {
        console.log(err.message);
        // console.log(err.stack);
        return fail(400, { id, sd, fio, tel, fail1: true, err: err?.message });
      }

    //   const user = await db.getUser(email);
    //   cookies.set('sessionid', await db.createSession(user));
    //throw error(1);

      return { success: true, msg: 'Данные обновлены...' };
  },

  //
  // Мягкое удаление строки, меняю знак id на отрицательный
  //
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
      console.log(err.message);
      return fail(400, { id, fail2: true, err: err?.message });
    }

    return { success: true, msg: 'Строка удалена...'  };
  },

  //
  // Обновить страницу в соответствии с заданными парметрами
  //
  refresh: async ({ cookies, request }) => {

    const data = await request.formData();
    let x = data.get('x');

    sortorder = data.get('sortorder');
    sortby = data.get('sortby');
    showdeleted = data.get('showdeleted');
    //load(); // и так выполняется при открытии страницы
    return {x, sortby, sortorder, showdeleted, success: true, msg: 'Данные обновлены...'  };

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