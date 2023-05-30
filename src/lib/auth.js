import jwt from  'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';


export function getSecret() {
  return 'SECRET_KEY';
}

function getToken(login = 'user') {

  return jwt.sign(
    { 
      login: login, 
      exp: Math.floor(Date.now() / 1000) + (15),
    }, getSecret());
}

function getRefreshToken(login = 'user') {

    let refreshToken = uuidv4();

    return refreshToken;
}

export function getTokens(login = 'user') {
    return [getToken(login), getRefreshToken(login)]
}

export function getLogin() {
  let login = 'x';
  

  
  return login;
}