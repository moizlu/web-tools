<script lang="ts">
    import PlusIcon from "$lib/assets/icons/plus.svelte";
    import MinusIcon from "$lib/assets/icons/minus.svelte";
    import ResetIcon from "$lib/assets/icons/reset.svelte";

    import { onMount } from "svelte";
    import { z } from "zod";

    import SvgIcon from "$lib/components/ui/SvgIcon";
    import InputNumber from "$lib/components/ui/InputNumber";
    import { toolState } from "$lib/state/state.svelte";
    import { copyExistsProps, loadSavedData } from "$lib/utils";
    import { toast } from "$lib/components/ui/Toast";

    const StateSchema = z.object({
        count: z.number(),
        incremental: z.number().min(1)
    });

    let pageState = $state({
        count: 0,
        incremental: 1
    });

    let inputValues = $state({
        incremental: 1
    });

    const onNumberChange = () => {
        if (inputValues.incremental < 1) {
            inputValues.incremental = 1;
            toast.push({ text: "増分の値は1以上である必要があります。" });
        }
        pageState.incremental = inputValues.incremental;
    }

    onMount(() => {
        toolState.current = 'counter';

        pageState = loadSavedData('counter', pageState, StateSchema);
        inputValues = copyExistsProps(pageState, inputValues);
    });

    $effect(() => {
        localStorage.setItem('counterState', JSON.stringify(pageState));
    });
</script>

<svelte:head>
    <title>カウンター | moizlu</title>
</svelte:head>

<main class="mx-auto px-5 w-full max-w-150 h-full min-h-svh overflow-y-auto flex-col-center overflow-x-clip border-label">
    <h1 class="m-2 p-2 w-full text-right count-text border rounded-xl">{pageState.count}</h1>

    <p class="text-xl">増分</p>
    <InputNumber bind:value={inputValues.incremental} onValueChange={onNumberChange} class="w-30 text-right" />

    <div class="mt-10 flex-center">
        <button title="+" onclick={() => pageState.count += pageState.incremental} class="mr-10 cursor-pointer rounded-full border-2">
            <SvgIcon Svg={PlusIcon} size={80} />
        </button>
        <button title="-" onclick={() => pageState.count += pageState.incremental} class="mr-3 cursor-pointer rounded-full border-2">
            <SvgIcon Svg={MinusIcon} size={80} />
        </button>

        <button title="reset" onclick={() => pageState.count = 0} class="cursor-pointer rounded-full border-2">
            <SvgIcon Svg={ResetIcon} size={60} />
        </button>
    </div>
</main>

<style>
    @reference "../layout.css";

    .count-text {
        font-size: clamp(10px, 25cqw, 30px);
    }
</style>
