<script>
	import Icon from '@iconify/svelte';

	const LINKS = [
		{
			name: 'Home',
			href: '/'
		},
		{
			name: 'Customers',
			href: '/about'
		},
		{
			name: 'Contact',
			href: '/contact'
		}
	];
</script>

<nav class="flex gap-4 justify-end items-center text-white font-semibold p-2">
	<div class="links flex gap-4">
		{#each LINKS as link}
			<a href={link.href}>{link.name}</a>
		{/each}
	</div>
	<div class="social-icons flex gap-2">
		<Icon class="w-8 h-8 text-gray-600" icon="ant-design:linkedin-filled" />
		<Icon class="text-gray-600 w-8 h-8" icon="ic:twotone-discord" />
	</div>
</nav>

<style>
	.links a {
		position: relative;
	}

	.links a:after {
		content: '';
		position: absolute;
		bottom: -2px;
		left: 0;
		width: 100%;
		height: 2px;
		background-color: transparent;
		transition: background-color 0.2s ease-in-out;
	}

	.links a:hover:after {
		background-color: orange;
	}
</style>
