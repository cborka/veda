// Получаем данные из формы
import { fail } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

//import {client} from '../../../db';

// export function load() {
// 	throw error(420, 'Enhance your calm');
// }

export const actions = {
  default: async ({ cookies, request }) => {
		const data = await request.formData();
    let login = data.get('login');
    let password = data.get('password');
    
		try {

    } catch (error) {
			return fail(422, {
				description: data.get('description'),
				// @ts-ignore
				error: error.message
			});
		}
    console.log(`login = ${login}`);
    console.log(`password = ${password}`);
    get_name();
	},
  
};


function get_name() {
  // client
  // .query('SELECT name FROM test WHERE id = $1', [1])
  // .then((result) => console.log('Json: ' + JSON.stringify(result.rows)))
  // .catch((e) => console.error(e.stack))
}