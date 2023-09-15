<script>
	const PROJECTS = [
		{
			name: 'Project 1',
			descriptions: 'This was Project 1',
			imageUrl: '/landing/me.jpeg',
			technologies: ['React', 'Svelte', 'Vue']
		},
		{
			name: 'Project 2',
			descriptions: 'This was Project 2',
			imageUrl: '/landing/me.jpeg',
			technologies: ['React', 'Svelte', 'Vue']
		},
		{
			name: 'Project 3',
			descriptions: 'This was Project 3',
			imageUrl: '/landing/me.jpeg',
			technologies: ['React', 'Svelte', 'Vue']
		}
	];
</script>

<h1 class="text-6xl">Projects</h1>

<div
	class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5"
>
	{#each PROJECTS as project}
		<!--Card 1-->
		<div class="rounded overflow-hidden shadow-lg">
			<img class="w-full" src="/landing/me.jpeg" alt="Mountain" />
			<div class="px-6 py-4">
				<div class="font-bold text-xl mb-2">{project.name}</div>
				<p class="text-gray-700 text-base">
					{project.descriptions}
				</p>
			</div>
			<div class="px-6 pt-4 pb-2">
				{#each project.technologies as technology}
					<span
						class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
						>{technology}</span
					>
				{/each}
			</div>
		</div>
	{/each}
</div>
