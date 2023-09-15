import { fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/db';
import { comparePassword, generateJwtToken, hashPassword } from '$lib/server/auth';
import logger from '$lib/server/logger';

export const load = async () => {
	return {};
};

export const actions = {
	register: async ({ request, cookies }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		const isEmailInUse = await prisma.user.findUnique({
			where: {
				email: email
			}
		});
		if (isEmailInUse) {
			return fail(400, { error: 'Email already in use' });
		}
		const hashedPassword = await hashPassword(password);
		console.log(hashedPassword);
		const newUser = await prisma.user.create({
			data: {
				email: email,
				password: hashedPassword
			}
		});

		if (!newUser) {
			console.log('Error creating a user,please contact an admin');
			return fail(400, { error: 'Error creating a user,please contact an admin' });
		}
		// token erstellen

		const token = generateJwtToken({
			id: newUser.id,
			email: newUser.email,
			role: newUser.role
		});

		cookies.set('token', token, {
			path: '/',
			httpOnly: true,
			maxAge: 60 * 60 * 24,
			sameSite: 'strict',
			secure: true
		});

		throw redirect(303, '/protected/dashboard');
	}
};
