<script lang="ts">
	import { cn } from '$lib/utils';

	import { page } from '$app/stores';
	let className: string | undefined | null = undefined;
	export { className as class };

	const LINKS = [
		{
			name: 'Dashboard',
			to: '/protected/dashboard'
		},
		{
			name: 'Projects',
			to: '/protected/projects'
		}
	];
</script>

<nav class={cn('flex items-center space-x-4 lg:space-x-6', className)}>
	{#each LINKS as { name, to }}
		<a
			href={to}
			class={`text-sm font-medium
			${$page.url.pathname == to ? '' : 'text-muted-foreground'}
			
			 transition-colors hover:text-primary`}
		>
			{name}
		</a>
	{/each}
</nav>
