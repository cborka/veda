export function load({params, url, route }) {

  // @ts-ignore
  //console.log('url '+JSON.stringify(url)); 
  //console.log('route '+JSON.stringify(route));
  //console.log('params?.slug '+params?.slug);
  return {route: url, params: params};
}