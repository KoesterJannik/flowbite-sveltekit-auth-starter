<script lang="ts">
	import type { PageData } from './$types';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { cn } from '$lib/utils';
	import Icon from '@iconify/svelte';
	import * as Alert from '$lib/components/ui/alert';

	import { enhance } from '$app/forms';
	import { toast } from '@zerodevx/svelte-toast';

	let className: string | undefined | null = undefined;
	export { className as class };

	let isLoading = false;
	let errorMessage = '';
	const onSubmit = () => {
		isLoading = true;
		errorMessage = '';
		return ({ result, update }: any) => {
			if (result.status == 400) {
				errorMessage = result.data.error;
			} else {
				toast.push('Password changed!', {
					theme: {
						'--toastColor': 'mintcream',
						'--toastBackground': 'rgba(72,187,120,0.9)',
						'--toastBarBackground': '#2F855A'
					}
				});
			}
			update();
			isLoading = false;
		};
	};
	export let data: PageData;
	export let form: FormData;
	let isUploading = false;
</script>

<div class={cn('grid gap-6', className)} {...$$restProps}>
	<h2
		class="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
	>
		Profile Image
	</h2>
	<p class="leading-7 [&:not(:first-child)]:mt-6">Upload your Profile Image here</p>
	<form method="post" action="?/uploadProfileImage" enctype="multipart/form-data">
		<div class="grid gap-1">
			<Label for="password">Profile Image</Label>
			<Input
				name="profileImage"
				type="file"
				autocapitalize="none"
				autocomplete="password"
				autocorrect="off"
				required
				accept="image/png, image/jpeg, image/jpg"
			/>
		</div>

		<Button class="mt-2" type="submit">
			{#if isLoading}
				<Icon icon="line-md:isLoading-twotone-loop" />
			{/if}
			Upload Profile Image
		</Button>
		{#if errorMessage}
			<Alert.Root>
				<Alert.Title>Error</Alert.Title>
				<Alert.Description>{errorMessage}</Alert.Description>
			</Alert.Root>
		{/if}
	</form>
	<div class="grid gap-2">
		<div class="grid gap-1">
			<Label for="email">First Name</Label>
			<Input
				disabled
				name="firstName"
				placeholder="name@example.com"
				type="text"
				autocapitalize="none"
				autocomplete="firstName"
				autocorrect="off"
				required
				value={data?.user?.firstName}
			/>
		</div>
		<div class="grid gap-1">
			<Label for="email">Last Name</Label>
			<Input
				disabled
				value={data?.user?.lastName}
				name="lastName"
				placeholder="name@example.com"
				type="text"
				autocapitalize="none"
				autocomplete="lastName"
				autocorrect="off"
				required
			/>
		</div>
		<div class="grid gap-1">
			<Label for="email">Email</Label>
			<Input
				disabled
				value={data?.user?.email}
				name="email"
				placeholder="name@example.com"
				type="email"
				autocapitalize="none"
				autocomplete="email"
				autocorrect="off"
				required
			/>
		</div>
		<form method="post" action="?/changePassword" use:enhance={onSubmit}>
			<div class="grid gap-1">
				<Label for="password">Old Password</Label>
				<Input
					name="oldPassword"
					type="password"
					autocapitalize="none"
					autocomplete="password"
					autocorrect="off"
					required
				/>
			</div>
			<div class="grid gap-1">
				<Label for="New Password">New Password</Label>
				<Input
					name="newPassword"
					type="password"
					autocapitalize="none"
					autocomplete="New Password"
					autocorrect="off"
					required
				/>
			</div>
			<Button class="mt-2" type="submit" disabled={isLoading}>
				{#if isLoading}
					<Icon icon="line-md:isLoading-twotone-loop" />
				{/if}
				Change Password
			</Button>
			{#if errorMessage}
				<Alert.Root>
					<Alert.Title>Error</Alert.Title>
					<Alert.Description>{errorMessage}</Alert.Description>
				</Alert.Root>
			{/if}
		</form>
	</div>
</div>

<!--
<form
method="post"
action="?/uploadPassport"
enctype="multipart/form-data"
class="flex gap-3 flex-wrap"
>
<div class="card-body">
	<div class="col-6">
	
		<label class="form-label">Passport front</label>
		<input
			type="file"
			class="form-control"
			name="passportFront"
			required
			accept="image/png, image/jpeg, image/jpg"
		/>
	</div>
	<div class="col-6">
	
		<label class="form-label">Passport Back</label>
		<input
			type="file"
			class="form-control"
			name="passportBack"
			required
			accept="image/png, image/jpeg, image/jpg"
		/>
	</div>
</div>
<div class="text-start m-4 mb-4 mt-2">
	<button type="submit" class="btn btn-primary px-4">Upload Passport</button>
</div>
</form>-->
