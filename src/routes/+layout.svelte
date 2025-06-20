<script lang="ts">
	import '../app.css';

	import { initTheme } from '$lib/components/utils/theme.svelte';

	import Header from '$lib/components/parts/Header/Header.svelte'
	import Footer from '$lib/components/parts/Footer/Footer.svelte';

	let { children } = $props();

	initTheme();
</script>

<svelte:head>
	<title>ツール集 | もいずる</title>
</svelte:head>

<Header />
{@render children()}
<Footer />
