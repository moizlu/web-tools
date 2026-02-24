<script lang="ts">
    import StudyIcon from "$lib/assets/icons/study.svelte";
    import CounterIcon from "$lib/assets/icons/counter.svelte";

    import type { SvgComponent, ToolName } from "$lib/types";
    import SvgIcon from "$lib/components/ui/SvgIcon";
    import { onMount } from "svelte";
    import { toolState } from "$lib/state/state.svelte";

    interface Tool {
        name: string;
        url: ToolName;
        icon: SvgComponent;
    }

    const tools: Tool[] = [
        { name: "ポモドーロタイマー", url: "pomodoro", icon: StudyIcon },
        { name: "カウンター", url: "counter", icon: CounterIcon }
    ];

    onMount(() => {
        toolState.current = undefined;
    })
</script>

<svelte:head>
    <title>Webツール | moizlu</title>
</svelte:head>

<main class="px-5 mx-auto w-full max-w-100 h-full min-h-svh flex-col-center gap-5">
    {#each tools as tool}
        <a href={tool.url} class="w-full p-2 flex-center button-general text-2xl">
            <SvgIcon Svg={tool.icon} size={40} class="" />
            <p class="flex-1 text-center text-sm sm:text-2xl">{`${tool.name.slice(0, 1).toUpperCase()}${tool.name.slice(1)}`}</p>
        </a>
    {/each}
</main>
