<script lang="ts">
	import Board from '../../../../../../components/dnd/customer/Board.svelte';

	import type { PageData } from './$types';
	export let data: PageData;
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
</script>

<div class="space-y-2">
	<h2 class="text-3xl font-bold tracking-tight">Projects</h2>
	<p class="text-sm">You can see the progress of your project here</p>
</div>

<Board columnItems={board} />
