import { json } from '@sveltejs/kit';

export async function POST({ request, cookies }) {
	try {
		const data = await request.json();
		return json({ data });
	} catch (error) {
		console.log(error);
	}
}
