import { json } from '@sveltejs/kit';

import { prisma } from '$lib/server/db';
import { verifyUser } from '$lib/server/auth';
export async function PUT({ request, cookies, params }) {
	try {
		const token = cookies.get('token');

		if (!token) {
			return json({ message: 'User not found' });
		}

		const data = await request.json();
		console.log('HIT');
		console.log('COL ID', params.id);
		console.log(data);
		let order = 1;
		for (const task of data.items) {
			console.log(task);
			await prisma.task.update({
				where: {
					id: task.id
				},
				data: {
					columnId: params.id,
					order: order
				}
			});
			order++;
		}

		return json({ msg: 'success' });
	} catch (error) {
		console.log(error);
	}
}
