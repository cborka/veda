// @ts-nocheck
export async function handle({ event, resolve }) {

  console.log('Hook');
  // console.log('Hook '+JSON.stringify(event.request.socket.remoteAddress));
  // console.log(event.request.socket.remoteAddress);
  console.log(event.request[Symbol.state]);
  //console.log(JSON.stringify(event.request[Symbol.state]));



  if (event.url.pathname.startsWith('/custom')) {
      return new Response('custom response');
  }

  const response = await resolve(event);
  return response;
}