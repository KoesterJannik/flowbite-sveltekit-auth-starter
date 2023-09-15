<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import Icon from '@iconify/svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
	{#if data.customerProjects.length == 0}
		<p>No projects yet</p>
	{:else}
		{#each data.customerProjects as project}
			<Card.Root>
				<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
					<Card.Title class="text-sm font-medium">{project.name}</Card.Title>
				</Card.Header>
				<Card.Content>
					<div class="text-2xl font-bold">
						{project.description}
						<a href={`/protected/projects/${project.id}`} class="text-blue-500 hover:text-blue-600"
							>View project</a
						>
					</div>
				</Card.Content>
			</Card.Root>
		{/each}
	{/if}
</div>
