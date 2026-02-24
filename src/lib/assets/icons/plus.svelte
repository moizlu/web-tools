<script lang="ts">
    import type { SvgComponentProps } from "$lib/types";
    const { size,  class: className }: SvgComponentProps = $props();
</script>

<svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 -960 960 960" width={size} class={className}>
    <path d="M460-460H240v-40h220v-220h40v220h220v40H500v220h-40v-220Z"/>
</svg>
