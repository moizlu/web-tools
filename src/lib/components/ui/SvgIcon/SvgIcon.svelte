<script lang="ts">
    import type { ClassValue } from "svelte/elements";

    import type { SvgComponent } from "$lib/types";

    export interface Props {
        Svg: SvgComponent;
        size: number;
        class?: ClassValue;
    }
    const { Svg, size, class: className }: Props = $props();
</script>

<Svg {size} class={[className, "transition-all duration-300 fill-current"]} />
