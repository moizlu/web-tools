<script lang="ts">
    import type { HTMLImgAttributes } from "svelte/elements";

    interface Props extends Omit<HTMLImgAttributes, "src"> {
        lightSrc: string;
        darkSrc: string;
        isInvert?: boolean;
    }
    const { lightSrc, darkSrc, isInvert=false, class: className, ...props }: Props = $props();

    const transition = "transition-opacity duration-300";

    const light = "opacity-100 dark:opacity-0";
    const dark = "opacity-0 dark:opacity-100";
</script>

<div class={[className, "relative"]}>
    <img src={lightSrc} class={[transition, (isInvert) ? dark : light, "absolute"]} {...props} />
    <img src={darkSrc} class={[transition, (isInvert) ? light : dark, "opacity-0 dark:opacity-100"]} {...props} />
</div>
