<script lang="ts">
	import type { PageData } from './$types';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import * as Alert from '$lib/components/ui/alert';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';

	export let data: PageData;

	import { enhance } from '$app/forms';
	import { toast } from '@zerodevx/svelte-toast';
	import Board from '../../../../../../../components/dnd/admin/Board.svelte';

	let isLoading = false;
	let errorMessage = '';
	let showAddColumnDialog = false;
	let showAddTaskDialog = false;
	const onSubmitColumn = () => {
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
			showAddColumnDialog = false;
			isLoading = false;
		};
	};
	const onSubmitTask = () => {
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
			showAddTaskDialog = false;
			isLoading = false;
		};
	};
	let board = data?.selectedProject?.Column.map((column: any) => {
		return {
			id: column.id,
			name: column.name,
			items: column.Task.map((task: any) => {
				return {
					id: task.id,
					name: task.name
				};
			})
		};
	});

	console.log(board);

	$: {
		board = data?.selectedProject?.Column.map((column: any) => {
			return {
				id: column.id,
				name: column.name,
				items: column.Task.map((task: any) => {
					return {
						id: task.id,
						name: task.name
					};
				})
			};
		});
	}
</script>

<div class="flex justify-end">
	<AlertDialog.Root open={showAddColumnDialog}>
		<AlertDialog.Trigger asChild let:builder>
			<Button
				on:click={() => {
					showAddColumnDialog = true;
				}}
				builders={[builder]}
				variant="outline">Create new Column</Button
			>
		</AlertDialog.Trigger>
		<AlertDialog.Content>
			<form method="post" action="?/createNewColumn" use:enhance={onSubmitColumn}>
				<AlertDialog.Header>
					<AlertDialog.Title>Create a new column</AlertDialog.Title>
					<AlertDialog.Description>
						<div class="grid gap-2">
							<input type="hidden" name="projectId" value={data?.selectedProject?.id} />
							<div class="grid gap-1">
								<Label class="sr-only" for="firstName">Columnname</Label>
								<Input
									name="newColumnName"
									placeholder="Column Name"
									type="text"
									autocapitalize="none"
									autocomplete="newColumnName"
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

					<Button disabled={isLoading} type="submit">Create Column</Button>
				</AlertDialog.Footer>
			</form>
		</AlertDialog.Content>
	</AlertDialog.Root>
	<AlertDialog.Root open={showAddTaskDialog}>
		<AlertDialog.Trigger asChild let:builder>
			<Button
				disabled={data?.selectedProject?.Column.length == 0}
				on:click={() => {
					showAddTaskDialog = true;
				}}
				builders={[builder]}
				variant="outline">Create new Task</Button
			>
		</AlertDialog.Trigger>
		<AlertDialog.Content>
			<form method="post" action="?/createNewTask" use:enhance={onSubmitTask}>
				<AlertDialog.Header>
					<AlertDialog.Title>Create a new Task</AlertDialog.Title>
					<AlertDialog.Description>
						<div class="grid gap-2">
							<input type="hidden" name="projectId" value={data?.selectedProject?.id} />
							<div class="grid gap-1">
								<Label class="sr-only" for="firstName">Taskname</Label>
								<Input
									name="newTaskName"
									placeholder="Taskname"
									type="text"
									autocapitalize="none"
									autocomplete="newTaskName"
									autocorrect="off"
									disabled={isLoading}
									required
								/>
							</div>
						</div>

						<div class="grid gap-2">
							<select name="selectedColumnId" required>
								<option value="" disabled selected>Select a Column</option>
								<optgroup label="Columns">
									<!-- loop through each col in data.selectedProject.Column -->
									<!-- replace col.id and col.name with the actual values -->
									{#if data?.selectedProject?.Column.length != 0}
										{#each data.selectedProject.Column as col}
											<option value={col.id}>{col.name}</option>
										{/each}
									{/if}

									<!-- end of loop -->
								</optgroup>
							</select>
							<input type="hidden" name="selectedColumnId" />
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

					<Button disabled={isLoading} type="submit">Create Task</Button>
				</AlertDialog.Footer>
			</form>
		</AlertDialog.Content>
	</AlertDialog.Root>
</div>

<div class="space-y-2">
	<h2 class="text-3xl font-bold tracking-tight">Projects</h2>
	<p class="text-sm">You can see the progress of your project here</p>
</div>

<Board columnItems={board} />
