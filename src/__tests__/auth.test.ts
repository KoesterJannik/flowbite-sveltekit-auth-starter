import { expect, test } from 'vitest';
import { hashPassword, comparePassword, generateJwtToken, decryptToken } from '$lib/server/auth';
import { generateRandomString } from '$lib/server/utils';

test('Checks the hashing and encryption of passwords', async () => {
	const randomPassword = generateRandomString(10);
	const hashedPassword = await hashPassword(randomPassword);
	const isPasswordCorrect = await comparePassword(randomPassword, hashedPassword);
	const isPasswordIncorrect = await comparePassword('wrongPassword', hashedPassword);
	expect(isPasswordCorrect).toBe(true);
	expect(isPasswordIncorrect).toBe(false);
});

test('Checks the generation and decryption of JWT tokens', async () => {
	const randomEmail = generateRandomString(10) + '@gmail.com';
	const token = await generateJwtToken({
		id: 1,
		email: randomEmail
	});
	const decryptedToken = await decryptToken(token);
	expect(decryptedToken.id).toBe(1);
	expect(decryptedToken.email).toBe(randomEmail);
});
