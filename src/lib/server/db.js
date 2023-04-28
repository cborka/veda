import pkg from 'pg';
const { Client } = pkg;

// console.log('db_password = ' + process.env.DB_USER);

//export const db = 'DB123';
 
export const client = new Client({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

 client
   .connect()
   .then(() => console.log('База данных подключена'))
//  .then(() => get_date())
//  .then(() => get_name())
  .catch((err) => console.error('connection error', err.stack))
 // .then(() => client_end())
 // .then(() => client.end())

// console.log('dbs loading...');

// function get_date() {
//   client.query('SELECT NOW()', (err, res) => {
//     if (err) throw err
//     console.log('Data: ' + res.rowCount)
//   })
// }
 
// function get_name() {
//   client
//   .query('SELECT name FROM test WHERE id = $1', [2])
//   .then((result) => console.log(result.rowCount))
//   .catch((e) => console.error(e.stack))
// }

// function client_end() {
//   client
//   .end()
//   .then(() => console.log('client has disconnected'))
//   .catch((err) => console.error('error during disconnection', err.stack));
// }

// setTimeout(() => {
// client
//   .end()
//   .then(() => console.log('client has disconnected'))
//   .catch((err) => console.error('error during disconnection', err.stack));
// }, 5000
// );