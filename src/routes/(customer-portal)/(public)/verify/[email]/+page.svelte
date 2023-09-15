<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
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

<div
	class="container relative hidden flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 h-full"
>
	<div class="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
		<div
			class="absolute inset-0 bg-cover"
			style="
				background-image:
					url(https://images.unsplash.com/photo-1590069261209-f8e9b8642343?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1376&q=80);"
		/>
		<div class="relative z-20 flex items-center text-lg font-medium">
			<!-- <Command class="mr-2 h-6 w-6" /> -->
			Köster Webservices Customer Portal
		</div>
	</div>
	<div class="lg:p-8">
		<div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
			<div class="flex flex-col space-y-2 text-center">
				<h1 class="text-2xl font-semibold tracking-tight">Create a password</h1>
				<p class="text-sm text-muted-foreground">Enter your password in order to log in.</p>
			</div>
			<div class={cn('grid gap-6', className)} {...$$restProps}>
				<form method="post" action="?/verifyUser" use:enhance={onSubmit}>
					<div class="grid gap-2">
						<div class="grid gap-1">
							<Label class="sr-only" for="email">Email</Label>
							<Input
								name="email"
								value={data.email}
								type="email"
								autocapitalize="none"
								autocomplete="email"
								autocorrect="off"
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
						<Button type="submit" disabled={isLoading}>
							{#if isLoading}
								<Icon icon="line-md:isLoading-twotone-loop" />
							{/if}
							Confirm
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
			<p class="px-8 text-center text-sm text-muted-foreground">
				By clicking continue, you agree to our{' '}
				<a href="/terms" class="underline underline-offset-4 hover:text-primary">
					Terms of Service
				</a>{' '}
				and{' '}
				<a href="/privacy" class="underline underline-offset-4 hover:text-primary">
					Privacy Policy
				</a>
				.
			</p>
		</div>
	</div>
</div>
