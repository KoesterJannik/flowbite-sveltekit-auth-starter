import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/db';
export const load = (async ({ params }) => {
	const userId = params.id;
	console.log('userId', userId);
	const selectedProject = await prisma.project.findUnique({
		where: {
			id: userId
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

export const actions = {
	createNewColumn: async ({ request }) => {
		const formData = await request.formData();
		const projectId = formData.get('projectId') as string;
		const newColumnName = formData.get('newColumnName') as string;

		await prisma.column.create({
			data: {
				name: newColumnName,
				project: {
					connect: {
						id: projectId
					}
				}
			}
		});
		return {};
	},
	createNewTask: async ({ request }) => {
		const formData = await request.formData();
		const columnId = formData.get('selectedColumnId') as string;

		const projectId = formData.get('projectId') as string;
		const newTaskName = formData.get('newTaskName') as string;
		const newTask = await prisma.task.create({
			data: {
				name: newTaskName,
				columnId: columnId
			}
		});

		console.log('columnId', columnId);
		console.log('newTaskName', newTaskName);
		console.log('projectId', projectId);

		/*await prisma.task.create({
			data: {
				name: newTaskName,
				description: newTaskDescription,
				column: {
					connect: {
						id: columnId
					}
				}
			}
		});*/
		return {};
	}
};
