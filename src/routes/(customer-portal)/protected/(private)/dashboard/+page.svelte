<script lang="ts">
	import Icon from '@iconify/svelte';

	import { Tabs } from 'bits-ui';
	import * as Card from '$lib/components/ui/card';
</script>

<div class="flex items-center justify-between space-y-2">
	<h2 class="text-3xl font-bold tracking-tight">Dashboard</h2>
</div>
<Tabs.Root value="overview" class="space-y-4">
	<Tabs.List>
		<Tabs.Trigger value="overview">Overview</Tabs.Trigger>
	</Tabs.List>
	<Tabs.Content value="overview" class="space-y-4">
		<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
			<Card.Root>
				<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
					<Card.Title class="text-sm font-medium">Total Revenue</Card.Title>
					<Icon icon="mdi-light:home" class="mr-2 h-4 w-4" />
				</Card.Header>
				<Card.Content>
					<div class="text-2xl font-bold">$45,231.89</div>
					<p class="text-xs text-muted-foreground">+20.1% from last month</p>
				</Card.Content>
			</Card.Root>
		</div>
	</Tabs.Content>
</Tabs.Root>
