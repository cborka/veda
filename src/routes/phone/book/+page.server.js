// @ts-nocheck
import { readFileSync, writeFileSync } from 'node:fs';
import { error } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';

import {client} from '$lib/server/db.js';


import Phone from './Phone';

import { disableScrollHandling } from '$app/navigation';

class RefreshError extends Error {
  constructor(message) {
    super(message);
    this.name = "RefreshError";
  }
}

let phone_filter = new Phone();

// Параметры загрузки страницы
let param = {
  sortorder:'asc',
  sortby: 'id',
  showdeleted: "false"
}

let sql = ''

let k = Object.keys(phone_filter.vals);

console.log('===>LoadScript');
// console.log('===>' + JSON.stringify(phone_filter.vals));
// console.log('===>' + Object.values(phone_filter.vals));
// console.log('===>' + typeof k + JSON.stringify(k));
//console.log('===>' + JSON.stringify(Field('1', 'qqq')));

//
// Загрузка из DB
//
export async function load() {

  if (!sql) make_sql();

  console.log('SQL='+sql);

  try {
    let x = await client.query(sql, []);
    //console.log('queryResult='+JSON.stringify(x,null,2));
    return {data: x.rows, param, phone_filter: phone_filter.vals};  // Возвращаю не только данные, но и параметры отображения таблицы
//    return {data: x.rows, param, phone_filter: phone_filter.toJSON()};  // Возвращаю не только данные, но и параметры отображения таблицы
  } catch(err) {
    console.log('ОШИБКА === ' + err); // TypeError: failed to fetch
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
  
  console.log('>' + JSON.stringify(phone_filter.vals));
  for (let fld in phone_filter.vals) {
    
    console.log('fld='+JSON.stringify(fld));
    
    let f = phone_filter.vals[fld].trim();
    let t = phone_filter.types[fld];
    console.log('f='+JSON.stringify(f) + t);
    if (f != "" ) {
      if (t == 's') {
        // console.log('val='+phone_filter[fld]);
        // console.log(` AND ${fld} LIKE '%${f}%' `);
        where += ` AND ${fld} LIKE '%${f}%' `;
      } else if (t == 'i') {  
        // if (f[0] != '<' && f[0] != '>' && f[0] != '=') {f = '= ' + f;}
        // console.log(` AND ${fld} ${f} `);
        // where += ` AND ${fld} ${f} `;
        let beg = 0;
        let op = '=';
        let num = 0;
        if (f[0] == '<' || f[0] == '>' || f[0] == '=') {
          beg++; 
          op = f[0];
          if (f[1] == '=') {
            beg++; 
            op += f[1];
          }
        } else {
          if (f[0] == '=') beg++;
        }
        num = parseFloat(f.slice(beg));

        if (isNaN(num)) {
          console.log("Неверный формат фильтра у колонки " + fld);
          phone_filter.vals[fld] = 'ОШИБКА';
//          throw new Error ("Неверный формат фильтра у колонки " + fld);
        } else {
          if (op == '==') {
            op = '=';
          }
          console.log(` AND ${fld} ${op} ${num} `);
          where += ` AND ${fld} ${op} ${num} `;
        }

        // if (f[0] != '<' && f[0] != '>' && f[0] != '=') {f = '= ' + f;}
        // console.log(` AND ${fld} ${f} `);
        // where += ` AND ${fld} ${f} `;
      }
    }
  }
  // let f = '';
  // //console.log('phone_filter.sd='+phone_filter.sd);
  // if ((f = phone_filter.sd.trim()) != '') {
  //   console.log('f='+f);
  //   where += ' AND sd LIKE \'%'+f+ '%\' ';
  //   //throw new Error("ERRRRORRR");
  //   //return fail(400, { msg: ' missing: false', missing: false });
  // }

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

    phone_filter.vals.id = data.get('fid');
    phone_filter.vals.sd = data.get('fsd');
    phone_filter.vals.fio = data.get('ffio');
    phone_filter.vals.tel = data.get('ftel');

    param.sortorder = data.get('sortorder');
    param.sortby = data.get('sortby');
    param.showdeleted = data.get('showdeleted');

    try {
       make_sql();
    } catch (err) {
      return fail(400, { fail3: true, err: err?.message, sortby: param.sortby, sortorder: param.sortorder, showdeleted: param.showdeleted, fid: phone_filter.id, fsd:phone_filter.sd, ffio: phone_filter.fio, ftel: phone_filter.tel});
    }

    // load(); // и так выполняется при открытии страницы
    
    console.log(param.sortby, param.sortorder, param.showdeleted, 'Данные обновлены...', phone_filter.id, phone_filter.sd, phone_filter.fio, phone_filter.tel);

    return {success: true, msg: 'Данные обновлены...'};
    
    return {sortby: param.sortby, sortorder: param.sortorder, showdeleted: param.showdeleted, success: true, msg: 'Данные обновлены...', fid: phone_filter.id, fsd:phone_filter.sd, ffio: phone_filter.fio, ftel: phone_filter.tel};


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