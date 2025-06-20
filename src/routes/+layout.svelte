<script lang="ts">
	import '../app.css';

	import { initTheme } from '$lib/components/utils/theme.svelte';

	import Header from '$lib/components/parts/Header/Header.svelte'
	import Footer from '$lib/components/parts/Footer/Footer.svelte';

	let { children } = $props();

	initTheme();
</script>

<svelte:head>
	<meta property="og:url" content="https://tools.moizlu.com/" />
	<meta property="og:type" content="profile" />
	<meta property="og:title" content="ツール集 | もいずる" />
	<meta property="og:image" content="https://tools.moizlu.com/ogp.png" />
	<meta property="og:site_name" content="ツール集 | もいずる" />
	<meta property="og:description" content="ツール集" />

	<title>ツール集 | もいずる</title>
</svelte:head>

<Header />
{@render children()}
<Footer />
