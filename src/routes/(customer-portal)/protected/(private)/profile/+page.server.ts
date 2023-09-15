import { prisma } from '$lib/server/db';
import { fail } from '@sveltejs/kit';
import { comparePassword, hashPassword } from '$lib/server/auth';
import type { PageServerLoad } from './$types.js';
import fs from 'fs';
import { uploadFileToAws } from '$lib/server/aws';
export const load = (async (event) => {
	return {};
}) satisfies PageServerLoad;

export const actions = {
	changePassword: async ({ request, locals }) => {
		const formData = await request.formData();
		const oldPassword = formData.get('oldPassword') as string;
		const newPassword = formData.get('newPassword') as string;
		if (!oldPassword || !newPassword) {
			return fail(400, {
				error: 'Missing password'
			});
		}
		const user = await prisma.user.findUnique({
			where: {
				id: locals.user.id
			}
		});
		if (!user) {
			return fail(400, {
				error: 'User not found'
			});
		}
		const isPasswordCorrect = await comparePassword(oldPassword, user.password);
		if (!isPasswordCorrect) {
			return fail(400, {
				error: 'Wrong password'
			});
		}
		const hashedPassword = await hashPassword(newPassword);
		await prisma.user.update({
			where: {
				id: user.id
			},
			data: {
				password: hashedPassword
			}
		});
		return {};
	},
	uploadProfileImage: async ({ request, cookies, locals }) => {
		const formData = await request.formData();

		const profileImage = formData.get('profileImage') as File;

		if (profileImage.size < 0) {
			return fail(400, {
				message: 'Passport not provided'
			});
		}

		const fileNameEnding = profileImage.name.split('.').pop();
		const profileImageAsBuffer = new Uint8Array(await profileImage.arrayBuffer());
		const result = await uploadFileToAws({
			fileContent: profileImageAsBuffer,
			fileName: locals.user.id + '.' + fileNameEnding,
			folderName: 'profile-images'
		});
		console.log(result);
		if (!result) {
			return fail(400, {
				message: 'Error uploading profile image'
			});
		}
		await prisma.user.update({
			where: {
				id: locals.user.id
			},
			data: {
				profileImage: result.fullUrl
			}
		});
		locals.user.profileImage = result.fullUrl;

		/*const fileName = `${locals.user.id}.jpg`;
		const filePath = `./uploads/${fileName}`;
		fs.writeFileSync(filePath, profileImageAsBuffer);*/

		return {
			success: true,
			message: 'Passport uploaded successfully'
		};
	}
};
