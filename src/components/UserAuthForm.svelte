<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { cn } from '$lib/utils';
	import Icon from '@iconify/svelte';
	import * as Alert from '$lib/components/ui/alert';
	import { Terminal } from 'lucide-svelte';
	import { enhance } from '$app/forms';

	let className: string | undefined | null = undefined;
	export { className as class };

	let isLoading = false;
	let errorMessage = '';
	const onSubmit = () => {
		isLoading = true;
		return ({ result, update }: any) => {
			console.log(result);
			if (result.status == 400) {
				errorMessage = result.data.error;
			}
			update();
			isLoading = false;
		};
	};
</script>

<div class={cn('grid gap-6', className)} {...$$restProps}>
	<form method="post" action="?/login" use:enhance={onSubmit}>
		<div class="grid gap-2">
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
			<div class="grid gap-1">
				<Label class="sr-only" for="password">Password</Label>
				<Input
					name="password"
					type="password"
					autocapitalize="none"
					placeholder="********"
					autocomplete="password"
					autocorrect="off"
					disabled={isLoading}
					required
				/>
			</div>
			<Button disabled={isLoading}>
				{#if isLoading}
					<Icon icon="line-md:isLoading-twotone-loop" />
				{/if}
				Sign In with Email
			</Button>
		</div>
		{#if errorMessage}
			<Alert.Root>
				<Alert.Title>Error</Alert.Title>
				<Alert.Description>{errorMessage}</Alert.Description>
			</Alert.Root>
		{/if}
	</form>
</div>
