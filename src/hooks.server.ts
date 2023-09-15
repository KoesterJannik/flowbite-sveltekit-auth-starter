import { redirect } from '@sveltejs/kit';
import { verifyUser } from '$lib/server/auth';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	const desiredUrl = event.url.pathname;

	if (desiredUrl.startsWith('/protected')) {
		const token = event.cookies.get('token');

		if (!token) {
			console.log('No token found hooks');
			throw redirect(300, '/');
		}
		const user = await verifyUser(token);

		if (!user) {
			console.log('User not found');
			throw redirect(300, '/login');
		}

		event.locals.user = user;

		if (desiredUrl.startsWith('/protected/admin')) {
			if (user.role != 'ADMIN') {
				throw redirect(300, '/');
			}
		}

		const response = await resolve(event);
		return response;
	}
	const response = await resolve(event);
	return response;
}
