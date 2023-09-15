import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/db';
import { redirect } from '@sveltejs/kit';
import { generateJwtToken, hashPassword } from '../../../../../lib/server/auth';
export const load = (async ({ params }) => {
	const email = params.email;
	console.log(email);
	if (!email) {
		throw redirect(303, '/');
	}
	const user = await prisma.user.findUnique({
		where: {
			email: email
		}
	});
	if (!user) {
		throw redirect(303, '/');
	}
	if (user?.isVerified) {
		throw redirect(303, '/');
	}

	return { email };
}) satisfies PageServerLoad;

export const actions = {
	verifyUser: async ({ request, cookies }) => {
		const formData = await request.formData();
		const password = formData.get('password') as string;
		const email = formData.get('email') as string;
		console.log(email);
		console.log(password);
		const user = await prisma.user.findUnique({
			where: {
				email: email
			}
		});
		if (!user) {
			throw redirect(303, '/');
		}
		if (user?.isVerified) {
			throw redirect(303, '/');
		}
		const hashedPassword = await hashPassword(password);
		await prisma.user.update({
			where: {
				email: email
			},
			data: {
				password: hashedPassword,
				isVerified: true
			}
		});
		const token = generateJwtToken({
			id: user.id,
			email: user.email,
			role: user.role
		});

		cookies.set('token', token, {
			path: '/',
			httpOnly: true,
			maxAge: 60 * 60 * 24 /* 1 day */,
			sameSite: 'strict',
			secure: true
		});
		throw redirect(303, '/protected/dashboard');
	}
};
