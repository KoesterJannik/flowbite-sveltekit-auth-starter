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
		const taskId = params.id;
		await prisma.task.update({
			where: {
				id: taskId
			},
			data: {
				name: data.name
			}
		});

		return json({ msg: 'success' });
	} catch (error) {
		console.log(error);
	}
}

export async function DELETE({ params }) {
	try {
		const taskId = params.id;
		await prisma.task.delete({
			where: {
				id: taskId
			}
		});

		return json({ msg: 'success' });
	} catch (error) {
		console.log(error);
	}
}
