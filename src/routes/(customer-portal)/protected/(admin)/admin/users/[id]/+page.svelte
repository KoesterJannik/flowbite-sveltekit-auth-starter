<script lang="ts">
	import type { PageData } from './$types';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import * as Alert from '$lib/components/ui/alert';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	export let data: PageData;
	import * as Card from '$lib/components/ui/card';
	import Icon from '@iconify/svelte';
	import { enhance } from '$app/forms';
	import { toast } from '@zerodevx/svelte-toast';
	import { goto } from '$app/navigation';

	let isLoading = false;
	let errorMessage = '';
	let showAlertDialog = false;
	const onSubmit = () => {
		isLoading = true;
		return async ({ result, update }: any) => {
			if (result.status == 400) {
				errorMessage = result.data.error;
				console.log(result.data.error);
				await update();
				isLoading = false;
				return;
			}
			await update();
			toast.push('User got invited!', {
				theme: {
					'--toastColor': 'mintcream',
					'--toastBackground': 'rgba(72,187,120,0.9)',
					'--toastBarBackground': '#2F855A'
				}
			});
			showAlertDialog = false;
			isLoading = false;
		};
	};
</script>

<div class="flex justify-end">
	<AlertDialog.Root open={showAlertDialog}>
		<AlertDialog.Trigger asChild let:builder>
			<Button
				on:click={() => {
					showAlertDialog = true;
				}}
				builders={[builder]}
				variant="outline">Create new Project</Button
			>
		</AlertDialog.Trigger>
		<AlertDialog.Content>
			<form method="post" action="?/createBoardForUser" use:enhance={onSubmit}>
				<AlertDialog.Header>
					<AlertDialog.Title>Create a Project</AlertDialog.Title>
					<AlertDialog.Description>
						<div class="grid gap-2">
							<input type="hidden" name="userId" value={data.selectedUser.id} />
							<div class="grid gap-1">
								<Label class="sr-only" for="firstName">Taskname</Label>
								<Input
									name="taskName"
									placeholder="Taskname"
									type="text"
									autocapitalize="none"
									autocomplete="taskName"
									autocorrect="off"
									disabled={isLoading}
									required
								/>
							</div>
							<div class="grid gap-1">
								<Label class="sr-only" for="firstName">Task Description</Label>
								<Input
									name="taskDescription"
									placeholder="Task Description"
									type="text"
									autocapitalize="none"
									autocomplete="taskDescription"
									autocorrect="off"
									disabled={isLoading}
									required
								/>
							</div>
						</div>
						{#if errorMessage}
							<Alert.Root>
								<Alert.Title>Error</Alert.Title>
								<Alert.Description>{errorMessage}</Alert.Description>
							</Alert.Root>
						{/if}
					</AlertDialog.Description>
				</AlertDialog.Header>
				<AlertDialog.Footer>
					<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>

					<Button disabled={isLoading} type="submit">Create Project</Button>
				</AlertDialog.Footer>
			</form>
		</AlertDialog.Content>
	</AlertDialog.Root>
</div>

<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
	{#if data.selectedUser.Project.length == 0}
		<p>No projects yet</p>
	{:else}
		{#each data.selectedUser.Project as project}
			<Card.Root>
				<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
					<Card.Title class="text-sm font-medium">{project.name}</Card.Title>
					<Icon icon="mdi-light:home" class="mr-2 h-4 w-4" />
				</Card.Header>
				<Card.Content>
					<div class="text-2xl font-bold">{project.description}</div>

					<a
						href={`/protected/admin/projects/${project.id}`}
						class="text-sm text-blue-500 hover:underline">View project</a
					>
					<form method="post" action="?/deleteProject">
						<input type="hidden" name="projectId" value={project.id} />

						<Button type="submit" variant="outline">Delete Project</Button>
					</form>
				</Card.Content>
			</Card.Root>
		{/each}
	{/if}
</div>
