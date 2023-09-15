<script lang="ts">
	import MainNav from '../../../components/MainNav.svelte';

	import UserNav from '../../../components/UserNav.svelte';
	import type { PageData } from './$types';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	export let data: PageData;
</script>

<SvelteToast />
<div class="hidden flex-col md:flex">
	<div class="border-b">
		<div class="flex h-16 items-center px-4">
			<MainNav class="mx-6" />
			<div class="ml-auto flex items-center space-x-4">
				<UserNav
					profileImage={data?.user?.profileImage}
					firstName={data?.user?.firstName}
					lastName={data?.user?.lastName}
					email={data?.user?.email}
					isAdmin={data?.user?.role == 'ADMIN'}
				/>
			</div>
		</div>
	</div>
	<div class="flex-1 space-y-4 p-8 pt-6">
		<slot />
	</div>
</div>
