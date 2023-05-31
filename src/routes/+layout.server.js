// @ts-nocheck

import { fail, redirect } from '@sveltejs/kit';
import jwt from  'jsonwebtoken';
import {getSecret, getTokens} from '$lib/auth.js';

let login = 'x';

//import {LOGONSERVER, USERDNSDOMAIN, PROCESSOR_IDENTIFIER, COMPUTERNAME, USERNAME} from '$env/static/private';

export async function load({cookies, route, url, locals, request }) {

  // console.log('url='+JSON.stringify(url, undefined, 2));
  // console.log('route='+JSON.stringify(route, undefined, 2));
  // console.log('locals ='+JSON.stringify(locals , undefined, 2));
  // console.log('USERDOMAIN ='+JSON.stringify(LOGONSERVER, undefined, 2));
  // console.log('USERDNSDOMAIN ='+JSON.stringify(USERDNSDOMAIN, undefined, 2));
  // console.log('USERNAME ='+JSON.stringify(USERNAME, undefined, 2));
  // console.log('PROCESSOR_IDENTIFIER ='+JSON.stringify(PROCESSOR_IDENTIFIER, undefined, 2));
  // console.log('COMPUTERNAME ='+JSON.stringify(COMPUTERNAME, undefined, 2));
  // //console.log('request.headers ='+JSON.stringify(request.headers, undefined, 2));
  console.log('request.headers.user-agent ='+request.headers.get('user-agent')   );
  console.log('request.headers.host ='+request.headers.get('host')   );
  console.log('request.headers.referer ='+request.headers.get('referer')   );
  console.log('request.ip ='+request?.remoteAddress   );
  //request.headers.forEach(console.log);
  request.headers.get('user-agent');

   let refreshToken =cookies.get('refreshToken');
  let token =cookies.get('token');

  console.log(token);
  try {

    let decoded = jwt.verify(token, getSecret());
    //console.log(JSON.stringify(decoded, undefined, 2));

    login = decoded?.login;
  } catch (err) {

    console.log('Увы...' + err?.name+': '+err?.message);

    if (err?.name == 'TokenExpiredError') {
      console.log("Ваш токен протух!");
      if (!refreshToken) {
        console.log("refreshToken токен тоже протух!");
        login = 'undefined';
      } else {
        [token, refreshToken] = getTokens(login);
        console.log("+получил новые токены!");
        cookies.set('token', token, { path: '/', secure: false, maxAge: 60 });
        cookies.set('refreshToken', refreshToken, { path: '/', secure: false, maxAge: 30 });
      }
 
      //[token, refreshToken] = getTokens('bor');
      //return {success: true, message: "Wellcome2.0 или Добро пожаловать! ", token: token, refreshToken};
    } else {
      login = 'undefined';
      //throw redirect(303, '/users/login');
    }
  }
  return {login, token, refreshToken}
}
