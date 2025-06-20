<script lang="ts">
    import type { HTMLButtonAttributes } from 'svelte/elements';

    import { getTheme, setTheme } from '$lib/components/utils/theme.svelte';
    import Icon from '../Icon/Icon.svelte';

    interface Props extends HTMLButtonAttributes {}

    const props = $props();

    const onclick = () => {
        setTheme(getTheme() === "dark" ? "light" : "dark");
    }
</script>

<button {onclick} {...props}>
    <Icon lightSrc="/icons/light/theme.svg" darkSrc="/icons/dark/theme.svg" width={30} class="m-5 drop-shadow-primary drop-shadow-md" />
</button>
