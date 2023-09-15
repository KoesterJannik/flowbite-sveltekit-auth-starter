<script lang="ts">
	// This is done in a single file for clarity. A more factored version here: https://svelte.dev/repl/288f827275db4054b23c437a572234f6?version=3.38.2
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';
	export let columnItems: any;
	const flipDurationMs = 200;
	function handleDndConsiderColumns(e: any) {
		columnItems = e.detail.items;
		console.log('Consider cols');
	}
	function handleDndFinalizeColumns(e: any) {
		columnItems = e.detail.items;
		console.log('Finalize cols');
	}
	function handleDndConsiderCards(cid: any, e: any) {
		const colIdx = columnItems.findIndex((c: any) => c.id === cid);
		columnItems[colIdx].items = e.detail.items;
		columnItems = [...columnItems];
		console.log('Consider cards');
	}

	async function updateColumnItems(colIdx: any, items: any) {
		const colId = columnItems[colIdx].id;
		const res = await fetch(`/api/columns/${colId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ items })
		});
		const data = await res.json();
		console.log(data);
		return data;
	}
	async function updateTaskname(taskId: any, name: any) {
		const res = await fetch(`/api/tasks/${taskId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name })
		});
		const data = await res.json();
		console.log(data);
		window.location.reload();
		return data;
	}
	function handleDndFinalizeCards(cid: any, e: any) {
		let hasColChanged = false;
		const colIdx = columnItems.findIndex((c: any) => c.id === cid);
		if (colIdx !== e.detail.originalSourceColumnIdx) {
			hasColChanged = true;
			console.log('Card has changed column');
			console.log("New column's id is " + cid);
		}
		columnItems[colIdx].items = e.detail.items;
		const updatedColItems = updateColumnItems(colIdx, e.detail.items);

		columnItems = [...columnItems];
	}
	async function handleClick(e: any) {
		const oldTaskName = e.target.innerText;
		const taskId = e.target.id;
		console.log(taskId);
		const wantToDeleteTask = confirm('Do you want to delete this task?');
		if (wantToDeleteTask) {
			await fetch(`/api/tasks/${taskId}`, {
				method: 'DELETE'
			});
			window.location.reload();
			return;
		}
		const newTaskName = prompt('Enter new task name', oldTaskName);
		if (!newTaskName) return;
		console.log(newTaskName);
		updateTaskname(taskId, newTaskName);
		//alert('dragabble elements are still clickable :)');
	}
</script>

<section
	class="board"
	use:dndzone={{ items: columnItems, flipDurationMs, type: 'columns' }}
	on:consider={handleDndConsiderColumns}
	on:finalize={handleDndFinalizeColumns}
>
	{#each columnItems as column (column.id)}
		<div class="column" animate:flip={{ duration: flipDurationMs }}>
			<div class="column-title">
				{column.name}
			</div>
			<div
				class="column-content"
				use:dndzone={{ items: column.items, flipDurationMs }}
				on:consider={(e) => handleDndConsiderCards(column.id, e)}
				on:finalize={(e) => handleDndFinalizeCards(column.id, e)}
			>
				{#each column.items as item (item.id)}
					<div
						class="card"
						id={item.id}
						animate:flip={{ duration: flipDurationMs }}
						on:click={handleClick}
					>
						{item.name}
					</div>
				{/each}
			</div>
		</div>
	{/each}
</section>

<style>
	.board {
		height: 90vh;
		width: 100%;
		padding: 0.5em;
		margin-bottom: 40px;
	}
	.column {
		height: 100%;
		width: 250px;
		padding: 0.5em;
		margin: 1em;
		float: left;
		border: 1px solid #333333;
		/*Notice we make sure this container doesn't scroll so that the title stays on top and the dndzone inside is scrollable*/
		overflow-y: hidden;
	}
	.column-content {
		height: 100%;
		/* Notice that the scroll container needs to be the dndzone if you want dragging near the edge to trigger scrolling */
		overflow-y: scroll;
	}
	.column-title {
		margin-bottom: 1em;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.card {
		height: 15%;
		width: 100%;
		margin: 0.4em 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #dddddd;
		border: 1px solid #333333;
	}
</style>
