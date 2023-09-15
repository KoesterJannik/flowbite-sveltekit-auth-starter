<script lang="ts">
	import type { PageData } from './$types';
	import DataTable from './data-table.svelte';
	export let data: PageData;
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { enhance } from '$app/forms';
	import * as Alert from '$lib/components/ui/alert';
	import Icon from '@iconify/svelte';
	import { toast } from '@zerodevx/svelte-toast';
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
				variant="outline">Invite User</Button
			>
		</AlertDialog.Trigger>
		<AlertDialog.Content>
			<form method="post" action="?/inviteUser" use:enhance={onSubmit}>
				<AlertDialog.Header>
					<AlertDialog.Title>Create a new customer</AlertDialog.Title>
					<AlertDialog.Description>
						<div class="grid gap-2">
							<div class="grid gap-1">
								<Label class="sr-only" for="firstName">First Name</Label>
								<Input
									name="firstName"
									placeholder="First Name"
									type="text"
									autocapitalize="none"
									autocomplete="firstName"
									autocorrect="off"
									disabled={isLoading}
									required
								/>
							</div>
							<div class="grid gap-1">
								<Label class="sr-only" for="firstName">Last Name</Label>
								<Input
									name="lastName"
									placeholder="Last Name"
									type="text"
									autocapitalize="none"
									autocomplete="lastName"
									autocorrect="off"
									disabled={isLoading}
									required
								/>
							</div>

							<div class="grid gap-1">
								<Label class="sr-only" for="email">Email</Label>
								<Input
									name="email"
									placeholder="name@example.com"
									type="email"
									autocapitalize="none"
									autocomplete="email"
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

					<Button disabled={isLoading} type="submit">Create customer</Button>
				</AlertDialog.Footer>
			</form>
		</AlertDialog.Content>
	</AlertDialog.Root>
</div>

<div class="container mx-auto py-10">
	<DataTable data={data?.allUsers} />
</div>
