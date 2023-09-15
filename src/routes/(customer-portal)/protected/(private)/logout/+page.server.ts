import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
	cookies.set('token', '', {
		path: '/',
		maxAge: 0
	});
	throw redirect(300, '/login');
};
