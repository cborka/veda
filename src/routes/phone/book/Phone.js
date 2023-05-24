export default function Phone(id='', sd='', fio='', tel='') {
  return {
    values: {id, sd, fio, tel},
    types: {id: 'n', sd: 's', fio: 's', tel: 's'},
    defaults: {id: 0, sd: '', fio: '', tel: ''}
  }
}


// // @ts-nocheck
// import Field from '$lib/dbs/Field.js';

// export default class Phone {

//   constructor(id='', sd='', fio='', tel='') {
//     this.id = Field('i', id);
//     this.sd = Field('s', sd);
//     this.fio = Field('s', fio);
//     this.tel =  Field('s', tel);
//   }

//   toJSON () {
//     let values = {};
//     for(let f in this) {
//       values[f] = f?.val;
//     }
//     return values; // here I make a POJO's copy of the class instance
// //    return {...this} // here I make a POJO's copy of the class instance
//   }

// }






// export default function Phone(id='', sd='', fio='', tel='') {
//     this.id = id;
//     this.sd = sd;
//     this.fio = fio;
//     this.tel = tel;
//   }

// export class Phonex {
//   constructor(id = '0', sd = '', fio = '', tel = '') {
//     this.id = id;
//     this.sd = sd;
//     this.fio = fio;
//     this.tel = tel;

//   }
// }