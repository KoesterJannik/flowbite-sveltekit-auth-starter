import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/db';
import { fail } from '@sveltejs/kit';
import { generateRandomString } from '../../../../../lib/server/utils';
import mailer from '../../../../../lib/server/mailer';
import { DOMAIN } from '$env/static/private';

export const load = (async (event) => {
	const allUsers = await prisma.user.findMany();
	return { allUsers };
}) satisfies PageServerLoad;

export const actions = {
	inviteUser: async ({ request }) => {
		const formData = await request.formData();
		const firstName = formData.get('firstName') as string;
		const lastName = formData.get('lastName') as string;
		const email = formData.get('email') as string;
		if (!firstName || !lastName || !email) {
			return fail(400, {
				error: 'Data is missing'
			});
		}
		const emailIsInUse = await prisma.user.count({
			where: {
				email: email
			}
		});
		if (emailIsInUse > 0) {
			console.log('Email is already in use');
			return fail(400, {
				error: 'Email is already in use'
			});
		}
		const wasEmailSend: boolean = await mailer.sendHtmlEmail({
			to: [email],
			subject: 'You have been invited by Jannik Köster',
			htmlTemplateName: 'invite-user.ejs',
			data: {
				firstName: firstName,
				lastName: lastName,
				url: `${DOMAIN}/verify/${email}`
			}
		});
		if (!wasEmailSend) {
			return fail(400, {
				error: 'Email could not be send'
			});
		}
		await prisma.user.create({
			data: {
				firstName: firstName,
				lastName: lastName,
				email: email,
				password: generateRandomString(10),
				role: 'USER',
				isVerified: false
			}
		});

		const allUsers = await prisma.user.findMany();
		return { allUsers };
	}
};
