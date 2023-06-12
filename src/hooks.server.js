// @ts-nocheck
export async function handle({ event, resolve }) {

  console.log('Hook');
  console.log('event.clientAddress='+event.getClientAddress()); // !!!
  
  if (event.url.pathname.startsWith('/custom')) {
      return new Response('custom response');
  }

  const response = await resolve(event);
  return response;
}