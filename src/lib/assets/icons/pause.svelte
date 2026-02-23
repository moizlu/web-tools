<script lang="ts">
    import type { SvgComponentProps } from "$lib/types";
    const { size,  class: className }: SvgComponentProps = $props();
</script>

<svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 -960 960 960" width={size} class={className}>
    <path d="M560-240v-480h140v480H560Zm-300 0v-480h140v480H260Z"/>
</svg>
