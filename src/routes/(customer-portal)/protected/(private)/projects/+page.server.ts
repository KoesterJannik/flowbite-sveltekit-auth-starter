import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/db';

export const load = (async (event) => {
	const customerProjects = await prisma.project.findMany({
		where: {
			ownerId: event.locals.user.id
		}
	});
	return { customerProjects };
}) satisfies PageServerLoad;
