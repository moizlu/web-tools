<script lang="ts">
    import type { HTMLButtonAttributes } from "svelte/elements";

    interface Props extends HTMLButtonAttributes {}
    const { children, class: className, ...props }: Props = $props();
</script>

<button {...props} class={[className, "border-1 border-accent hover:bg-accent hover:text-primary active:bg-accent active:text-primary transition-all duration-300"]}>
    {#if children}
        {@render children()}
    {/if}
</button>
