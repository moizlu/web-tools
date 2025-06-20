<script lang="ts">
    import type { HTMLImgAttributes } from "svelte/elements";

    interface Props extends Omit<HTMLImgAttributes, "src"> {
        lightSrc: string;
        darkSrc: string;
    }
    const { lightSrc, darkSrc, class: className, ...props }: Props = $props();

    const transition = "transition-opacity duration-300";
</script>

<div class={[className, "relative"]}>
    <img src={lightSrc} class={[transition, "absolute opacity-100 dark:opacity-0"]} {...props} />
    <img src={darkSrc} class={[transition, "opacity-0 dark:opacity-100"]} {...props} />
</div>
