
// Сформировать предложение WHERE для SQL-запроса
export function makeWhere(field_name = '', filter = '', type = 's') {
  let fld = field_name; // Имя поля
  let f = filter;       // Строка фильтра
  let t = type;         // Тип поля n или s (число или строка)

    if(f.trim() == '') return '';

  f = f.slice(0, 10); // Короче, тут пользовательский ввод и его надо обезопасить, пока просто ограничу длинну

  if (t == 's') {
    return ` AND ${fld} LIKE '%${f}%' `;
  } else if (t == 'n') {  
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
//      console.log("Неверный формат фильтра у колонки " + fld);
      return 'ERROR';
//         throw new Error ("Неверный формат фильтра у колонки " + fld);
    } else {
      if (op == '==') {
        op = '=';
      }
//      console.log(` AND ${fld} ${op} ${num} `);
      return ` AND ${fld} ${op} ${num} `;
    }
  } // if (t == 'i')
}
