<script lang="ts">
    import { z } from "zod";

    const StateSchema = z.object({
        count: z.number(),
        incremental: z.number().min(0)
    });

    let pageState = $state({
        count: 0,
        incremental: 1
    });

    import { toolState } from "$lib/state/state.svelte";
    import { onMount } from "svelte";

    onMount(() => {
        toolState.current = 'counter';
    });
</script>

<svelte:head>
    <title>カウンター | moizlu</title>
</svelte:head>

<main class="mx-auto px-5 w-full max-w-150 h-full min-h-svh overflow-y-auto flex-col-center overflow-x-clip">
    <h1></h1>
</main>
