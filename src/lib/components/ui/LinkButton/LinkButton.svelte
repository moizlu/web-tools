<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAnchorAttributes } from "svelte/elements";

    interface Props extends HTMLAnchorAttributes {
        children: Snippet;
        isInvert?: boolean;
    }
    let { children, class: className, isInvert=false, ...props }: Props = $props();

    const notInvertClass = `bg-primary text-accent border-accent hover:bg-accent hover:text-primary hover:border-primary active:bg-accent active:text-primary active:border-primary`;
    const invertClass = `bg-accent text-primary border-primary hover:bg-primary hover:text-accent hover:border-accent active:bg-primary active:text-accent active:border-accent`;

    const buttonClassName = `${(isInvert) ? invertClass : notInvertClass} border-1 transition-all duration-300`;
    if (className) {
        className += ` ${buttonClassName}`;
    } else {
        className = buttonClassName;
    }
</script>

<a class={className} {...props}>{@render children()}</a>
