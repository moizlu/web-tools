<script lang="ts">
    import { onMount } from "svelte";

    import { z } from "zod";

    import { toolState } from "$lib/state/state.svelte";
    import { loadSavedData } from "$lib/utils";

    let now = $state(new Date());

    let StateSchema = z.object({
        is12h: z.boolean()
    });

    let pageState = $state({
        is12h: false
    });

    const getDayOfTheWeek = (val: number) => {
        return ["日", "月", "火", "水", "木", "金", "土", "日"][val];
    }

    const getFormattedHours = (hour: number) => {
        if (hour <= 12) {
            return (pageState.is12h) ? `午前${hour}` : `${hour}`;
        } else {
            return (pageState.is12h) ? `午後${hour - 12}` : `${hour}`;
        }
    }

    onMount(() => {
        toolState.current = 'clock';

        pageState = loadSavedData('clock', pageState, StateSchema);

        const updateTimerId = setInterval(() => {
            now = new Date();
        }, 100);

        return () => {
            clearInterval(updateTimerId);
        };
    });

    $effect(() => {
        localStorage.setItem('clockState', JSON.stringify(pageState));
    });
</script>

<svelte:head>
    <title>時計 | moizlu</title>
</svelte:head>

<main class="mx-auto px-5 w-full max-w-full h-full min-h-svh overflow-y-auto flex-col-center overflow-x-clip">
    <h1 class="clock-text">{`${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日${getDayOfTheWeek(now.getDay())}曜日`}</h1>
    <h1 class="clock-text">{`${getFormattedHours(now.getHours()).padStart(2, '0')}時${`${now.getMinutes()}`.padStart(2, '0')}分${`${now.getSeconds()}`.padStart(2, '0')}秒`}</h1>
    <p class="text-xs m-2">※デバイスの時間です。</p>

    <button onclick={() => pageState.is12h = !pageState.is12h} class="p-4 button-general">
        <p class="text-xl sm:text-4xl">{(pageState.is12h) ? "12時間" : "24時間"}表記</p>
    </button>
</main>

<style>
    @reference "../layout.css";

    .clock-text {
        font-size: clamp(10px, 8cqw, 150px);
    }
</style>
