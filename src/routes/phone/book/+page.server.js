// @ts-nocheck
import { readFileSync, writeFileSync } from 'node:fs';
import { error } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';

import {client} from '$lib/server/db.js';
import {makeWhere} from '$lib/dblib.js';


import Phone from './Phone';

import { disableScrollHandling } from '$app/navigation';

class RefreshError extends Error {
  constructor(message) {
    super(message);
    this.name = "RefreshError";
    this.Number = 400;
  }
}

let filters = new Phone();

// Параметры загрузки страницы
let param = {
  sortorder:'asc',
  sortby: 'id',
  showdeleted: "false"
}

let sql = ''

console.log('===>LoadScript');
// console.log('===>' + JSON.stringify(filters.values));
// console.log('===>' + Object.values(filters.values));

//
// Загрузка из DB
//
export async function load() {

  if (!sql) 
    make_sql();

  console.log('SQL='+sql);

  try {
    let x = await client.query(sql, []);
    //console.log('queryResult='+JSON.stringify(x,null,2));
    //console.log('values='+JSON.stringify(filters.values));
    return {data: x.rows, param, filters: filters.values};  // Возвращаю не только данные, но и параметры отображения таблицы
  } catch(err) {
    console.log('ОШИБКА === ' + err); // TypeError: failed to fetch
    throw error(400, {
      message: err.name + ': ' +err.message
    });
    
   // throw err;
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

//
//  Сформировать SQL-запрос
//
function make_sql() {
  sql = ''
  let where = 'WHERE ';
  let orderby = 'ORDER BY ';

  if (param.showdeleted == "true") {
    where += ' id < 0 ';
  } else {
    where += ' id > 0 ';
  }

  if (param.sortby == '') {param.sortby += 'id'; } 
  if (param.sortorder == '') {param.sortorder += 'asc'; } 
  orderby += param.sortby + ' ' + param.sortorder;
  
  // console.log('>' + JSON.stringify(filters.values));
  for (let fld in filters.values) {
    
    let f = filters.values[fld].trim();
    let t = filters.types[fld];

    let w= makeWhere(fld, f, t);

    if(w.length > 0) {
      //console.log(w.slice(0, 5));
      if(w.slice(0, 5) != 'ERROR') {
        where += w;
      } else {
        console.log("Неверный формат фильтра ("+f+") у колонки " + fld);
        filters.values[fld] = '';
             throw new RefreshError ("Неверный формат фильтра ("+f+") у колонки " + fld);
          //    throw error(400, {
          //     message: 'Неверный формат фильтра ('+f+') у колонки ' + fld
          // });
      }
    }
  }
  
  //if (refresh) throw new RefreshError("Ошибка обновления.");

  return sql = `SELECT id, sd, fio, tel FROM phones ${where} ${orderby}`;
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
        console.log('ERR: '+err.message);
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
      console.log('ERROR: ' + err.message);
      return fail(400, { id, fail2: true, err: err?.message });
    }

    return { success: true, msg: 'Строка удалена...'  };
  },

  //
  // Обновить страницу в соответствии с заданными парметрами
  //
  refresh: async ({ cookies, request }) => {

    const data = await request.formData();

    filters.values.id = data.get('fid');
    filters.values.sd = data.get('fsd');
    filters.values.fio = data.get('ffio');
    filters.values.tel = data.get('ftel');

    param.sortorder = data.get('sortorder');
    param.sortby = data.get('sortby');
    param.showdeleted = data.get('showdeleted');

    try {
       make_sql();
    } catch (err) {
      console.log('ERROR: ' + err.message);
      return fail(400, { fail3: true, err: err?.message, sortby: param.sortby, sortorder: param.sortorder, showdeleted: param.showdeleted, fid: filters.values.id, fsd:filters.values.sd, ffio: filters.values.fio, ftel: filters.values.tel});
    }

    // load(); // и так выполняется при открытии страницы
    
    // console.log(param.sortby, param.sortorder, param.showdeleted, 'Данные обновлены...', filters.values.id, filters.values.sd, filters.values.fio, filters.values.tel);

    return {success: true, msg: 'Данные обновлены...'};
    
    return {sortby: param.sortby, sortorder: param.sortorder, showdeleted: param.showdeleted, success: true, msg: 'Данные обновлены...', fid: filters.id, fsd:filters.sd, ffio: filters.fio, ftel: filters.tel};


    // if (Number(x) == 0) {
		// 	return fail(400, { msg: 'Ye t vft', missing: true });
		// } else if (Number(x) < 3) {
    //   return fail(400, { x, msg: 'Number(x) < 3', missing: true });
		// } else if (Number(x) == 5) {
    //   // if (url.searchParams.has('redirectTo')) {
    //   //   throw redirect(303, url.searchParams.get('redirectTo'));
    //   // }
    //   throw redirect(303, '/about');
    // } else {
    //   //fail(400, { msg: ' missing: false', missing: false });
    // }

    console.log(`Обновление...`);
    
    param.show_deleted = !param.show_deleted;
    //load();

    return {x, success: true, msg: 'Данные обновлены...'  };
  }
};