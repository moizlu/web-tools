<script lang="ts">
    import type { SvgComponentProps } from "$lib/types";
    const { size,  class: className }: SvgComponentProps = $props();
</script>

<svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 -960 960 960" width={size} class={className}>
    <path d="M240-460v-40h480v40H240Z"/>
</svg>
