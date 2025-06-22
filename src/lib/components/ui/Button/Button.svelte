<script lang="ts">
    import type { HTMLButtonAttributes } from "svelte/elements";

    interface Props extends HTMLButtonAttributes {
        isInvert?: boolean;
    }
    const { isInvert=false, children, class: className, ...props }: Props = $props();

    const notInvertClass = `bg-primary text-accent border-accent hover:bg-accent hover:text-primary hover:border-primary active:bg-accent active:text-primary active:border-primary`;
    const invertClass = `bg-accent text-primary border-primary hover:bg-primary hover:text-accent hover:border-accent active:bg-primary active:text-accent active:border-accent`;

    const buttonClassName = `${(isInvert) ? invertClass : notInvertClass} border-1 transition-all duration-300`;
</script>

<button {...props} class={[className, buttonClassName]}>
    {#if children}
        {@render children()}
    {/if}
</button>
