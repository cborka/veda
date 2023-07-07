// @ts-nocheck

import { getRequest, setResponse } from '@sveltejs/kit/node';

export async function handle({ event, resolve }) {


  //let req = await getRequest({request: event.request});
  console.log('Hook-req '+JSON.stringify(event?.platform?.request));

  console.log('Hook');
 //  console.log('Hook '+JSON.stringify(event.request.socket.remoteAddress));
  // console.log(event.request.socket.remoteAddress);
  console.log(event.request[Symbol.state]);

  //console.log(JSON.stringify(event.request[Symbol.state]));
  console.log('Hook='+JSON.stringify(event.locals));


  if (event.url.pathname.startsWith('/custom')) {
      return new Response('custom response');
  }

  const response = await resolve(event);
  return response;
}