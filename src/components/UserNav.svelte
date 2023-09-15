<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';
	export let firstName: string = '';
	export let lastName: string = '';
	export let email: string = '';
	export let isAdmin: boolean = false;
	export let profileImage: string = '';

	import { goto } from '$app/navigation';
</script>

<DropdownMenu.Root positioning={{ placement: 'bottom-end' }}>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="ghost" builders={[builder]} class="relative h-8 w-8 rounded-full">
			<Avatar.Root class="h-8 w-8">
				<Avatar.Image src={profileImage} alt="@shadcn" />
				<Avatar.Fallback>SC</Avatar.Fallback>
			</Avatar.Root>
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56">
		<DropdownMenu.Label class="font-normal">
			<div class="flex flex-col space-y-1">
				<p class="text-sm font-medium leading-none">{firstName} {lastName}</p>
				<p class="text-xs leading-none text-muted-foreground">{email}</p>
			</div>
		</DropdownMenu.Label>
		<DropdownMenu.Separator />
		<DropdownMenu.Group>
			<DropdownMenu.Item on:click={() => goto('/protected/profile')}>Profile</DropdownMenu.Item>
		</DropdownMenu.Group>
		{#if isAdmin}
			<DropdownMenu.Separator />
			<DropdownMenu.Group>
				<DropdownMenu.Item on:click={() => goto('/protected/admin')}>Admin Area</DropdownMenu.Item>
			</DropdownMenu.Group>
			<DropdownMenu.Group>
				<DropdownMenu.Item on:click={() => goto('/protected/admin/invoices')}
					>Invoice</DropdownMenu.Item
				>
			</DropdownMenu.Group>
		{/if}
		<DropdownMenu.Separator />
		<DropdownMenu.Item on:click={() => goto('/protected/logout')}>
			Log out
			<DropdownMenu.Shortcut>⇧⌘Q</DropdownMenu.Shortcut>
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
