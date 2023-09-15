import type { PageServerLoad } from '../../../$types';

import { fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/db';
import { comparePassword, generateJwtToken } from '$lib/server/auth';
import logger from '../../../../lib/server/logger';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

export const actions = {
	login: async ({ request, cookies }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const isEmailInUse = await prisma.user.findUnique({
			where: {
				email: email
			}
		});
		if (!isEmailInUse) {
			return fail(400, {
				error: 'Email or password is wrong'
			});
		}
		const isPasswordCorrect = await comparePassword(password, isEmailInUse.password);
		if (!isPasswordCorrect) {
			return fail(400, {
				error: 'Wrong email or password'
			});
		}

		const token = await generateJwtToken({
			id: isEmailInUse.id,
			email: isEmailInUse.email,
			role: isEmailInUse.role
		});
		logger.info(`User ${isEmailInUse.email} logged in at ${new Date().toISOString()}`);

		cookies.set('token', token, {
			path: '/',
			httpOnly: true,
			maxAge: 60 * 60 * 24 /* 1 day */,
			sameSite: 'strict',
			secure: true
		});

		console.log('redirecting to dashboard');
		throw redirect(303, '/protected/dashboard');
	}
};
