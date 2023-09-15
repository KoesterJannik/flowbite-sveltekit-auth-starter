<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { DarkMode, Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
	import { Cog, Link } from 'svelte-heros-v2';

	import { Footer, FooterCopyright, FooterLinkGroup, FooterLink } from 'flowbite-svelte';

	let breakPoint: number = 1024;
	let width: number;

	let activateClickOutside = true;
	let drawerHidden: boolean = false;
	$: if (width >= breakPoint) {
		drawerHidden = false;
		activateClickOutside = false;
	} else {
		drawerHidden = true;
		activateClickOutside = true;
	}
	onMount(() => {
		if (width >= breakPoint) {
			drawerHidden = false;
			activateClickOutside = false;
		} else {
			drawerHidden = true;
			activateClickOutside = true;
		}
	});

	const navLinks = [
		{
			path: '/login',
			name: 'Login'
		},
		{
			path: '/register',
			name: 'Register'
		}
	];
	$: activeUrl = $page.url.pathname;
	console.log($page.url.pathname);
	let spanClass = 'pl-2 self-center text-md text-gray-900 whitespace-nowrap dark:text-white';
	let divClass = 'w-full ml-auto lg:block lg:w-auto order-1 lg:order-none';
	let ulClass =
		'flex flex-col py-3 my-4 lg:flex-row lg:my-0 text-sm font-medium gap-4 dark:lg:bg-transparent lg:bg-white lg:border-0';
	let navDivClass =
		'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 divide-gray-200 dark:divide-gray-700 flex items-center justify-between w-full mx-auto py-1.5 px-4';
</script>

<svelte:window bind:innerWidth={width} />
<header class="flex-none w-full mx-auto bg-white dark:bg-slate-950">
	<Navbar let:hidden let:toggle>
		<NavBrand href="/" class="lg:ml-64">
			<Cog />
			<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white pl-4">
				Starter Template
			</span>
		</NavBrand>
		<NavUl {hidden} {divClass} {ulClass} {activeUrl}>
			{#each navLinks as link}
				<NavLi class="lg:px-2 lg:mb-0" href={link.path}>{link.name}</NavLi>
			{/each}
		</NavUl>
		<div class="flex items-center ml-auto">
			<DarkMode class="inline-block dark:hover:text-white hover:text-gray-900" />
		</div>
		<NavHamburger on:click={toggle} btnClass="lg:hidden" />
	</Navbar>
</header>

<div class="flex px-4 mx-auto w-full">
	<main class="lg:ml-72 w-full mx-auto">
		<slot />
	</main>
</div>
<Footer class="absolute bottom-0 left-0 z-20 w-full">
	<FooterCopyright href="/" by="Flowbite™" year={2022} />
	<FooterLinkGroup
		ulClass="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0"
	>
		<FooterLink href="/">About</FooterLink>
		<FooterLink href="/">Privacy Policy</FooterLink>
		<FooterLink href="/">Licensing</FooterLink>
		<FooterLink href="/">Contact</FooterLink>
	</FooterLinkGroup>
</Footer>
