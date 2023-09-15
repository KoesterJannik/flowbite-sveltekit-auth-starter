import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/db';
export const load = (async ({ params }) => {
	const userId = params.id;
	console.log('userId', userId);
	const selectedUser = await prisma.user.findUnique({
		where: {
			id: userId
		},
		include: {
			Project: true
		}
	});

	return { selectedUser };
}) satisfies PageServerLoad;

export const actions = {
	createBoardForUser: async ({ request }) => {
		const formData = await request.formData();
		const userId = formData.get('userId') as string;
		const taskName = formData.get('taskName') as string;
		const taskDescription = formData.get('taskDescription') as string;

		const newProject = await prisma.project.create({
			data: {
				name: taskName,
				description: taskDescription,
				ownerId: userId
			}
		});
		const exampleColumns = ['New', 'In Progress', 'In Review', 'Done'];
		for (const column of exampleColumns) {
			await prisma.column.create({
				data: {
					name: column,
					project: {
						connect: {
							id: newProject.id
						}
					}
				}
			});
		}
		return {};
	},
	deleteProject: async ({ request }) => {
		const formData = await request.formData();
		const projectId = formData.get('projectId') as string;
		await prisma.task.deleteMany({
			where: {
				Column: {
					projectId: projectId
				}
			}
		});
		await prisma.column.deleteMany({
			where: {
				projectId: projectId
			}
		});
		await prisma.project.delete({
			where: {
				id: projectId
			}
		});
		return {};
	}
};
