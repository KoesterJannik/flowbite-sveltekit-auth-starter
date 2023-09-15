<script lang="ts">
	import Icon from '@iconify/svelte';
	import { flip } from 'svelte/animate';
	import { quintOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';

	type currentlySelected = 'myself' | 'education' | 'skill';
	let currentlySelected: currentlySelected = 'skill';

	type TimeLine = {
		year: string;
		title: string;
		description: string;
		color: string;
	};
	const timeLine = [
		{
			year: 'Jul 2019',
			title: 'Key Account Assistant Borbet Group',
			description:
				'Before I studient computer science I did something completely different and worked as a Key Account Assistant at Borbet Group',
			color: '--accent-color:#1B5F8C'
		},
		{
			year: 'Okt. 2020',
			title: 'Student at Fachhochschule Südwestfalen',
			description:
				'Until now I am studying Business Information Systems at the University of Applied Sciences in Meschede.',
			color: '--accent-color:#41516C'
		},

		{
			year: 'Mrz 2021',
			title: 'Working Student S&N Invent',
			description: 'I started my first working student job and worked a lot with python.',
			color: '--accent-color:#E24A68'
		},
		{
			year: 'Mrz. 2023',
			title: 'Working Student CGI Bochum',
			description:
				'After that i changed my working student job and started working at CGI in Bochum. I was working with Ruby on Rails',
			color: '--accent-color:#FBCA3E'
		},

		{
			year: 'Today',
			title: 'Backend Developer at LeoQuantum',
			description: '',
			color: '--accent-color:#4CADAD'
		}
	];

	type Skill = {
		name: string;
		icon: string;
	};
	const SKILLS: Skill[] = [
		{
			name: 'React',
			icon: 'akar-icons:react-fill'
		},
		{
			name: 'Svelte',
			icon: 'simple-icons:svelte'
		},
		{
			name: 'MongoDB',
			icon: 'cib:mongodb'
		},
		{
			name: 'NextJS',
			icon: 'file-icons:nextjs'
		},
		{
			name: 'Wordpress',
			icon: 'mdi:wordpress'
		},
		{
			name: 'Shopify',
			icon: 'ic:twotone-shopify'
		},
		{
			name: 'Express',
			icon: 'devicon:express'
		}
	];
</script>

<div class="block md:flex gap-12 md:gap-4">
	<div class="w-full md:w-1/2 text-center">
		<img src="/landing/me.jpeg" class="rounded-sm md:rounded-none w-full h-full" alt="me" />
	</div>

	<div class="w-full md:w-1/2">
		<h1 class="text-5xl font-bold text-white text-center mb-3">About me</h1>
		<div class="actions flex gap-3 text-white py-6">
			<button
				on:click={() => (currentlySelected = 'myself')}
				class:active={currentlySelected === 'myself'}
				class="transition-all toggler hover:text-orange-400 text-white"
			>
				Myself
			</button>

			<button
				on:click={() => (currentlySelected = 'education')}
				class:active={currentlySelected === 'education'}
				class="transition-all toggler hover:text-orange-400 text-white"
			>
				Education
			</button>

			<button
				on:click={() => (currentlySelected = 'skill')}
				class:active={currentlySelected === 'skill'}
				class="transition-all toggler hover:text-orange-400 text-white"
			>
				Skill
			</button>
		</div>

		<div class="content text-white">
			{#if currentlySelected == 'myself'}
				<div>
					My name is Jannik Köster an I am a Developer from Germany,North Rhine-Westphalia. I am 25
					years old and I am currently studying Business Information Systems at the University of
					Applied Sciences in Meschede. Besides that I am working as Backend Developer at LeoQuantum
				</div>
			{:else if currentlySelected == 'education'}
				<div>
					<h1>Education</h1>
					<ul>
						{#each timeLine as { year, title, description, color }}
							<li style={color}>
								<div class="date">{year}</div>
								<div class="title">{title}</div>
								<div class="hidden lg:block descr">{description}</div>
							</li>
						{/each}
					</ul>
				</div>
			{:else if currentlySelected == 'skill'}
				<div class="flex flex-wrap gap-5 px-8">
					{#each SKILLS as skill, i}
						<div id="skill" style="animation-delay: {i * 0.3}s; opacity: 0;">
							<Icon
								class="w-24 h-24 transition-all hover:text-orange-500 cursor-pointer"
								icon={skill.icon}
							/>
						</div>
					{/each}
				</div>
			{/if}
		</div>

		<div class="cta flex gap-4 py-8">
			<button class=" cta-button">Download CV</button>
			<button class="cta-button">Hire Me</button>
		</div>
	</div>
</div>

<style lang="postcss">
	@keyframes fly-in {
		0% {
			transform: translateX(-100%);
			opacity: 0;
		}
		100% {
			transform: translateX(0);
			opacity: 1;
		}
	}

	.flex > #skill {
		animation: fly-in 0.5s ease-in-out forwards;
	}
	.active {
		color: orange;
		text-decoration: underline;
	}

	*,
	*::before,
	*::after {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	body {
		--color: rgba(30, 30, 30);
		--bgColor: rgba(245, 245, 245);
		min-height: 100vh;
		display: grid;
		align-content: center;
		gap: 2rem;
		padding: 2rem;
		font-family: 'Poppins', sans-serif;
		color: var(--color);
		background: var(--bgColor);
	}

	h1 {
		text-align: center;
	}

	ul {
		--col-gap: 2rem;
		--row-gap: 2rem;
		--line-w: 0.25rem;
		display: grid;
		grid-template-columns: var(--line-w) 1fr;
		grid-auto-columns: max-content;
		column-gap: var(--col-gap);
		list-style: none;
		width: min(60rem, 90%);
		margin-inline: auto;
	}

	/* line */
	ul::before {
		content: '';
		grid-column: 1;
		grid-row: 1 / span 20;
		background: rgb(225, 225, 225);
		border-radius: calc(var(--line-w) / 2);
	}

	/* columns*/

	/* row gaps */
	ul li:not(:last-child) {
		margin-bottom: var(--row-gap);
	}

	/* card */
	ul li {
		grid-column: 2;
		--inlineP: 1.5rem;
		margin-inline: var(--inlineP);
		grid-row: span 2;
		display: grid;
		grid-template-rows: min-content min-content min-content;
	}

	/* date */
	ul li .date {
		--dateH: 3rem;
		height: var(--dateH);
		margin-inline: calc(var(--inlineP) * -1);

		text-align: center;
		background-color: var(--accent-color);

		color: white;
		font-size: 1.25rem;
		font-weight: 700;

		display: grid;
		place-content: center;
		position: relative;

		border-radius: calc(var(--dateH) / 2) 0 0 calc(var(--dateH) / 2);
	}

	/* date flap */
	ul li .date::before {
		content: '';
		width: var(--inlineP);
		aspect-ratio: 1;
		background: var(--accent-color);
		background-image: linear-gradient(rgba(0, 0, 0, 0.2) 100%, transparent);
		position: absolute;
		top: 100%;

		clip-path: polygon(0 0, 100% 0, 0 100%);
		right: 0;
	}

	/* circle */
	ul li .date::after {
		content: '';
		position: absolute;
		width: 2rem;
		aspect-ratio: 1;
		background: var(--bgColor);
		border: 0.3rem solid var(--accent-color);
		border-radius: 50%;
		top: 50%;

		transform: translate(50%, -50%);
		right: calc(100% + var(--col-gap) + var(--line-w) / 2);
	}

	/* title descr */
	ul li .title,
	ul li .descr {
		background: var(--bgColor);
		position: relative;
		padding-inline: 1.5rem;
	}
	ul li .title {
		overflow: hidden;
		padding-block-start: 1.5rem;
		padding-block-end: 1rem;
		font-weight: 500;
	}
	ul li .descr {
		padding-block-end: 1.5rem;
		font-weight: 300;
	}

	/* shadows */
	ul li .title::before,
	ul li .descr::before {
		content: '';
		position: absolute;
		width: 90%;
		height: 0.5rem;
		background: rgba(0, 0, 0, 0.5);
		left: 50%;
		border-radius: 50%;
		filter: blur(4px);
		transform: translate(-50%, 50%);
	}
	ul li .title::before {
		bottom: calc(100% + 0.125rem);
	}

	ul li .descr::before {
		z-index: -1;
		bottom: 0.25rem;
	}

	@media (min-width: 40rem) {
		ul {
			grid-template-columns: 1fr var(--line-w) 1fr;
		}
		ul::before {
			grid-column: 2;
		}
		ul li:nth-child(odd) {
			grid-column: 1;
		}
		ul li:nth-child(even) {
			grid-column: 3;
		}

		/* start second card */
		ul li:nth-child(2) {
			grid-row: 2/4;
		}

		ul li:nth-child(odd) .date::before {
			clip-path: polygon(0 0, 100% 0, 100% 100%);
			left: 0;
		}

		ul li:nth-child(odd) .date::after {
			transform: translate(-50%, -50%);
			left: calc(100% + var(--col-gap) + var(--line-w) / 2);
		}
		ul li:nth-child(odd) .date {
			border-radius: 0 calc(var(--dateH) / 2) calc(var(--dateH) / 2) 0;
		}
	}
</style>
