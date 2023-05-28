// @ts-nocheck

import { fail } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import jwt from  'jsonwebtoken';

let token = '';
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


export async function load() {

  return {token}

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
    
		try {
      token = jwt.sign(
        { 
          login: login, 
          exp: Math.floor(Date.now() / 1000) + (15),
//          nbf: 1685096470, 
//          nbf: Math.floor(Date.now() / 1000) + 10 
        }, 'cbwbor');

        //let decoded = jwt.verify(token, 'cbwbor');
        //console.log(JSON.stringify(decoded, null, 4));

      return {success: true, message: "Wellcome или Добро пожаловать!", token: token};

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

		const data = await request.formData();
    token = data.get('token');
    
		try {

        let decoded = jwt.verify(token, 'cbwbor');

        console.log(JSON.stringify(decoded));

        
        console.log('now='+Math.floor(Date.now() / 1000));
        console.log('iat='+decoded.iat);
        //console.log('nbf='+decoded.nbf);

        if (decoded.nbf < decoded.iat)
          console.log('Fail'); 
         // throw new Error("Ваш токен протух!")

      return {success: true, message: "Wellcome или Добро пожаловать! ", token: token};

    } catch (err) {

      console.log(err?.name+': '+err?.message+': '+err?.date);

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