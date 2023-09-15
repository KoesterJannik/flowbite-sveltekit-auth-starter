import { BCRYPT_SALT_ROUNDS, JWT_ACCESS_SECRET, JWT_EXPIRES_IN } from '$env/static/private';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from './db';

export function hashPassword(password: string): Promise<string> {
	const SALT = Number(BCRYPT_SALT_ROUNDS);
	return bcrypt.hash(password, SALT);
}

export function comparePassword(password: string, hash: string): Promise<boolean> {
	return bcrypt.compare(password, hash);
}

export function generateJwtToken(payload: any): string {
	return jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function decryptToken(token: string): any {
	return jwt.verify(token, JWT_ACCESS_SECRET);
}

export async function verifyUser(token: string) {
	const decodedToken = await decryptToken(token);
	if (!decodedToken) {
		return null;
	}

	const user = await prisma.user.findUnique({
		where: {
			id: decodedToken.id
		}
	});

	if (!user) {
		return null;
	}
	return user;
}
