// @ts-nocheck

import { fail } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { randomUUID } from 'crypto';
import jwt from  'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

let token = '';
let refreshToken = '';

//let token = jwt.sign({ foo: 'bar' }, 'shhhhh');
//console.log('token = ' + token);
//console.log('token = ' + JSON.stringify(token));

//let older_token = jwt.sign({ foo: 'bar', nbf: Math.floor(Date.now() / 1000) + 10 }, 'shhhhh');
//console.log('older = ' + older_token);

//let decoded = jwt.verify(token, 'shhhhh');
//console.log(JSON.stringify(decoded)); 
// try {
//   decoded = jwt.verify(older_token, 'shhhhh');
// } catch(err) {
//   // @ts-ignore
//   console.log(err?.name+': '+err?.message+': '+err?.date);
// }

let secret = getSecret();


//console.log( 'document.cookie='+page.cookies);
console.log('uuidv4()='+uuidv4());

export async function load({cookies}) {

  //const unsec =cookies.get('unsec');
  //const digits =cookies.get('digits');
  //console.log('digits=' + digits);
  //console.log('unsec=' + unsec);
//cookies.set('visited', 'true', { path: '/' });
// let date = new Date(Date.now() - 10000000);
// date = date.toUTCString();
  //cookies.set('unsec', 'noSecret23', { path: '/', secure: false, maxAge: 11 });
  //cookies.set('digits', 'x', { path: '/', maxAge: 11 });
  //cookies.set('digits', digits, { Expires: date });

  return {token,  refreshToken}
}


function getSecret(userId = 1) {
  return 'SECRET_KEY';
}

function getToken(login = 'user') {

  return jwt.sign(
    { 
      login: login, 
      exp: Math.floor(Date.now() / 1000) + (15),
    }, secret);
}

function getRefreshToken(login = 'user') {

    let refreshToken = uuidv4();

    return refreshToken;
}

function getTokens(login = 'user') {
    return [getToken(login), getRefreshToken(login)]
}
//import {client} from '../../../db';

// export function load() {
// 	throw error(420, 'Enhance your calm');
// }

export const actions = {
  login: async ({ cookies, request }) => {

		const data = await request.formData();

    let login = data.get('login');
    let password = data.get('password');
    
    console.log('cookies='+JSON.stringify(cookies.get('digits')));
		try {

      [token, refreshToken] = getTokens(login);

      console.log(token);
      console.log(refreshToken);
      
      cookies.set('token', token, { path: '/', secure: false, maxAge: 60 });
      cookies.set('refreshToken', refreshToken, { path: '/', secure: false, maxAge: 30 });
      
      //let decoded = jwt.verify(token, 'cbwbor');
      //console.log(JSON.stringify(decoded, null, 4));

      return {success: true, message: "Wellcome или Добро пожаловать!", token, refreshToken};

    } catch (err) {

      console.log(err?.name+': '+err?.message+': '+err?.date);

			return fail(422, {
				fail: true, error: err?.name +': '+err.message + ': '+ (err?.name =='NotBeforeError'? err?.date : '')
			});

		}
    console.log(`login = ${login}`);
    console.log(`password = ${password}`);
//    get_name();
	},

  token: async ({ cookies, request }) => {

		//const data = await request.formData();
    //token = data.get('token');
    
    const token =cookies.get('token');
		try {

        let decoded = jwt.verify(token, secret);

        console.log(JSON.stringify(decoded));
        
        console.log('now='+Math.floor(Date.now() / 1000));
        console.log('iat='+decoded.iat);

        //console.log('nbf='+decoded.nbf);

         // throw new Error("Ваш токен протух!")
        
      return {success: true, message: "Wellcome или Добро пожаловать! ", token: token};

    } catch (err) {

      console.log(err?.name+': '+err?.message+': '+err?.date);

      if (err?.name == 'TokenExpiredError') {
        console.log("Ваш токен протух!");
        [token, refreshToken] = getTokens('bor');
        return {success: true, message: "Wellcome2.0 или Добро пожаловать! ", token: token, refreshToken};
      }

			return fail(422, {
				fail: true, error: err?.name +': '+err.message + ': '+ (err?.name =='NotBeforeError'? err?.date : '')
			});

		}
	},

};


function get_name() {
  // client
  // .query('SELECT name FROM test WHERE id = $1', [1])
  // .then((result) => console.log('Json: ' + JSON.stringify(result.rows)))
  // .catch((e) => console.error(e.stack))
}