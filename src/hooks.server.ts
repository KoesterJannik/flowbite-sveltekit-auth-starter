import { redirect } from '@sveltejs/kit';
import { hashPassword, verifyUser } from '$lib/server/auth';
import { building } from '$app/environment';

import { prisma } from '$lib/server/db';

async function setupAdminAccount() {
	const adminUser = await prisma.user.findFirst({
		where: {
			role: 'ADMIN'
		}
	});
	if (!adminUser) {
		const email = 'koesterjannik1998@gmail.com';
		const password = 'thisisshrek';
		const hashedPassword = await hashPassword(password);
		await prisma.user.create({
			data: {
				email: email,
				password: hashedPassword,
				firstName: 'Jannik',
				lastName: 'Koester',
				role: 'ADMIN',
				isVerified: true
			}
		});
	}
}

async function startup() {
	// start all cron jobs
	console.log('Setup models');

	await setupAdminAccount();
}

// this check prevents starting worker during pre-renders in build time
if (!building) {
	startup()
		.then(async () => {
			console.log('👷 worker started');
		})
		.catch((err) => {
			console.warn('❗worker failed to start: ', err);
		});
}

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
			throw redirect(300, '/');
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
