import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/db';
export const load = (async (event) => {
	const selectedProject = await prisma.project.findUnique({
		where: {
			id: event.params.id
		},
		include: {
			Column: {
				include: {
					Task: {
						orderBy: {
							order: 'asc'
						}
					}
				}
			}
		}
	});
	return { selectedProject };
}) satisfies PageServerLoad;
