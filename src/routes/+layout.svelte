<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	import { theme } from '$lib/state';
	theme.theme;

	import ToastEntryPoint from '$lib/components/ui/Toast/ToastEntryPoint.svelte';

	import Header from '$lib/components/sections/Header';
	import Footer from '$lib/components/sections/Footer';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />

	<meta property="og:url" content="https://moizlu.com/" />
	<meta property="og:type" content="profile" />
	<meta property="og:title" content="Webツール | moizlu" />
	<meta property="og:image" content="https://moizlu.com/ogp.png" />
	<meta property="og:site_name" content="Webツール | moizlu" />
	<meta property="og:description" content="Webツール | moizlu" />

	<!-- <meta http-equiv="content-security-policy" content="
		default-src 'self';
		script-src 'self' https://challenges.cloudflare.com https://static.cloudflareinsights.com 'unsafe-inline';
		style-src 'self' https://fonts.googleapis.com 'unsafe-inline';
		font-src 'self' https://fonts.gstatic.com;
		frame-src 'self' https://challenges.cloudflare.com;
		img-src 'self' data: https:;
	"> -->

	<title>Webツール | moizlu</title>
</svelte:head>

<ToastEntryPoint />

<Header />
<div class="w-full min-h-svh py-12.5">
	{@render children()}
</div>
<Footer />
