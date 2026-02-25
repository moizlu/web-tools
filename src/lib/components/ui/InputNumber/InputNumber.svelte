<script lang="ts">
    import PlusIcon from "$lib/assets/icons/plus.svelte";
    import MinusIcon from "$lib/assets/icons/minus.svelte";

    import type { HTMLInputAttributes } from "svelte/elements";

    import SvgIcon from "../SvgIcon";

    interface Props extends Omit<HTMLInputAttributes, 'type'> {
        value: number;
        incremental?: number;
        onValueChange?: ((element: HTMLInputElement) => void);
    }
    let { value = $bindable(0), incremental = 1, onValueChange, ...props }: Props = $props();

    let element: HTMLInputElement | undefined = undefined;

    $effect(() => {
        if (!element) { return; }
        onValueChange?.(element);
    })
</script>

<div class="flex-center gap-2">
    <input type="number" bind:this={element} bind:value={value} {...props}>
    <div class="flex-center">
        <button title="increment" onclick={() => value += incremental} class="cursor-pointer">
            <SvgIcon Svg={PlusIcon} size={30} />
        </button>
        <button title="decrement" onclick={() => value -= incremental} class="cursor-pointer">
            <SvgIcon Svg={MinusIcon} size={30} />
        </button>
    </div>
</div>

