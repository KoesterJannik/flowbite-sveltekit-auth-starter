import { error, json } from '@sveltejs/kit';
import ask from '../../../../lib/server/openai.js';

export async function POST({ request, cookies }) {
	const jsonPayload = await request.json();
	const messages = jsonPayload.message;
	console.log('messages', messages);
	try {
		const result = await ask(messages);
		console.log(result);
		//const newMessageArray = [...messages, apiResponse];
		const newMessageArray = [...messages, { role: 'bot', message: result }];

		return json({ msg: 'okay', messages: newMessageArray });
	} catch (error) {
		console.log(error);
	}
}
