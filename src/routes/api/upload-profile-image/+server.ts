import { json } from '@sveltejs/kit';

import { prisma } from '$lib/server/db';
import { verifyUser } from '$lib/server/auth';
export async function POST({ request, cookies }) {
	try {
		const token = cookies.get('token');

		if (!token) {
			return json({ message: 'User not found' });
		}

		const user = await verifyUser(token);
		if (!user) {
			return json({ message: 'User not found' });
		}
		const formData = await request.formData();
		const profileImage = formData.get('profileImage') as File;

		return json({ msg: 'success' });
	} catch (error) {
		console.log(error);
	}
}
