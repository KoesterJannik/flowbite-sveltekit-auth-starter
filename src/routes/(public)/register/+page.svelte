<script lang="ts">
	import { Label, Input, Helper, Button, Spinner, Alert } from 'flowbite-svelte';
	import { EnvelopeSolid } from 'flowbite-svelte-icons';
	import { enhance } from '$app/forms';

	let loading = false;
	let errorMessage = '';
	const onSubmit = () => {
		loading = true;
		return ({ result, update }: any) => {
			console.log(result);
			if (result.status == 400) {
				errorMessage = result.data.error;
			}
			update();
			loading = false;
		};
	};
</script>

<div class="mb-6">
	<form method="post" action="?/register" use:enhance={onSubmit} class="mx-auto max-w-xl">
		<Label for="input-group-1" class="block mb-2">Your Email</Label>
		<Input name="email" type="email" placeholder="name@flowbite.com">
			<EnvelopeSolid slot="left" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
		</Input>
		<Label for="input-group-1" class="block mb-2">Your Password</Label>
		<Input name="password" type="password" placeholder="password" />

		<div class="mt-2">
			{#if loading}
				<Button>
					<Spinner class="mr-3" size="4" color="white" />Registering ...
				</Button>
			{:else}
				<Button type="submit" class="mt-4 w-full md:w-auto      ">Register</Button>
			{/if}
		</div>
		{#if errorMessage}
			<Alert color="red" class="mt-2">
				{errorMessage}
			</Alert>
		{/if}
	</form>
</div>
