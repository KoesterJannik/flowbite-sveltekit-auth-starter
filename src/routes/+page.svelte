<script lang="ts">
	import AboutMe from '../components/landing/AboutMe.svelte';
	import Contact from '../components/landing/Contact.svelte';
	import Footer from '../components/landing/Footer.svelte';
	import Heading from '../components/landing/Heading.svelte';
	import Navbar from '../components/landing/Navbar.svelte';
	import Projects from '../components/landing/Projects.svelte';
</script>

<div class="content min-h-screen p-6">
	<Navbar />
	<Heading />
	<AboutMe />
	<Projects />
	<Contact />
	<Footer />
</div>

<style>
	.content {
		background-color: #1a1d3c;
	}
</style>
